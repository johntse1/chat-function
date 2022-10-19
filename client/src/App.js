import './App.css';
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './Chat';
//backend connection
const socket  = io.connect("http://localhost:3001");

function App() {
  
  const[username,setUsername] = useState("");
  const[room,setRoom] = useState("");
  const[showChat,setShowChat] = useState(false);

  //connection button
  const joinRoom = () =>{
    if(username!==""&&room!==""){
      //passes the data from the front end to the backend
      socket.emit("join_room",room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
        <h3>Join A chat</h3>
        <input
          type="text"
          placeholder="John..."
          onChange={(event)=>{
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Room..."
          onChange={(event)=>{
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}>Join A Room</button>
        </div>
  
    ):(
      <Chat socket={socket} username={username} room={room}/>
    )}
    </div>
  );
}

export default App;
