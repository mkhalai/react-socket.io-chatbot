import React, {useState} from "react";
import './chat.css';
function ChatComponent( {messages} ){
    //inner cointainer
 
    return (
        <React.Fragment>
            {messages.map((message, index) => (
                <React.Fragment>
                    {message.sender === "server" ? (
                        <div key ={index} className="message-container-ai">
                            <div className="message-right-message-container-ai">
                                <div className="message-bubble-ai">{message.message}</div>
                                <span className="message-sender-name">{message.sender}</span>
                            </div>
                        </div>
                    ) : (
                        <div key ={index} className="message-container-user">
                            <div className="message-bubble-user"> {message.message} </div>
                            <span className="message-sender-name">{message.sender}</span>
                        </div>
                    )}
                </React.Fragment>
                
            ))}
        </React.Fragment>
        /*
        <div>
              
            {messages.map((message, index) => (
                //<div key={index} className={messageClass(message)}>
                    
                    <div key={index} className={containerClass(message)}>
                        <div key = {index} className={nameClass(message)}>
                        {   message.message}
                        </div>

                        <span class='message-sender-name'>{message.sender}</span>
                    </div>
                //</div>
                
            ))};
            
        </div>
        */
    )
};



export default ChatComponent;