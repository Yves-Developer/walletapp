import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(request) {
  const { userId } = await auth();
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  try {
    const [categories, transaction] = await prisma.$transaction([
      prisma.category.findMany({
        where: { userId },
        select: {
          type: true,
          name: true,
          amount: true,
        },
      }),
      prisma.transaction.groupBy({
        by: ["type", "category"],
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
        orderBy: {
          _sum: { amount: "desc" },
        },
      }),
    ]);
    return NextResponse.json([categories, transaction]);
  } catch (error) {
    console.error("Error during prisma action:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}
