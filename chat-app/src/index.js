const express = require("express");
const path = require('path');
const http = require("http");
const socketio = require("socket.io");
const filter = require("bad-words");
const {generateMessage, generateLocationMessage} = require("./utils/messages.js");
const {addUser,removeUser,getUser,getUsersInRoom} = require("./utils/users.js");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, "../public");

app.use(express.static(publicDirectory));
// let count=0;
io.on("connection",(socket)=>{
    console.log("new connection");

    //everyone get's this mmessage except itself who joined
    // socket.broadcast.emit("message", generateMessage("A new user has joined"));

    // socket.emit("countUpdated", count);

    // socket.on("increment",()=>{
    //     count++;
    //     //this only emits to single user
    //     // socket.emit("countUpdated", count);

    //     //this update on all users
    //     io.emit("countUpdated", count);
        
    // })
    socket.on("join",({username, room}, callback)=>{
        const {error, user} = addUser({id: socket.id, username, room});
        if(error){
            return callback(error);
        }
        socket.join(user.room);
        //socket.emit, io.emit, socket.broadcast.emit
        //io.to.emit, socket.broadcast.to.emit
        socket.broadcast.to(user.room).emit("message", generateMessage(`${user.username} has joined!`));
        socket.emit("message",generateMessage("Welcome!!"));
        callback();
    })
    // socket.emit("message",generateMessage("Welcome!!"));
    socket.on("sendMessage",(msg, callback)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit("message",generateMessage(msg));
        callback("Message delivered..!!");
    })
    socket.on("sendlocation",(loc,callback)=>{
        const user = getUser(socket.id);
        if(!user){
            return callback("Error..!!")
        }
        let msg = `https://www.google.com/maps?q=${loc.lat},${loc.lon}`
        io.to(user.room).emit("location-message",generateLocationMessage(user.username, msg));
        callback("Loction Shared..!!")
    })
    socket.on("disconnect",()=>{
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit("message",generateMessage(`${user.username} has left!`));
        }
    })
})

app.get("/",(req, res)=>{
    res.render("index");
})

server.listen(port,()=>{
    console.log("server is up on "+port);
})