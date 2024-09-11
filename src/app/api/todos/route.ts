import prisma from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = searchParams.get("take") ?? "10";
  const skip = searchParams.get("take") ?? "10";

  if (isNaN(+take)) {
    return NextResponse.json(
      { message: "Take is not a number" },
      { status: 400 }
    );
  }

  if (isNaN(+skip)) {
    return NextResponse.json(
      { message: "Skip is not a number" },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take: +take,
    skip: +skip,
  });

  return NextResponse.json({
    message: "Success",
    data: todos,
  });
}
