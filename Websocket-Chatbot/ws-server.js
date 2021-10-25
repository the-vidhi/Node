const WebSocket = require('ws')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message : ${message}`)
  })
  ws.send('Hello client');
})