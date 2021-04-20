const express = require('express')
const cors = require('cors')
const http = require('http')
const socker = require('socket.io')
const socketController = require('../sockets/controller')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.server = http.createServer(this.app)
        this.io = socker(this.server)
        this.paths = {}
        this.middlewares()
        this.sockets()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    sockets() {
        this.io.on('connection', socketController)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Escuchando en la url http://localhost:${this.port}`);
        })
    }
}

module.exports = Server