var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

const url = 'ws://localhost:8080/'
const WebSocket = require('ws')
const connection = new WebSocket(url)
connection.onopen = () => {  
  connection.send('Hello server');
}

connection.onmessage = client => {
  console.log(client.data);
}

connection.onerror = error => {
  console.log(`WebSocket error: ${error}`);
}