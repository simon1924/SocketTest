import express from "express";
import * as http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});


io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("send", (data) => {
        // console.log(data);
        socket.broadcast.emit("receiveMessage", data);
    });
})


server.listen(3001, () => { console.log("server running") });