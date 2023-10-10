import * as dotenv from 'dotenv'
dotenv.config()
import fs from 'node:fs';
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import path from 'node:path';
import http from "node:http"
import { Server } from 'socket.io';
import {searchRoute, userRoutes, friendshipRoutes, notificationRoutes, chatRoutes} from './routes/index.js';
import AuthMiddleware from './middleware/AuthMiddleware.js';
import socketManager from './utils/socketManager.js';
import createRandomUser, { generatePass } from './helper/seed-data/seedUser.js';

const app = express()
const server = http.createServer(app);

app.use(express.json())

app.use(cors({origin:"https://tubebook.vercel.app"}))

main().then(console.log("database runnig...")).catch(err => console.log(err));

async function main() {
  const production = true;
  if(process.env.NODE_ENV == "production" || production){
    console.log('runing on production')
    await mongoose.connect(process.env.MONGODB_URL);
  }else{
    console.log('runing on development')
    await mongoose.connect('mongodb://127.0.0.1:27017/onemedia');
  }
}

const io = new Server(server,{
  cors:{origin:"https://tubebook.vercel.app"}
})
io
io.on("connection",(socket)=>{
  socketManager(socket)
})
app.get('/', (req, res) => {
  res.json("api v1")
}) 
app.get('/seed-user', (req, res) => {
  createRandomUser()
  res.json("seeded")
}) 

app.use(express.static("public"))

app.use("/api/user",userRoutes);
app.use("/api/search",searchRoute);
app.use("/api/friendship",friendshipRoutes);
app.use("/api/notification",notificationRoutes);
app.use("/api/chat",chatRoutes);



export default server;