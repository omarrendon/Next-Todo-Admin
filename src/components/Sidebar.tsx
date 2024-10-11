import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoShareSocialSharp,
  IoStorefrontOutline,
} from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./LogoutButton";
import SidebarItem from "./SidebarItem";

const menuItems = [
  {
    icon: <IoCalendarOutline />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <IoCheckboxOutline />,
    title: "Rest Todos",
    path: "/dashboard/rest-todos",
  },
  {
    icon: <IoListOutline />,
    title: "Server Actions",
    path: "/dashboard/server-todos",
  },
  {
    icon: <IoCodeWorkingOutline />,
    title: "Cookies",
    path: "/dashboard/cookies",
  },
  {
    icon: <IoStorefrontOutline />,
    title: "Products",
    path: "/dashboard/products",
  },
  {
    icon: <IoShareSocialSharp />,
    title: "Profile",
    path: "/dashboard/profile",
  },
];

export default async function Sidebar() {
  const session = await getServerSession(authOptions);
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href={"#"} title="home">
            <Image
              src={
                "https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              }
              alt="tailus logo"
              className="w-32"
              width={150}
              height={150}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={`${
              session?.user?.image
                ? session?.user?.image
                : "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
            } `}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={150}
            height={150}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {session?.user?.name ? session?.user?.name : "Cynthia J. Watts"}
          </h5>
          <span className="hidden text-gray-400 lg:block">
            {session?.user?.roles ?? ["client"]}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map(({ icon, path, title }) => (
            <SidebarItem icon={icon} path={path} title={title} key={title} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
}
