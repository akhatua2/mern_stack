const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes')
const PORT = process.env.PORT || 8000;

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

app.use(routes);

app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`)
})