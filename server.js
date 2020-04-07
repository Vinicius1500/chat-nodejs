const express = require('express')
const app = express()

app.use(express.static('public'))

const http = require('http').Server(app)
const serverSocket = require('socket.io')(http)

const porta = 8000

http.listen(porta, function(){
    console.log('Servidor iniciado. Abra o navegador em http://localhost:' +porta);
})

app.get('/', function(req, resp){
    resp.sendFile(__dirname + '/index.html')
})

serverSocket.on('connection', function(socket){
    console.log('Cliente conectado: ' + socket.id)

    socket.on('chat msg', function(msg){
        console.log(`Msg recebida do cliente ${socket.id}: ${msg}`);
        serverSocket.emit('chat msg', msg)
        
    })
})

