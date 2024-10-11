import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";
import bcryptjs from "bcryptjs";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bcryptjs.hashSync("123456"),
      roles: ["admin", "client", "super-admin"],
      todos: {
        create: [
          { description: "School task", complete: true },
          { description: "Home task" },
          { description: "Work task" },
          { description: "Market task" },
        ],
      },
    },
  });

  return NextResponse.json({
    message: "Seed Executed!",
  });
}
