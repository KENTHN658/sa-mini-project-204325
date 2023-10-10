const express = require("express");
const router = express.Router();
const {  list, create} = require("../Controllers/goods");


router.get("/goods",list)
router.post("/goods", create);


module.exports = router;
