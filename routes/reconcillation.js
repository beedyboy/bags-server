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
router.post("/overturn", Authenticated(reconcillationController.overturn));
router.post("/final/report", Authenticated(reconcillationController.finalReport)); 
router.get("/", reconcillationController.getAllRecord);
router.get("/files", reconcillationController.getAllFiles);
router.get("/:key/:value", reconcillationController.filterRecord);
router.delete("/:id", reconcillationController.delRecord);

module.exports = router;
