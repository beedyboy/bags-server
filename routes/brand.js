const express = require("express");
const brandController = require("../controller/brand");
const router = express.Router();

router.post("/", brandController.createBrand);
router.post("/confirm", brandController.exist);
router.put("/", brandController.updateBrand);

router.get("/", brandController.getAllBrands);
router.delete("/:id", brandController.deleteBrand);
module.exports = router;
