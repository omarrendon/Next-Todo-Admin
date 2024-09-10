import prisma from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  const todoSeed = await prisma.todo.create({
    data: {
      description: "first task",
    },
  });

  console.log({ todoSeed });

  return NextResponse.json({
    message: "Seed Executed!",
  });
}
