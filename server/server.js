const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const cors = require('cors');
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
/*
const express = require('express'); 
const { Socket } = require('socket.io');
const { Server } = require('socket.io');
const http = require('http');
const app = express();
const cors = require('cors');
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://my-ip-address:3000",
        methods: ["GET", "POST"]
    }
});
*/
const { spawn }=require('child_process');


app.get('/api', (req, res) => {
    res.json({"users": ["user1", "user2", "user3", "user4"]})
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});

io.on('connection', (socket) => {
    console.log(`a user connected:  ${socket.id}`);

    socket.on('send_message', (data) => {
        console.log(`server has received message: ${JSON.stringify(data)}`);

        const messageToSend = {
            "message": `Your message ${data.message} !`,
            "sender": "server"
        }
        //Stringiify JSON data to pass into python script.
        input= JSON.stringify(data);
        const chatbot=spawn("python", ['./test_script.py', input]);
        //Proecess and emit python output to client thorigh socket.
        chatbot.stdout.on("data", (data) => {
            socket.emit('receive_message', {
                "message": `${data}`,
                "sender": "server"
            });
            console.log(`Python Output: ${data}`);
          });
          
        //socket.emit('receive_message', messageToSend);

        console.log(`server has sent message: Welcome ${JSON.stringify(messageToSend)} !`)
    });
});

//backend in on port 5000, client in on port 3000
server.listen(5000, '0.0.0.0',() => {
    console.log('Server is running on port 5000');
});