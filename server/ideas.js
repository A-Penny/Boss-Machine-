const express = require('express');
const ideasRouter = express.Router();
const db = require('./db');

ideasRouter.param('ideasId', (req, res, next, id) => {
    const idea = db.getFromDatabaseById("ideas", id);
    if (idea) {
        req.idea = idea;
        next()
    } else {
        res.status(404).send('No such idea exists yet!')
    };
});

//get all ideas
ideasRouter.get('/', (req, res, next) => {
    const ideas = db.getAllFromDatabase('ideas');
    res.status(200).send(ideas);
})

//post create idea 
ideasRouter.post('/', (req, res, next) => {
    const returnedIdea = db.addToDatabase('ideas', req.body)
    res.status(200).send(returnedIdea);
})

//get idea by id
ideasRouter.get('/:ideasId', (req, res, next) => {
    console.log(req.idea);
    res.status(200).send(req.idea);
  })
//put - update idea by id
ideasRouter.put('/:ideasId', (req, res, next) => {
    const idea = db.updateInstanceInDatabase('ideas', req.body);
    res.status(200).send(idea);
  })
//delete - delete idea by id
ideasRouter.delete('/:ideasId', (req, res, next) => {
    const deleted = db.deleteFromDatabasebyId('ideas', req.idea.id)
    res.status(202).send(deleted)
  })









module.exports = ideasRouter;