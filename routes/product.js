const express = require("express");
const productController = require("../controller/product");
const router = express.Router();

router.post("/", productController.createProduct);
router.put("/", productController.updateProduct);

router.get("/", productController.getAllProducts);
router.delete("/", productController.deleteProduct);
module.exports = router;
