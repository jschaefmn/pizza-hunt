// imports all the API routes to prefix their endpoint name and package them up
const router = require('express').Router();
const PizzaRoutes = require('./pizza-routes');

// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/pizzas', PizzaRoutes);

module.exports = router;