const express = require("express");
const reconcillationController = require("../controller/reconcillation");
const uploadFile = require("../middleware/upload");
const router = express.Router();

router.post("/", uploadFile.single("file"), reconcillationController.uploadStatement);

module.exports = router;