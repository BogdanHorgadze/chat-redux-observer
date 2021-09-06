import * as dotenv from "dotenv";
dotenv.config();
import http from "http";
import express from "express";
import WebSocket from "ws";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { createConnection } from "typeorm";
import authRouter from './routes/auth.route'
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
app.use('/api/auth', authRouter)

const webSocketServer = new WebSocket.Server({
   server,
   // verifyClient: function ({ req }, done) {
   //    let token = req.headers.authorization

   //    jwt.verify(token as string, process.env.JWT_SECRET as string, function (err, decoded) {
   //       if (err) return done(false, 401, 'Not valid token');

   //       done(true);
   //    });

   // }
});

type usersType = {
   [key: string]: WebSocket
}

type room = {
   password?: any
   users?: [usersType] | []
}
interface Rooms {
   [key: string]: room
}

const rooms: Rooms = {};

webSocketServer.on("connection", socket => {
   const uuid = String(Date.now()); // create here a uuid for this connection
   const leave = (room: string) => {

      const users = rooms[room]?.users
      // not present: do nothing

      users?.forEach(user => {
         if (!user[uuid]) return;
      });

      // if the one exiting is the last one, destroy the room
      if (users?.length === 1) {
         delete rooms[room]
      } else {
         // otherwise simply leave the room
         const leaver = users?.findIndex((user) => user[uuid])
         if (leaver) {
            users?.splice(leaver, 1)
         }
      }
   };

   socket.on("message", data => {
      const { message, meta, room, password } = JSON.parse(data as string);
      const users = rooms[room]?.users
      switch (meta) {
         case 'join':
            if (!rooms[room]) {
               rooms[room] = password ? { password, users: [{[uuid]:socket}] } : { users: [{[uuid]:socket}] }; // create the room
               webSocketServer.clients.forEach((client) => {
                  client.send(JSON.stringify(rooms))
               })
            }
            users?.forEach(user => {
               if (users.length !== 0) {
                  if (!user[uuid]) {
                     if (rooms[room].password === password) {
                        console.log(users)
                        users.push({ [uuid]: socket }); // join the room
                     } else if (!rooms[room].password) {
                        users.push({ [uuid]: socket }); // join the room
                     } else {
                        socket.send('password not a correct')
                     }
                  }
               }
            })
            break
         case 'showRooms':
            socket.send(JSON.stringify(rooms))
            break
         case 'leave':
            leave(room);
            break
         default:
            const info = JSON.stringify(message)
            rooms[room].users?.forEach(user => {
               user[Object.keys(user)[0]].send(info)
            })
            break
      }
      console.log(rooms)
   });

   socket.on("close", () => {
      // for each room, remove the closed socket
      Object.keys(rooms).forEach(room => leave(room));
   });
});




async function start() {
   const connection = await createConnection();
}

start()

server.listen(PORT, () => console.log(`Server started on ${PORT}`))