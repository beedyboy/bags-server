const express = require("express");
const reconcillationController = require("../controller/reconcillation");
const Authenticated = require("../middleware/Authenticated");
const uploadFile = require("../middleware/upload");
const router = express.Router();

router.post(
  "/",
  uploadFile.single("file"),
  reconcillationController.uploadStatement
);
router.post(
  "/first-approval",
  Authenticated(reconcillationController.firstApproval)
);
router.post(
  "/second-approval",
  Authenticated(reconcillationController.secondApproval)
);
router.post("/overturn", reconcillationController.overturn);

router.get("/", reconcillationController.getAllRecord);
router.delete("/:id", reconcillationController.delRecord);

module.exports = router;
