const express = require("express");
const router = express.Router();

// const listController = require("../controllers/listController");
const {
  listController,
  exportController,
} = require("../controllers/listController");

router.get("/", listController);
router.get("/export", exportController);

module.exports = router;
