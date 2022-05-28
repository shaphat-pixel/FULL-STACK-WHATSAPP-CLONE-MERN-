import React, {useEffect, useState} from "react"
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
//import Pusher from "pusher-js"
//import axios from './axios'


function App() {

 


  return (
    <div className="app">
      <div className='app_body'>
      <Sidebar/>
      <Chat/>

      </div>
      
    </div>
  );
}

export default App;
