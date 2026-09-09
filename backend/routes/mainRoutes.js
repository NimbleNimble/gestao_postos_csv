const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const { listController } = require("../controllers/listController");
const { exportController } = require("../controllers/exportController");
const { uploadController } = require("../controllers/uploadController");

router.get("/", listController);
router.get("/export", exportController);
router.post("/import", upload.single("file"), uploadController);

module.exports = router;
