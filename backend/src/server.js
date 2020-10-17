const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes')
const path = require("path");
const http = require('http')
const socketio = require('socket.io');


const PORT = process.env.PORT || 8000;
const server = http.Server(app)
const io = socketio(server);


if(process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

app.use(cors())
app.use(express.json())

try {
	mongoose.connect(process.env.MONGO_DB_SECRET, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	console.log('MongoDB connected')
} catch (error) {
	console.log('error')
}

// not the ideal solution

const connectUsers = {}

io.on('connection', socket => {
	const { user } = socket.handshake.query
	console.log(connectUsers)
	connectUsers[user] = socket.id
	console.log(connectUsers)

})

//app.use()
app.use((req, res, next) => {
	req.io = io
	req.connectUsers = connectUsers
	return next()
})

app.use("/files", express.static(path.resolve(__dirname, "..", "files")))
app.use(routes);

server.listen(PORT, ()=>{
	console.log(`Listening on ${PORT}`)
})