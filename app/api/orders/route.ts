import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    const session = await getAuthSession();

    if (session) {
        try {
            if (session.user.isAdmin) {
                const orders = await prisma.order.findMany({
                    include: {
                        products: true,
                        shippingAddress: true
                    }
                });
                return new NextResponse(JSON.stringify(orders), { status: 200 })
            }
            const orders = await prisma.order.findMany({
                include: {
                    products: true,
                    shippingAddress: true
                },
                where: {
                    userEmail: session.user.email!
                }
            });
            return new NextResponse(JSON.stringify(orders), { status: 200 })
        } catch (err) {
            console.log(err)
            return new NextResponse(JSON.stringify({ message: "Something went wrong" }), { status: 500 })
        }
    } else {
        return new NextResponse(JSON.stringify({ message: "You are not authorized!" }), { status: 401 })
    }
}