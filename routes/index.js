const express = require("express");
const routes = express.Router();

const brand = require('./brand');
const contact = require('./contact');
const subcategory = require('./subcategory');
const subscribers = require('./subscribers');
const product = require('./product');
const reconcillation = require('./reconcillation');
const account = require('./account');
const search = require('./search');

routes.use('/brands', brand);
routes.use('/contact', contact);
routes.use('/subcategory', subcategory);
routes.use('/subscribers', subscribers); 
routes.use('/products', product); 
routes.use('/reconcillations', reconcillation); 
routes.use('/accounts', account); 
routes.use('/search', search); 

module.exports = routes;