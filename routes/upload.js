const express = require("express");
const uploadController = require("../controller/upload");
const uploadFile = require("../middleware/upload");
const router = express.Router();

router.post("/", uploadFile.single("file"), uploadController.uploadStatement);

module.exports = router;