import prisma from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
      { description: "School task", complete: true },
      { description: "Home task" },
      { description: "Work task" },
      { description: "Market task" },
    ],
  });

  return NextResponse.json({
    message: "Seed Executed!",
  });
}
