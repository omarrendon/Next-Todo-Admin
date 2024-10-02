import React from "react";
import WidgetItem from "@/components/WidgetItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 ">
      <WidgetItem title="Conected user Server Side">
        <div className="flex flex-cols">
          <span>{JSON.stringify(session.user)}</span>
        </div>
      </WidgetItem>
    </div>
  );
}
