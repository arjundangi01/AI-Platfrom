"use client";

import Home from "@/app/page";
import { BotAvatar } from "@/components/botavatar";
import { UserAvatar } from "@/components/useravatar";
import axios from "axios";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";
import { IoMdSend } from "react-icons/io";

const ConversationPage = () => {
  const [messages, setMessages] = useState([
    
  ]);
  const [newMessage,setNewMessage] = useState('')
  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log("first", process.env.NEXT_PUBLIC_OPENAI_API_KEY);
    if ( !newMessage) {
      return
    }
    const userMessage = { role: "user", content:newMessage };
    
    const newMessages = [...messages, userMessage];
    try {
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      // const response = await axios.post('/api/conversation', { messages: 'what is a java' });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  function cn(...inputs) {
    return twMerge(clsx(inputs));
  }
  return (
    <Home>
      <main className="w-full gap-8 flex flex-col bg-[#111827] relative ">
        <div className="w-full   text-white  fixed border-b border-b-white py-4 ">
          {" "}
          Bot is thinking...{" "}
        </div>
        <section className="h-full  overflow-y-scroll mt-[100px] w-[80%] m-auto">
          <div className="">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-4 w-full mb-4 flex  gap-x-8 rounded-lg text-white items-center",
                  message.role === "user"
                    ? "bg-[#1d3557] border border-black/10"
                    : "bg-[#274c77]"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="border w-[80%] m-auto  mb-5 flex gap-8 items-center px-5 h-[4rem] self-end bottom-0">
        {/* <BsEmojiSmile className="text-[1.5rem] text-pink-600" /> */}
        <input
          
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              onMessageSend();
            }
          }}
          value={newMessage}
          onChange={(e)=>setNewMessage(e.target.value)}
          type="text"
          className="w-[100%] bg-[#111827] text-white focus:outline-none focus:border-transparent tracking-wide  "
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
