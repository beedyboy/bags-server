const express = require("express");
const routes = express.Router();

const brand = require('./brand');
const subcategory = require('./subcategory');
const subscribers = require('./subscribers');
const product = require('./product');
const upload = require('./upload');
const account = require('./account');

routes.use('/brands', brand);
routes.use('/subcategory', subcategory);
routes.use('/subscribers', subscribers); 
routes.use('/products', product); 
routes.use('/upload', upload); 
routes.use('/accounts', account); 

module.exports = routes;