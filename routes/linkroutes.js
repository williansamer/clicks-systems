const express = require("express");
const router = express.Router();
const linkController = require("../controller/linkcontroller")
const methodOverride = require("method-override");

router.use(methodOverride('_method'));

router.get("/", linkController.main);
router.get("/add", linkController.loadAdd);
router.get("/edit/:id", linkController.loadEditLink);
router.get("/:name", linkController.redirect);

router.post("/add", express.urlencoded({extended: true}), linkController.addLink);
router.post("/edit/:id", express.urlencoded({extended: true}), linkController.editingLink);

router.delete("/:id", express.urlencoded({extended: true}), linkController.deleteLink);
router.delete("/", express.urlencoded({extended: true}), linkController.deleteLink);

module.exports = router;