const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    async StorageEvent(req, res) {
        try {
            const {email, password} = req.body

            if(!email || !password) {
                return res.status(200).json({
                    message: "Required field missing! Please enter email and password."
                })
            }

            const user = await User.findOne({email});
            if(!user) {
                return res.status(200).json({
                    message: "User not found. Do you want to register instead?"
                })
            }

            if(user && await bcrypt.compare(password, user.password)) {
                const userResponse = {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
                return jwt.sign({user: userResponse}, 'secret', (err, token) => {
                    return res.json({
                        user: token,
                        user_id: user._id
                    })
                })
                // return res.json(userResponse)
            } else {
                return res.status(200).json({
                    message: "Email or password incorrect!"
                })
            }
        } catch(error) {
            throw Error(`Error while authentication a user ${error}`)
        }
    }
}