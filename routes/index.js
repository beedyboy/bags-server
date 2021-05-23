const express = require("express");
const routes = express.Router();

const brand = require('./brand');
const subcategory = require('./subcategory');
const subscribers = require('./subscribers');
const product = require('./product');
const upload = require('./upload');

routes.use('/brands', brand);
routes.use('/subcategory', subcategory);
routes.use('/subscribers', subscribers); 
routes.use('/product', product); 
routes.use('/upload', upload); 

module.exports = routes;