import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { OrderStatus } from "@/types/order";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await getAuthSession();

  if (!session || !session.user.isAdmin) {
    return new NextResponse(
      JSON.stringify({ message: "You are not authorized!" }),
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { status } = body as { status: OrderStatus };

    const updatedOrder = await prisma.order.update({
      where: {
        id: params.id,
      },
      data: {
        status,
      },
    });

    return new NextResponse(JSON.stringify(updatedOrder), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
