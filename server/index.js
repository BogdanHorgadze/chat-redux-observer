require('dotenv').config({ path: __dirname + '/.env' })
const http = require("http");
const express = require("express");
const WebSocket = require("ws");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000
const jwt = require('jsonwebtoken')
const app = express();

const server = http.createServer(app);

app.use(
   cors({
      origin: process.env.UI_ROOT_URI,
      credentials: true,
   })
);

app.use(cookieParser());
app.use('/auth', require('./routes/auth.route'))

const webSocketServer = new WebSocket.Server({
   server,
   verifyClient: function ({ req }, done) {
      let token = req.headers.authorization
      jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
         if (err) return done(false, 403, 'Not valid token');

         done(true);
      });
   }
});

webSocketServer.on('connection', ws => {
   ws.on('message', m => {
      
   });

   ws.on("error", e => ws.send(e));

   ws.send('Hi there, I am a WebSocket server');
});


server.listen(PORT, () => console.log(`Server started on ${PORT}`))