const WebSocket = require('ws')

const server = new WebSocket.WebSocketServer({
    port: 5000,
}, () => console.log(`Server start on 5000 port`))

const usersArray = []

server.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)

        switch (message.event) {
            case 'connection':
                ws.send(JSON.stringify({event: 'getUsers', usersArray}))
                usersArray.push(message.username)
                broadcastMessage(message)
                break
        }
    })
})

function broadcastMessage(message) {
    server.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}