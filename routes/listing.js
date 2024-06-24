const express = require("express");
const router = express.Router({mergeParams: true});
const wrapasync = require("../utils/wrapasync.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const expressError = require("../utils/expressError.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router.route ("/")
  .get ( wrapasync(listingController.index))
  .post( isLoggedIn, 
    upload.single("listing[image]"),
  wrapasync(listingController.createListing)
    );  

 //new route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route ("/:id")
.get( wrapasync(listingController.showListing))

.put( isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,
wrapasync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapasync(listingController.deleteListing));


router.get("/:id/edit", isLoggedIn, isOwner, wrapasync(listingController.renderEditForm))


router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    const listings = await Listing.find({
      title: { $regex: query, $options: 'i' } // Case-insensitive search
    });

    res.render("search", { listings });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});




module.exports = router;