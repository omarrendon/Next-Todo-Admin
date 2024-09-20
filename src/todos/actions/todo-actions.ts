"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { Todo } from "@prisma/client";

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({
    where: { id },
  });

  if (!todo) {
    throw "Todo not found!";
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-todo");
  return updatedTodo;
};
