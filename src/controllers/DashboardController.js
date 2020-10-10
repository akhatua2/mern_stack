const Event = require('../models/Event')


module.exports = {
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

    async getAllEventsbyType(req, res) {
        const {sport} = req.params;
        const query = {sport} || {}

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
}