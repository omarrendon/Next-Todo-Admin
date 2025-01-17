import prisma from "@/app/lib/prisma";
import { getUserServerSession } from "@/auth/actions/auth-actions";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    return NextResponse.json({ message: "Todo not found." }, { status: 404 });
  }

  return NextResponse.json({
    message: "Success",
    data: todo,
  });
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;

  const user = await getUserServerSession();

  if (!user) {
    return NextResponse.json({ messsage: "No authorized" }, { status: 401 });
  }

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    return NextResponse.json({ message: "Todo not found." }, { status: 404 });
  }

  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description },
    });

    return NextResponse.json({
      message: "Success",
      data: updatedTodo,
    });
  } catch (error) {
    return NextResponse.json({ messsage: "Invalid data" }, { status: 400 });
  }
}
