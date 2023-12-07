"use client";
import Sidebar from "@/components/sidebar";
import Home from "./(dashboard)/(routes)/home/page";
import "./globals.css";
import { usePathname } from "next/navigation";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Montserrat } from "next/font/google";
import { FaArrowRight } from "react-icons/fa6";
import {
  Code,
  Image,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
export default function DashBoard() {
  const routes = [
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
    <Home>
      <main className="relative">
        <img
          className="fixed min-h-full object-cover"
          src="https://d1m75rqqgidzqn.cloudfront.net/wp-data/2020/09/09202218/iStock-1207062970.jpg"
          alt=""
        />
      </main>
      <div
        id="home"
        className=" text-white w-full flex justify-end items-center z-10  "
      >
        <div className="mr-0 sm:mr-2 md:mr-2 lg:mr-8 xl:mr-10  2xl:mr-28   mt-28 w-[550px]">
          <h1 className="text-[2.5rem] font-bold text-center
          bg-gradient-to-r from-blue-500 via-indigo-500 to-green-500 text-transparent bg-clip-text
          ">
            Explore The Power Of AI
          </h1>
          <p className="text-center text-gray-300">
            Chat with smartest AI - Experience the power of AI
          </p>
          <div className="mt-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm group  mb-2 flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition"
                )}
              >
                <div className="flex items-center flex-1 ">
                  <div className="flex items-center flex-1">
                    <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                    {route.label}
                  </div>
                  <FaArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Home>
  );
}
