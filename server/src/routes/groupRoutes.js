const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { getGroups, createGroup, getGroupById } = require("../controllers/groupController");

router.get("/", auth, getGroups);
router.post("/create", auth, createGroup);
router.get("/:id", auth, getGroupById);

module.exports = router;
