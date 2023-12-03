"use client";

import axios from 'axios';
import React, { useState } from 'react'

const ConversationPage = () => {
  const [messages, setMessages] = useState([]);
  const onSubmit = async (e) => {
    e.preventDefault()
    console.log('first',process.env.NEXT_PUBLIC_OPENAI_API_KEY)
    const userMessage = { role: "user", content: 'what is a java' };

    const newMessages=[...messages, userMessage];
    try {
      // const response = await axios.post('/api/conversation', { messages: newMessages });
      const response = await axios.post('/api/conversation', { messages: 'what is a java' });
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