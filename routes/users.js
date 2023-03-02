var express = require("express");
const { signUp } = require("../controller/auth");
var router = express.Router();

router.post("/", signUp);

module.exports = router;
