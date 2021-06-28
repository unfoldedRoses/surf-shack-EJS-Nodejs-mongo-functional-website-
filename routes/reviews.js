const express = require("express");
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler } = require("../middleware");
const {
  reviewCreate,
  reviewUpdate,
  reviewDestroy,
} = require("../controllers/post");

/* review reviews create /posts/:id/reviews */
router.post("/", asyncErrorHandler(reviewCreate));

/* PUT reviews update /posts/:id/reviews/:review_id */
router.put("/:review_id", reviewUpdate);

/* DELETE reviews destroy /posts/:id/reviews/:review_id */
router.delete("/:review_id", reviewDestroy);

module.exports = router;
