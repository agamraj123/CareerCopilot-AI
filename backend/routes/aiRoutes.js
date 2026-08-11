const express = require("express");

const router = express.Router();

const { testGemini } = require("../controllers/aiController");

router.get("/test", testGemini);

module.exports = router;