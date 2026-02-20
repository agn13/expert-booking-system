const router = require("express").Router();

const {
  getExperts,
  getExpertById
} = require("../controllers/expertController");

router.get("/", getExperts);

router.get("/:id", getExpertById);

module.exports = router;