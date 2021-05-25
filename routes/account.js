const express = require("express");
const accountController = require("../controller/account");
const Authenticated = require("../middleware/Authenticated");
const router = express.Router();

router.get("/", accountController.getAllAccounts);
router.post("/", accountController.createAccount);
router.put("/", accountController.updateAccount);
router.post("/confirm", accountController.exist);

router.delete("/:id", accountController.deleteAccount);

router.post("/auth", accountController.auth);
router.put("/auth", accountController.setRoles);

router.put("/profile", Authenticated, accountController.updateProfile);

module.exports = router;
