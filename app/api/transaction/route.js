import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
const prisma = new PrismaClient();

export async function POST(request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();

  try {
    const date = new Date(body.date);
    await prisma.$transaction([
      prisma.transaction.create({
        data: body,
      }),
      // MonthHistory Aggregate Table
      prisma.monthHistory.upsert({
        where: {
          userId_day_month_year: {
            userId,
            day: date.getUTCDay(),
            month: date.getUTCMonth(),
            year: date.getUTCFullYear(),
          },
        },
        create: {
          userId,
          day: date.getUTCDate(),
          month: date.getUTCMonth(),
          year: date.getUTCFullYear(),
          income: body.type === "Income" ? body.amount : 0,
          expense: body.type === "Expense" ? body.amount : 0,
        },
        update: {
          expense: {
            increment: body.type === "Expense" ? body.amount : 0,
          },
          income: {
            increment: body.type === "Income" ? body.amount : 0,
          },
        },
      }),
      // YearHistory Aggregate Table
      prisma.yearHistory.upsert({
        where: {
          userId_month_year: {
            userId,
            month: date.getUTCMonth(),
            year: date.getUTCFullYear(),
          },
        },
        create: {
          userId,
          month: date.getUTCMonth(),
          year: date.getUTCFullYear(),
          income: body.type === "Income" ? body.amount : 0,
          expense: body.type === "Expense" ? body.amount : 0,
        },
        update: {
          expense: {
            increment: body.type === "Expense" ? body.amount : 0,
          },
          income: {
            increment: body.type === "Income" ? body.amount : 0,
          },
        },
      }),
    ]);

    // Return a success response with the count of inserted records
    return NextResponse.json({
      message: `Records inserted successfully.`,
    });
  } catch (error) {
    console.error("Error inserting data:", error.message);
    return NextResponse.json(
      { message: "Error inserting data.", error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await prisma.transaction.findMany({
      where: { userId },
      select: {
        category: true,
        description: true,
        type: true,
        account: true,
        amount: true,
        date: true,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed To get Data:", error.message);
    return NextResponse.json("Error to fetch:", error.message, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
