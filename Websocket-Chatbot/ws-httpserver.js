const WebSocket = require('ws')
var http = require('http');
var url = require('url');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


var st = require('node-static');
var m = MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  });


var fileServer = new st.Server('./public');

var httpserver = http.createServer(function(request, response) 
{
	request.on('end', function () {
	var get = url.parse(request.url, true).query;
	fileServer.serve(request, response);
	}).resume();

}).listen(8080, function() {
    console.log((new Date()) + 
      ' Server is listening on port 8080');
});

const wss = new WebSocket.Server({ server: httpserver })

wss.on('connection', function(ws) {
  ws.send('Hello client')

  ws.on('message', message => {
    console.log(`Received message => ${message}`)
    

  	var query = {address: $message};
	dbo.collection("cust").find(query).toArray(function(err,result){
  	if(err)throw err;
  	if(result==0)
        {
            ws.send("Sorry, I didn't get it :(");
        }
        var str="";
        console.log(result);
        for(i=0;i<result.length;i++)
        {
            var res=result[i];
            if(i==0) str=res.ans;
            else str+=","+res.ans;
            console.log("send meassage:"+str);
            ws.send(str);
        }
  		db.close();
  
});

  })
  
})



