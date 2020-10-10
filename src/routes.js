const express = require('express')
const multer = require('multer')

const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController')
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController')
const RegistrationController = require('./controllers/RegistrationController')

const uploadConfig = require('./config/upload')

const routes = express.Router();
const uploader = multer(uploadConfig);


routes.get('/', (req, res)=>{
    res.send('The API gateway lives');
})

routes.get('/register', (req, res)=>{
    res.send('Hello from registration controller');
})

//TODO: RegistrationController

//TODO: get an Registration by ID
//TODO: Registration Approval Controller
//TODO: Registration Rejection Controller



//Registration

routes.post('/registration/:eventId', RegistrationController.create)


//Login
routes.post('/login', LoginController.StorageEvent)

//User
routes.post('/user/register', UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)
routes.get('/user', UserController.getAllUsers)

//Event
routes.post('/event', uploader.single("thumbnail"), EventController.createEvent)
routes.delete('/event/:eventId', EventController.delete)

//Dashboard
routes.get('/event/:eventId', DashboardController.getEventById)
routes.get('/dashboard', DashboardController.getAllEvents)
routes.get('/dashboard/:sport', DashboardController.getAllEventsbyType)


module.exports = routes;