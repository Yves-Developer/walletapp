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
    const result = await prisma.transaction.create({
      data: body,
    });

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
  try {
    const data = await prisma.transaction.findMany({
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
