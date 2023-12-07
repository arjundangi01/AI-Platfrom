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
const ConversationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    setMessages(JSON.parse(localStorage.getItem('conversationMessages')) || []);
  },[])
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log("first", process.env.NEXT_PUBLIC_OPENAI_API_KEY);
    if (!newMessage) {
      return;
    }
    const userMessage = { role: "user", content: newMessage };

    const newMessages = [...messages, userMessage];
    try {
      setNewMessage("");
      

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      // const response = await axios.post('/api/conversation', { messages: 'what is a java' });
      console.log(response);

      setMessages([...messages, userMessage, response.data]);
      localStorage.setItem('conversationMessages',JSON.stringify([...messages,userMessage,response.data]))
      setIsLoading(false);
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
      <main className="w-full gap-8 flex flex-col relative bg-[#001f58] relative ">
        <div className="w-full min-h-[60px] items-center py-2 flex gap-5 h-[60px] ps-6 text-white  fixed border-b border-b-white  ">
          {" "}
          {isLoading ? (
            <>
              <p>Bot is Thinking....</p>

              <Loading />
            </>
          ) : (
            <>
              <MessageSquare />
              <h1>Conversation</h1>
            </>
          )}
        </div>
        <section className="h-full px-3  overflow-y-scroll custom-scrollbar mt-[100px] w-[80%] m-auto">
          <div className="">
            {messages.length == 0 && <NoChats text={'Start Conversation'} />}
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-4 w-full mb-4 flex  gap-8 rounded-lg  text-white items-center",
                  message.role === "user"
                    ? "bg-[#1d3557] border border-black/10"
                    : "bg-[#274c77]"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm w-[100%] ">{message.content}</p>
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

export default ConversationPage;
