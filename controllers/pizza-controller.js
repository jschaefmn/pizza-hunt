const { Pizza } = require('../models');
const pizzaController = {
  // get all pizzas (GET /api/pizzas)
  getAllPizza(req, res) {
    Pizza.find({})
      .populate({
        path: 'comments',
        // used select so that we can tell Mongoose that we don't care about the __v field on comments
        // the minus (-) sign in front of the field indicates we don't want it to be returned
        select: '-__v'
      })
      .select('-__v')
      //sorts in descending order by _id value, gets newest pizza first
      .sort({ _id: -1 })
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one pizza by id GET /api/pizzas/:id
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .then(dbPizzaData => {
        // if no pizza found, send 404
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Create Pizza
  createPizza({ body }, res) {
    Pizza.create(body)
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.status(400).json(err));
    // destructure body out of Express.js req object, don't need to interface w/any other data it provides
  },

  // update pizza by id
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
    //mongoose finds single document we want to update, updates it and returns the updated document
    // if { new: true } isn't set, it will return original document, by setting it true Mongoose will be instructed to return new version of document
  },
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
    //use mongoose .findOneAndDelete method to find document to be returned and delete it from the database
  }
};

module.exports = pizzaController;

