const express = require("express");
const router = express.Router();
const watchLaterController = require("../Controller/watchLaterController");

router.get("", watchLaterController.index);
router.post("/:id", watchLaterController.add);
router.delete("/:id", watchLaterController.remove);

module.exports = router;
