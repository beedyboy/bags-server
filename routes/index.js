const express = require("express");
const routes = express.Router();

const brand = require('./brand');
const subcategory = require('./subcategory');
const subscribers = require('./subscribers');
const product = require('./product');
const reconcillation = require('./reconcillation');
const account = require('./account');

routes.use('/brands', brand);
routes.use('/subcategory', subcategory);
routes.use('/subscribers', subscribers); 
routes.use('/products', product); 
routes.use('/reconcillations', reconcillation); 
routes.use('/accounts', account); 

module.exports = routes;