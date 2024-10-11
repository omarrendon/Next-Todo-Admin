import prisma from "@/app/lib/prisma";
import bcryptjs from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getUserServerSession = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const dbUser = await createUser(email, password);
    return dbUser;
  }

  if (!bcryptjs.compareSync(password, user.password ?? "...")) {
    return null;
  }

  return user;
};

const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email: email,
      password: bcryptjs.hashSync(password),
      name: email.split("2")[0],
    },
  });

  return user;
};
