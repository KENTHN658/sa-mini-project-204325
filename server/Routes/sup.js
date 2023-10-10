const express = require("express");
const router = express.Router();
const { read, list, create, update, remove } = require("../Controllers/sub");

router.get("/sup", list);

router.get("/sup/:id", read);

router.post("/sup", create);

router.put("/sup", update);

router.delete("/sup", remove);

module.exports = router;
