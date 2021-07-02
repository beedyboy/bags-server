const express = require("express"); 
const searchController = require("../controller/search");
const router = express.Router();

router.post("/recommend", searchController.recommend);
 
module.exports = router;
