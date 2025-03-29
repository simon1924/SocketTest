// import { useState } from 'react'
import { io } from "socket.io-client"
import './App.css'
const socket = io("http://localhost:3001");
import { useEffect, useState } from "react";


function App() {
  const [message, setMessage] = useState<string>("");
  const [messageReceived, setMessageReceived] = useState<string>("");

  const send = () => {
    socket.emit("send", { message })
  }

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessageReceived(data.message);
    })
  }, [socket])

  return (
    <>
      <div className='container'>
        <input type="text" placeholder='Type...' onChange={(e) => {
          setMessage(e.target.value)}}></input>

        <button onClick={send}>Send</button>

        <h1>{messageReceived}</h1>
      </div>
    </>
  )
}

export default App
