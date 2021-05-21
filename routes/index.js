const express = require("express");
const routes = express.Router();

const brand = require('./brand');
const subcategory = require('./subcategory');
const subscribers = require('./subscribers');
const product = require('./product');

routes.use('/brand', brand);
routes.use('/subcategory', subcategory);
routes.use('/subscribers', subscribers); 
routes.use('/product', product); 

module.exports = routes;