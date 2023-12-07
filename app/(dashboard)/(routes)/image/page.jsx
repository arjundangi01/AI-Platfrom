"use client";

import { BotAvatar } from "@/components/botavatar";
import { UserAvatar } from "@/components/useravatar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";
import { IoMdSend } from "react-icons/io";
import Loading from "@/components/loading";
import NoChats from "@/components/noChats";

import {
  Code,
  Image,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
} from "lucide-react";
import Home from "../home/page";

const PhotoPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log("first", process.env.NEXT_PUBLIC_OPENAI_API_KEY);
    if (!newMessage) {
      return;
    }

    try {
      setPhotos([]);

      const response = await axios.post("/api/image", { newMessage });

      const urls = response.data.map((image) => image.url);

      setPhotos(urls);
      setIsLoading(false);
      setNewMessage("");
    } catch (error) {
      setIsLoading(false);
      setNewMessage("");

      console.log(error);
    }
  };
  function cn(...inputs) {
    return twMerge(clsx(inputs));
  }
  return (
    <Home>
      <main className="w-full gap-8 flex flex-col  bg-[#001f58] relative ">
        <div className="w-full min-h-[60px] items-center py-2 flex gap-5 h-[60px] ps-6 text-white  fixed border-b border-b-white  ">
          {" "}
          {isLoading ? (
            <>
              <p>Bot is Thinking....</p>

              <Loading />
            </>
          ) : (
            <>
              <ImageIcon />
              <h1>Image Generation</h1>
            </>
          )}
        </div>
        <section className="h-full px-3  mt-[100px] w-[90%] m-auto">
            {photos.length == 0 && <NoChats text={'Search Image'} />}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {photos.map((src) => (
              <div key={src}>
                <img className="rounded-lg" src={src} alt="" />
                <button
                  onClick={() => window.open(src)}
                  className="text-white bg-slate-400 w-full mt-2 rounded-lg py-2"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </section>
        <section className="border-b w-[80%] m-auto  mb-5 flex gap-8 items-center px-5 h-[4rem] self-end bottom-0">
          <input
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                onSubmit(e);
              }
            }}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            className="w-[100%] bg-[#001f58] text-white focus:outline-none focus:border-transparent tracking-wide  "
            placeholder="Your message here..."
          />

          <IoMdSend
            className="text-[1.5rem] text-green-600 "
            onClick={onSubmit}
          />
        </section>
      </main>
    </Home>
  );
};

export default PhotoPage;
