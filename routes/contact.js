const express = require("express");
const Controller = require("../controller/contact");
const router = express.Router();

router.post("/", Controller.contactus); 
router.put("/", Controller.update);

router.get("/", Controller.getAllMessages);
// router.get("/:category", Controller.findByCategory);
router.delete("/:id", Controller.deleteData);
module.exports = router;
