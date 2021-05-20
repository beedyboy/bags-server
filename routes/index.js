const express = require("express");
const routes = express.Router();

const brand = require('./brand');
const subcategory = require('./subcategory');
const subscribers = require('./subscribers');

routes.use('/brand', brand);
routes.use('/subcategory', subcategory);
routes.use('/subscribers', subscribers); 

module.exports = routes;