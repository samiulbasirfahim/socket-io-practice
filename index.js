const express = require("express")
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")
const app = express()

app.use(cors())

app.get("/", (req, res) => {
	res.send("Hello World")
})

const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
	},
})

io.on("connection", (socket) => {
	console.log("user connected")
	console.log(socket.id)
	socket.on("message_sent", (data) => {
		socket.broadcast.emit("message_receive", data)
	})
})

app.config = {
	port: process.env.PORT || 3001,
}

server.listen(app.config.port, () => {
	console.log(`Server listening on port ${app.config.port}`)
})
