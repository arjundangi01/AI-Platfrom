"use client";

import axios from 'axios';
import React, { useState } from 'react'

const ConversationPage = () => {
  const [messages, setMessages] = useState([]);
  const onSubmit = async (e) => {
    e.preventDefault()
    console.log('first',process.env.NEXT_PUBLIC_OPENAI_API_KEY)
    const userMessage = { role: "user", content: 'what is a car' };

    const newMessages=[...messages, userMessage];
    try {
      const response = await axios.post('/api/conversation', { messages: newMessages });
      console.log(response)
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