const express = require('express')
const routes = express.Router();
const UserController = require('./controllers/UserController')


routes.get('/', (req, res)=>{
    res.send('Hello from nodemon');
})

routes.get('/register', (req, res)=>{
    res.send('Hello from registration controller');
})

routes.post('/user/register', UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)

module.exports = routes;