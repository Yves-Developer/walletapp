import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
const prisma = new PrismaClient();

export async function POST(request) {
  const { userId } = await auth();
  const body = await request.json();

  if (!Array.isArray(body)) {
    return NextResponse.json(
      { message: "Invalid data format. Expected an array." },
      { status: 400 }
    );
  }

  try {
    for (const item of body) {
      const existingCategory = await prisma.category.findUnique({
        where: {
          userId_name: {
            userId: userId,
            name: item.category,
          },
        },
      });

      if (existingCategory) {
        return NextResponse.json({
          error: `Category "${item.category}" already exists.`,
        });
      }
    }

    const dataToInsert = body.map((item) => ({
      userId: userId,
      name: item.category,
      type: item.type,
      amount: parseFloat(item.amount),
      budgetLeft: parseFloat(item.amount),
    }));

    const result = await prisma.category.createMany({
      data: dataToInsert,
    });

    return NextResponse.json({
      message: `${result.count} records inserted successfully.`,
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
    const data = await prisma.category.findMany({
      where: { userId },
      select: {
        name: true,
        type: true,
        amount: true,
        budgetLeft: true,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return NextResponse.json(
      { message: "Error fetching data.", error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Ensure Prisma disconnects after operation
  }
}
