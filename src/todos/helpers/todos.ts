import { Todo } from "@prisma/client";

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const body = { complete };

  const todoDB = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application-json",
    },
  }).then(resp => resp.json());

  return todoDB;
};

export const crateTodo = async (description: string): Promise<Todo> => {
  const body = { description };

  const todoDB = await fetch(`/api/todos`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application-json",
    },
  }).then(resp => resp.json());

  return todoDB;
};

export const deleteTodo = async (): Promise<boolean> => {
  await fetch(`/api/todos`, {
    method: "DELETE",
    headers: {
      "Content-type": "application-json",
    },
  }).then(resp => resp.json());

  return true;
};
