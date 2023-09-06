const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });;
app.use(cors({origin: '*'}));
const rooms = {};
require('./io')(io, rooms);
const port = process.env.PORT || 3004;


server.listen(port, () => {
    console.log('server running on port' + port);
})