"use client"
import Image from "next/image";
import LeftSection from "../components/LeftSection"
import ChatSection from "../components/ChatSection"
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { generateUsername } from "unique-username-generator";

export default function Home() {

  const socketRef = useRef();

  const [settings,setSettings] = useState({
    darkmode: true,
    lang: 'en',
    notificationSound: true,
    notifications: true,
    userName: "",
    profilePicture: "/user.jpg",

  })

  const [roomInfos, setRoomInfos] = useState({
    
    roomID: "",
    messages: [],
    peers: []
  })

//   const [messages,setMessages] = useState([
//     {
//         isSent: true,
//         message: "Test 1",
//         date: "23:52 PM"
//     },
//     {
//         isSent: false,
//         message: "Test 1",
//         date: "23:52 PM",
//         pdp: "/a.jpg",
//         name: "Mohammed"
//     },
//     {
//         isSent: true,
//         message: "Test 1",
//         date: "23:52 PM"
//     },
//     {
//         isSent: true,
//         message: "Test 1",
//         date: "23:52 PM"
//     },
// ])
//   const [peers, setPeers] = useState([

//   ])
  // {
  //   id: "",
  //   profile_picture: "/a.jpg",
  //   name: "Mohammed"
  // },
  // {
  //   id: "",
  //   profile_picture: "/b.jpg",
  //   name: "Badr"
  // }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sett = JSON.parse(localStorage.getItem('settings'));
      if (sett) {
        setSettings(sett);
     
      }
      socketRef.current = io.connect("http://localhost:8000");
     
     
      
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));

  }, [settings]);


  useEffect(() => {
   
      if (settings.darkmode) {
          document.body.classList.add("dark")
      } else {
          document.body.classList.remove("dark")
      }
     
    }, [settings.darkmode]);

  const language = {
    fr: {
        search_text:"Créer ou rejoindre un groupe",
        settings_name: "Parametres"
    },
    en: {
        search_text:"Create or Join Room",
        settings_name: "Settings"
    }
  }
  return (
    <main className="flex h-screen">
     
         <LeftSection language={language[settings.lang]} settings={settings} setSettings={setSettings} socketRef={socketRef} roomInfos={roomInfos} setRoomInfos={setRoomInfos} />
      
        <ChatSection language={language[settings.lang]} roomInfos={roomInfos} setRoomInfos={setRoomInfos} settings={settings}/> 
    </main>
  );
}
