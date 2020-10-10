const Event = require('../models/Event')
const User = require('../models/User')


module.exports = {
    async createEvent(req, res) {

        const { title, description, price, sport } = req.body
        const { user_id } = req.headers;
        const { filename } = req.file;
        const user = await User.findById(user_id)

        if(!user) {
            return res.status(400).json({
                message: "User does not exist!"
            })
        }

        const event = await Event.create({
            title,
            description,
            price: parseFloat(price),
            user: user_id,
            thumbnail: filename,
            sport
        })

        return res.json(event);
    },

    async getEventById(req, res) {
        const {eventId} = req.params;

        try{
            const event = await Event.findById(eventId);
            return res.json(event)

        } catch(error) {
            return res.status(400).json({
                message: 'Event ID does not exist. Do you want to create a new event instead?'
            })
        }
    },

    async getAllEvents(req, res) {

        try {
            const event = await Event.find({});
            return res.json(event)

        } catch(error) {
            return res.status(400).json({
                message: 'No events yet!'
            })
        }
    },

    async getEventByType(req, res) {
        const {sport} = req.params;
        const query = sport || {}

        try {
            const event = await Event.find(query)
            if(event) {
                return res.json(event)
            }
        } catch(error) {
            return res.status(400).json({
                message: 'No events yet!'
            })
        }
    },

    async delete(req, res) {
        const { eventId } = req.params
        try {
            const event = await Event.findByIdAndDelete(eventId)
            return res.status(204)
            
        } catch(error) {
            return res.status(400).json({
                message: 'No event with this ID!'
            })
        }
    }
}