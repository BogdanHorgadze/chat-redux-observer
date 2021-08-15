import * as dotenv from "dotenv";
dotenv.config();
import http from "http";
import express from "express";
import WebSocket from "ws";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import {createConnection} from "typeorm";
const PORT = process.env.PORT || 5000
const app = express();

const server = http.createServer(app);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
   cors({
      origin: process.env.UI_ROOT_URI,
      credentials: true,
   })
);

app.use(cookieParser());
app.use('/api/auth', require('./routes/auth.route'))

const webSocketServer = new WebSocket.Server({
   server,
   verifyClient: function ({ req }, done) {
      let token = req.headers.authorization
      if(token){
         jwt.verify(token, process.env.JWT_SECRET as string, function (err, decoded) {
            if (err) return done(false, 403, 'Not valid token');
   
            done(true);
         });
      }
   }
});

webSocketServer.on('connection', ws => {
   ws.on('message', m => {
      
   });

   ws.on("error", e => ws.send(e));

   ws.send('Hi there, I am a WebSocket server');
});

async function start (){
   const connection = await createConnection();
}

start()

server.listen(PORT, () => console.log(`Server started on ${PORT}`))