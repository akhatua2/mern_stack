const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes')
const path = require("path");

const PORT = process.env.PORT || 8000;



// Add JWT Token

//Return token when login

// Send token on request

// Add function to router

//Modify response to decode token




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


app.use("/files", express.static(path.resolve(__dirname, "..", "files")))
app.use(routes);

app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`)
})