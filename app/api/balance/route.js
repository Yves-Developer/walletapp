import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
const prisma = new PrismaClient();
export async function GET(request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Not Authorised!!" }, { userId });
  }
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  try {
    const totals = await prisma.transaction.groupBy({
      by: ["type"],
      where: {
        userId,
        date: {
          gte: from,
          lte: to,
        },
      },
      _sum: {
        amount: true,
      },
    });
    return NextResponse.json({
      expense: totals.find((t) => t.type === "Expense")?._sum.amount || 0,
      income: totals.find((t) => t.type === "Income")?._sum.amount || 0,
    });
  } catch (error) {
    return NextResponse.json({ "Error running query": error.message });
  } finally {
    await prisma.$disconnect();
  }
}
