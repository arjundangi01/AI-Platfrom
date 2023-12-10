"use client";

import React from "react";
import Link from "next/link";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Montserrat } from "next/font/google";

import {
  Code,
  Image,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,

} from "lucide-react";
import { usePathname } from "next/navigation";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });
const Sidebar = () => {
  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      color: "text-sky-500",
    },
    {
      label: "Conversation",
      icon: MessageSquare,
      href: "/conversation",
      color: "text-violet-500",
    },
    {
      label: "Image Generation",
      icon: ImageIcon,
      color: "text-pink-700",
      href: "/image",
    },
    
    
    {
      label: "Code Generation",
      icon: Code,
      color: "text-green-700",
      href: "/code",
    },
    
  ];

  function cn(...inputs) {
    return twMerge(clsx(inputs));
  }
  const pathname = usePathname();
  return (
    <div className="space-y-4 min-w-[65px]  md:min-w-[270px] py-4 flex flex-col h-full bg-[#001f58] text-white ">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center  pl-3 mb-14">
          <div className="relative h-12 w-12  mr-4">
            <img
              className="h-8  w-36 "
              src="https://static.vecteezy.com/system/resources/thumbnails/011/894/733/small/artificial-intelligence-ai-robot-chat-bot-logo-template-free-vector.jpg"
              alt=""
            />
          </div>
          <h1 className={cn("text-xl font-bold", poppins.className) }>AI-Bot</h1>
          {/* <h1 className='text-xl text-white font-bold hidden md:visible'>AI-Bot</h1> */}
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {/* <p className="hidden md:visible" > */}
                {route.label}
                {/* </p> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
