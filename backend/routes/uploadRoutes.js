const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const uploadController = require("../controllers/uploadController");

router.post("/", upload.single("file"), uploadController);

module.exports = router;
