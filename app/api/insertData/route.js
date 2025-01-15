import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json(); // Parse incoming JSON request body

    const { userId, category, description, account, type, amount, date } = body;

    // Insert the data into the database
    const transaction = await prisma.transaction.create({
      data: {
        userId,
        category,
        description,
        account,
        type,
        amount,
        date: new Date(date),
      },
    });

    return NextResponse.json({
      message: "Data inserted successfully!",
      transaction,
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json(
      { error: "Failed to insert data." },
      { status: 500 }
    );
  }
}
