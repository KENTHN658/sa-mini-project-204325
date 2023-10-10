const express = require("express");
const router = express.Router();
const {  list, create} = require("../Controllers/send");


router.get("/send/:id",list)
router.post("/send", create);


module.exports = router;
