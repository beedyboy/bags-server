const express = require("express");
const accountController = require("../controller/account");
const router = express.Router();

router.post("/", accountController.createAccount);
router.post("/auth", accountController.auth);
router.post("/confirm", accountController.exist);
router.put("/", accountController.updateAccount);

router.get("/", accountController.getAllAccounts);
router.delete("/:id", accountController.deleteAccount);
module.exports = router;
