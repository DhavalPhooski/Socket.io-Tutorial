const express = require('express'); //importing express
const http = require('http');//built-in module / library to initialize http
const path = require('path');//initiaziling for absolute path
const { Server } = require("socket.io");//this is Socket.io server


const app = express();//express ki power aab app mai aa gai
const server = http.createServer(app);//This is our created server

const io = new Server(server);// putting our created server inside socket.io 's Server


app.use(express.static(path.resolve('./public')))
app.get('/',(req,res,next)=>{
//   res.send("hello");
   //syntax to add static index.html
  //res.sendFile(path.join(__dirname,'public/index.html'));// __dirname is current file and second one is relative path of index.html

    res.sendFile('index.html');
})


io.on("connection", (socket) => {
  console.log('a user connected',socket.id);//every user has unique socket id

//we use on function to recieve data from frontend!
  socket.on('msgFromFrontend',(msg)=>{
    console.log(msg);
    io.emit("msgFromBackend",`${socket.id} : ${msg}`);
  }
)});

//lets start our server
server.listen(5000,()=>{
    console.log("server is listening on localhost on http://localhost:5000");
});

