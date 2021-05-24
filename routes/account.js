const express = require("express");
const accountController = require("../controller/account");
const router = express.Router();

router.post("/", accountController.createAccount);
router.put("/", accountController.updateAccount);

router.get("/", accountController.getAllAccounts);
router.delete("/", accountController.deleteAccount);
module.exports = router;
