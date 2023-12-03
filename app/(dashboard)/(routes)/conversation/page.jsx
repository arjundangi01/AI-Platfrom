"use client";

import axios from 'axios';
import React, { useState } from 'react'

const ConversationPage = () => {
  const [messages, setMessages] = useState([]);
  // const onSubmit = async (e) => {
  //   e.preventDefault()
  //   console.log('first',process.env.NEXT_PUBLIC_OPENAI_API_KEY)
  //   const userMessage = { role: "user", content: 'what is a java' };

  //   const newMessages=[...messages, userMessage];
  //   try {
  //     // const response = await axios.post('/api/conversation', { messages: newMessages });
  //     const response = await axios.post('/api/conversation', { messages: 'what is a java' });
  //     console.log(response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const onSubmit = async (e) => {
    e.preventDefault()
    const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: 'what is java' }],
        max_tokens: 100,
      }),
    };
    try {
      // const response = await axios.post('/api/conversation', { messages: newMessages });
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        options
      );
      const data = await response.json();
     console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <button onClick={onSubmit} >submit</button>
    </div>
  )
}

export default ConversationPage