const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {
    async store(req, res) {
        try {
            const { email, firstName, lastName, password } = req.body
            
            const existentUser = await User.findOne({email});

            if(!existentUser ) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await User.create({
                    firstName,
                    lastName,
                    password: hashedPassword,
                    email
                });  

                return res.json(user)
            }

            return res.status(400).json({
                message: 'User already exists! Do you want to login instead?'
            })


        } catch(error) {
            throw Error(`Error while registering new user : ${error}`)
        }
    } 
}