const express = require('express');
const minionsRouter = express.Router();
const db = require('./db');

minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = db.getFromDatabaseById("minions", id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send("Minion with the given ID was not found!");
  }
});




//GET array of all minions
minionsRouter.get('/', (req, res, next) => {
    const minions = db.getAllFromDatabase('minions');
    console.log(minions.id);
    minions.id = Number(minions.id)
    console.log(minions.id);
    res.status(200).send(minions);
})


//POST create new minion and save to the database
minionsRouter.post('/', (req, res, next) => {
    const returnedMinion = db.addToDatabase('minions', req.body)
    res.status(200).send(returnedMinion);
})
//GET get a single minion by ID
minionsRouter.get('/:minionId', (req, res, next) => {
  console.log(req.minion);
  res.status(200).send(req.minion);
})

//PUT .. update a single minion by ID
minionsRouter.put('/:minionId', (req, res, next) => {
  const minion = db.updateInstanceInDatabase('minions', req.body);
  res.status(200).send(minion);

})
//Delete ... delete a single minion by ID
minionsRouter.delete('/:minionId', (req, res, next) => {
  const deleted = db.deleteFromDatabasebyId('minions', req.minion.id)
  res.status(202).send(deleted)
})

//delete all minions and return an empty array
minionsRouter.delete('/', (req, res, next) => {
  const emptyArray = db.deleteAllFromDatabase('minions');
  res.status(200).send(emptyArray)
})

module.exports = minionsRouter