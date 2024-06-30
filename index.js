import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import cors from "cors";
import bodyParser from "body-parser";
import path from 'path';
import videoRoutes from "./routes/video.js";
import commentsRoutes from "./routes/comments.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: true,
});


app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use('/uploads',express.static(path.join('uploads')))

app.get('/', (req, res) => {
  res.send("hello")
});

app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/video', videoRoutes);
app.use('/comment', commentsRoutes);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log("server running");
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();
io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  // Screen share events
  socket.on("screen-share:start", ({ to }) => {
    io.to(to).emit("screen-share:start", { from: socket.id });
  });

  socket.on("screen-share:stop", ({ to }) => {
    io.to(to).emit("screen-share:stop", { from: socket.id });
  });
});
const DB_URL = process.env.CONNECTION_URL;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB database connected");
  })
  .catch((error) => {
    console.log("error");
  });
