import React, {useEffect, useState} from "react"
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from "@material-ui/icons/Mic"

import Pusher from "pusher-js"
import axios from './axios'

import "./Chat.css"

function Chat() {
  const [input, setInput] = useState("")



  const sendMessage = async (e)=>{
    e.preventDefault()

    await axios.post('/api/v1/messages/new', {
    message: input,
    name: "Elon",
    timestamp: "time stamp",
    received: true
    })

    setInput("")


  }

  const [messages, setMessages]= useState([])


  useEffect(()=>{
    axios.get("/api/v1/messages/sync")
    .then(response => {
      
      setMessages(response.data)
    })
  }, [])

  useEffect(()=>{
    const pusher = new Pusher('0734b4833407d0cb5080', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) =>{
      setMessages([...messages, newMessage])

    });
    return ()=>{
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])

  //console.log(messages)




  return (
    <div className="chat">
        <div className='chat_header'>
          <Avatar/>

          <div className='chat_headerInfo'>
            <h3>Room name</h3>
            <p>Last seen at...</p>
          </div>

          <div className='chat_headerRIght'>
            <IconButton>
              <SearchOutlined/>
            </IconButton>

            <IconButton>
              <AttachFile/>
            </IconButton>

            <IconButton>
              <MoreVert/>
            </IconButton>
          </div>
        </div>
        <div className='chat_body'>
          {messages.map((message) =>(
            <p className={`chat_message ${message.received && "chat_receiver"}`}>
            <span className='chat__name'>{message.name}</span>

            {message.message}
            <span className='chat_timestamp'>
              {message.timestamp}
            </span>
            
            </p>
          ))}
            

              
        </div>
        <div className='chat_footer'>
          <InsertEmoticonIcon/>
          <form>
            <input value={input} onChange={(e)=>setInput(e.target.value)}
             placeholder="Type a message"
            type="text"
            />
            <button onClick={sendMessage} 
              type="submit">
              Send a message
            </button>
          </form>
          <MicIcon/>
        </div>
    </div>
  )
}

export default Chat