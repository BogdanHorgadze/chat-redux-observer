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
   users: usersType
}
interface Rooms {
   [key: string]: room
}

const rooms: Rooms = {};
const updateUsers: usersType[] = []

webSocketServer.on("connection", socket => {
   const uuid = String(Date.now()); // create here a uuid for this connection

   const leave = (room: string, id?: string) => {

      const users = rooms[room].users
      // not present: do nothing

      if (!users[uuid]) return;

      // if the one exiting is the last one, destroy the room
      if (Object.keys(users).length === 1) {
         delete rooms[room]
      } else {
         // otherwise simply leave the room
         delete users[uuid]
      }
   };

   const updateUsersHandler = () => {
      if (updateUsers.length) {
         updateUsers.forEach(socket => {
            socket[Object.keys(socket)[0]].send(JSON.stringify(rooms))
         })
      }
   }

   socket.on("message", data => {
      const { message, meta, room, password } = JSON.parse(data as string);

      switch (meta) {
         case 'join':
            if (!rooms[room]) {
               rooms[room] = password ? { password, users: {} } : { users: {} }; // create the room
            }

            if (!Object.keys(rooms[room].users).includes(uuid)) {
               if (rooms[room].password === password) {
                  rooms[room].users[uuid] = socket; // join the room
                  updateUsersHandler()
               } else if (!rooms[room].password) {
                  rooms[room].users[uuid] = socket; // join the room
                  updateUsersHandler()
               } else {
                  socket.send('password not a correct')
               }
            }

            break
         case 'showRooms':
            updateUsers.push({ [uuid]: socket })
            socket.send(JSON.stringify(rooms))
            break
         case 'leave':
            leave(room);
            break
         default:
            // send the message to all in the room
            const info = JSON.stringify(message)
            Object.entries(rooms[room].users).forEach(([, sock]) => sock.send(info))
            break
      }
   });

   socket.on("close", () => {
      // for each room, remove the closed socket
      Object.keys(rooms).forEach(room => leave(room));
      updateUsersHandler()

      updateUsers.forEach((socket, i) => {
         if (Object.keys(socket)[0] === uuid) {
            updateUsers.splice(i, 1)
         }
      })
   });
});




async function start() {
   const connection = await createConnection();
}

start()

server.listen(PORT, () => console.log(`Server started on ${PORT}`))

