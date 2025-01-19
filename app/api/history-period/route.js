import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(request) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  try {
    const periods = await prisma.monthHistory.findMany({
      where: { userId },
      select: { year: true },
      distinct: ["year"],
      orderBy: {
        year: "asc",
      },
    });
    const year = periods.map((el) => el.year);
    if (year.length == 0) {
      return NextResponse.json([new Date().getFullYear()]);
    }
    return NextResponse.json(year);
  } catch (error) {
    console.error("Error in Api:", ErrorBar.message);
    return NextResponse.json({ Error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
