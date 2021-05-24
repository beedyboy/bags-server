const express = require("express");
const Controller = require("../controller/subscriber");
const router = express.Router();

router.post("/", Controller.subscribe);
router.put("/", Controller.update);

router.get("/", Controller.getAllSubscribers);
router.delete("/:id", Controller.unsubscribe);
module.exports = router;
