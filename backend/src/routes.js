const express = require('express')
const multer = require('multer')

const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController')
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController')
const RegistrationController = require('./controllers/RegistrationController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')


const uploadConfig = require('./config/upload')

const routes = express.Router();
const uploader = multer(uploadConfig);


routes.get('/', (req, res)=>{
    res.send('The API gateway lives');
})

routes.get('/register', (req, res)=>{
    res.send('Hello from registration controller');
})



//Registration
routes.post('/registration/:eventId', RegistrationController.create)
routes.get('/registration/:registration_id', RegistrationController.getRegistration)
routes.post('/registration/:registration_id/approvals', ApprovalController.approval)
routes.post('/registration/:registration_id/rejections', RejectionController.rejection)

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
routes.get('/dashboard/:sport', DashboardController.getAllEvents)
routes.get('/dashboard', DashboardController.getAllEvents)
routes.get('/user/events', DashboardController.getEventsByUserId)



module.exports = routes;