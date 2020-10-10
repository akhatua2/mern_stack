const express = require('express')
const multer = require('multer')

const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController')
const uploadConfig = require('./config/upload')

const routes = express.Router();
const uploader = multer(uploadConfig);


routes.get('/', (req, res)=>{
    res.send('The API gateway lives');
})

routes.get('/register', (req, res)=>{
    res.send('Hello from registration controller');
})

//User
routes.post('/user/register', UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)

//Event
routes.post('/event', uploader.single("thumbnail"), EventController.createEvent)

module.exports = routes;