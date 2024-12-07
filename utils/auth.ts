import { getServerSession, NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./connect";

declare module "next-auth" {
    interface Session {
        user: User & {
            isAdmin: boolean;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        // id: string;
        isAdmin: boolean;
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         email: { label: "Email", type: "email" },
        //         password: { label: "Password", type: "password" }
        //     },
        //     async authorize(credentials) {
        //         if (!credentials?.email || !credentials?.password) {
        //             return null;
        //         }

        //         // Add your user verification logic here
        //         // For example, check against your database
        //         // const user = await prisma.user.findUnique({ where: { email: credentials.email }})
        //         // if (user && await bcrypt.compare(credentials.password, user.password)) {
        //         //     return user;
        //         // }

        //         // For now, returning null to indicate authentication failed
        //         return null;
        //     }
        // })
    ],
    // pages: {
    //     signIn: "/login",
    // },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.isAdmin = token.isAdmin;
            }
            return session;
        },
        async jwt({ token }) {
            const userInDb = await prisma.user.findUnique({
                where: {
                    email: token.email,
                },
            });

            token.isAdmin = userInDb?.isAdmin!
            return token;
        }
    }
}

export const getAuthSession = () => getServerSession(authOptions)