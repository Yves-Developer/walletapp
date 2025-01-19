import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function POST(request, { params }) {
  const { type } = await params;
  if (!type) {
    return NextResponse.json({ message: "Type is required" }, { status: 400 });
  }

  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const body = await request.json();

  // Check if the category already exists
  const existingCategory = await prisma.category.findUnique({
    where: {
      userId_name: {
        userId: userId,
        name: body.category, // Check if a category with this name and userId exists
      },
    },
  });

  if (existingCategory) {
    return NextResponse.json({
      error: `Category "${body.category}" already exists.`,
    });
  }

  try {
    const dataToInsert = {
      userId: userId,
      name: body.category,
      type: type,
      amount: parseFloat(body.amount),
    };

    const result = await prisma.category.create({
      data: dataToInsert,
    });

    return NextResponse.json({
      message: `New category "${body.category}" inserted successfully.`,
    });
  } catch (error) {
    console.error("Error inserting data:", error.message);
    return NextResponse.json(
      { message: "Error inserting data.", error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Ensure Prisma disconnects after operation
  }
}

export async function GET(request, { params }) {
  const { type } = await params;
  if (!type) {
    return NextResponse.json({ message: "Type is required" }, { status: 400 });
  }
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  try {
    const data = await prisma.category.findMany({
      where: { type, userId },
      select: {
        name: true,
        amount: true,
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
