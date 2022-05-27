const express = require('express');
const meetingsRouter = express.Router();
const db = require('./db');



//get array of all meetings
meetingsRouter.get('/', (req, res, next) => {
    const meetings = db.getAllFromDatabase('meetings');
    res.status(200).send(meetings);
})

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = db.createMeeting();
    res.status(200).send(newMeeting);
})

meetingsRouter.delete('/', (req, res, next) => {
    const delMeeting = db.deleteAllFromDatabase('meetings');
    res.status(200).send(delMeeting);
})


module.exports = meetingsRouter;