const express = require("express");
const brandController = require("../controller/brand");
const router = express.Router();

router.post("/", brandController.createBrand);
router.post("/confirm", brandController.createBrand);
router.put("/", brandController.updateBrand);

router.get("/", brandController.getAllBrands);
router.delete("/", brandController.deleteBrand);
module.exports = router;
