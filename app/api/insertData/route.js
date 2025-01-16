import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  // Make sure the body contains the correct data format
  if (!Array.isArray(body)) {
    return NextResponse.json(
      { message: "Invalid data format. Expected an array." },
      { status: 400 }
    );
  }

  try {
    // Prepare the data for insertion by ensuring 'amount' is a number
    const dataToInsert = body.map((item) => ({
      userId: "uer1123",
      name: item.category,
      type: item.type,
      amount: parseFloat(item.amount), // Ensure amount is a number
    }));

    // Insert the data into the database using Prisma
    const result = await prisma.category.createMany({
      data: dataToInsert, // This will skip duplicates if any
    });

    // Return a success response with the count of inserted records
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
    await prisma.$disconnect(); // Ensure Prisma disconnects after operation
  }
}
