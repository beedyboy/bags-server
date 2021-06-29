const express = require("express");
const productController = require("../controller/product");
const router = express.Router();

router.post("/", productController.createProduct);
router.put("/", productController.updateProduct);

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/:name/details", productController.getProductByName);
router.get("/category_menu/:name", productController.getProductByCategory);
router.delete("/:id", productController.deleteProduct);
module.exports = router;
