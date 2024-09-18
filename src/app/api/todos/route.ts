import prisma from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

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

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.create({ data: { description, complete } });

    return NextResponse.json({ data: todo });
  } catch (error) {
    return NextResponse.json({ messsage: "Invalid data" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    await prisma.todo.deleteMany({
      where: { complete: true },
    });

    return NextResponse.json({
      message: "Success",
    });
  } catch (error) {
    return NextResponse.json({ messsage: "Invalid data" }, { status: 400 });
  }
}
