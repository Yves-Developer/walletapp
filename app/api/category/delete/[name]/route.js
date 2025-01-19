import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
const prisma = new PrismaClient();
export async function DELETE(request, { params }) {
  const { name } = await params;
  const { userId } = await auth();

  if (!name) {
    return NextResponse.json({ error: "No params provided" }, { status: 400 });
  }

  try {
    const deletedRecord = await prisma.category.delete({
      where: {
        userId_name: {
          userId,
          name,
        },
      },
    });

    return NextResponse.json(
      { message: "Record deleted successfully", data: deletedRecord },
      { status: 200 }
    );
  } catch (error) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete record", details: error.message },
      { status: 500 }
    );
  }
}
