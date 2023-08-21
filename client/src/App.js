import { useEffect, useState, useRef } from "react";
import './components/chat.css';
import ChatComponent  from "./components/chat";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");



function App() {
  const scrollToRef = useRef(null);
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([{
    "message": "Welcome to the chat!",
    "sender": "server"
  }]);
  const [textInput, setTextInput] = useState("");

  const sendMessage = () => {
    console.log(`message sent: ${message.message}`);
    if (Object.keys(message).length !== 0){
      socket.emit("send_message",message);
    //setMessage(message);
    //console.log(message);
    messageHandler(message);
    setMessage({});
    setTextInput("");
    
    }
    
  }
  const loadMessage = (event) => {
    const msgSend = {
      "message": event.target.value,
      "sender": "You"
    }
    setMessage(msgSend);
    //console.log(event.target.value);
    setTextInput(event.target.value);
  };

  const messageHandler = (message) => {
    setMessages((prevMessages) => [...prevMessages, message])
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      //console.log(`client has received message: ${data.message}`);
      //console.log(`value of message: ${JSON.stringify(data)}`);
      //console.log(`value of messages: ${JSON.stringify(messages)}`);
      messageHandler(data);
      const chatContainer = scrollToRef.current;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    });
    
    return () => {
      socket.off("receive_message");
    }
  }, [socket]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
      
    }
  };
  return (
    <div className="App">
      <div class='background'>
        <h1>React App</h1>

        <div class='messages-container' ref = {scrollToRef}>
          <ChatComponent messages={messages} />
        <div/>

        <div class="bottom-bar">
          <div class="input-container">
            <input 
              class="message-input" 
              placeholder="Send a message" 
              contenteditable="true" rows="1"
              value={textInput} 
              onChange={loadMessage}
              onKeyDown={handleKeyDown}
              >
              
            </input>
            {/*<button class="message-send-button" onClick={sendMessage}>Send
            </button>*/}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default App;



/*
</div> 
  
          <div class='footer'>
            <input 
            class='message-input'
            placeholder="Type message here.."
            value={textInput} 
            onChange={loadMessage}
            onKeyDown={handleKeyDown}
            />
            <button class = "message-send-button" Click={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>*/