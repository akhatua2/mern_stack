const { create } = require('../models/Registration')
const Registration = require('../models/Registration')

module.exports = {
    async create(req, res) {
        const {user_id} = req.headers;
        const {eventId} = req.params;
        const {date} = req.body;

        const registration = await Registration.create({
            user: user_id,
            event: eventId,
            date
        })

        await registration
        .populate('event')
        .populate('user', '-password')
        .execPopulate()

        return res.json(registration)
    }
}