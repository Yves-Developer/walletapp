import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { getDaysInMonth } from "date-fns";
const prisma = new PrismaClient();
export async function GET(request) {
  const { userId } = await auth();
  const { searchParams } = new URL(request.url);
  const timeframe = searchParams.get("timeframe");
  const year = parseInt(searchParams.get("year"));
  const month = parseInt(searchParams.get("month"));

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    switch (timeframe) {
      case "year": {
        const result = await prisma.yearHistory.groupBy({
          by: ["month"],
          where: {
            userId,
            year: year,
          },
          _sum: {
            expense: true,
            income: true,
          },
          orderBy: {
            month: "asc",
          },
        });
        if (!result || result.length == 0) return NextResponse([]);
        const history = [];
        for (let i = 0; i < 12; i++) {
          let expense = 0;
          let income = 0;
          const month = result.find((row) => row.month == i);
          if (month) {
            expense = month._sum.expense || 0;
            income = month._sum.income || 0;
          }
          history.push({
            year: year,
            month: i,
            expense,
            income,
          });
        }
        return NextResponse.json(history);
      }
      case "month": {
        const result = await prisma.monthHistory.groupBy({
          by: ["day"],
          where: {
            userId,
            year: year,
            month: month,
          },
          _sum: {
            expense: true,
            income: true,
          },
          orderBy: {
            day: "asc",
          },
        });
        if (!result || result.length == 0) return NextResponse.json([]);
        const history = [];
        const daysInmonth = getDaysInMonth(new Date(year, 0));
        for (let i = 1; i < daysInmonth; i++) {
          let expense = 0;
          let income = 0;
          const day = result.find((row) => row.day == i);
          if (day) {
            expense = day._sum.expense || 0;
            income = day._sum.income || 0;
          }
          history.push({
            year: year,
            month: month,
            expense,
            income,
            day: i,
          });
        }
        return NextResponse.json(history);
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json("Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}
