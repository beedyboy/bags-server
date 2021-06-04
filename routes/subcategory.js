const express = require("express");
const SubCategoryController = require("../controller/subcategory");
const router = express.Router();

router.post("/", SubCategoryController.create);
router.post("/confirm", SubCategoryController.exist);
router.put("/", SubCategoryController.updateData);

router.get("/", SubCategoryController.getAllData);
router.get("/:category", SubCategoryController.findByCategory);
router.delete("/:id", SubCategoryController.deleteData);
module.exports = router;
