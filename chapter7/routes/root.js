const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|index(.html)?", (req, res) => {
  
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});
router.get("/new.html", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new.html"));
});
router.get("/old.html", (req, res) => {
  res.redirect(301, "/new.html");
});
module.exports=router