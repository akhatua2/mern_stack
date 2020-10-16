const Event = require('../models/Event')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


module.exports = {
    createEvent(req, res) {


        jwt.verify(req.token, 'secret', async(err, authData) => {
            if(err) {
                res.sendStatus(401);

            } else {
                const { filename } = req.file;
                const user = await User.findById(authData.user._id)
        
                if(!user) {
                    return res.status(400).json({
                        message: "User does not exist!"
                    })
                }
        
                const event = await Event.create({
                    title,
                    description,
                    price: parseFloat(price),
                    user: authData.user._id,
                    thumbnail: filename,
                    sport,
                    date
                })
        
                return res.json({authData, event});
        

            }
        })

        const { title, description, price, sport, date } = req.body
    },

    delete(req, res) {



        jwt.verify(req.token, 'secret', async(err, authData) => {
            if(err) {
                res.sendStatus(401);

            } else {
        
                const { eventId } = req.params;
                try {
                    await Event.findByIdAndDelete(eventId)
                    return res.status(204).send()
        
                } catch(error) {
                    return res.status(400).json({
                        message: 'No event with this ID!'
                    })
                }

            }
        })


    }
}