const express = require("express");
const SubCategoryController = require("../controller/subcategory");
const router = express.Router();

router.post("/", SubCategoryController.create);
router.put("/", SubCategoryController.updateData);

router.get("/", SubCategoryController.getAllData);
router.delete("/", SubCategoryController.deleteData);
module.exports = router;
