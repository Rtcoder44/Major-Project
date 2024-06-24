const express = require("express");
const router = express.Router({mergeParams: true});
const wrapasync = require("../utils/wrapasync.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const reviewController = require("../controller/review.js")




//Reviews
//Post Route
router.post("/", isLoggedIn,validateReview, wrapasync(reviewController.createReview));
 
 // delete Review routes
 router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapasync(reviewController.deleteReview));

 module.exports= router;