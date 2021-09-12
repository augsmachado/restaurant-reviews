import express from "express";
import RestaurantsCtrl from "./restaurants.controller.js";
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router();

// Define route for the restaurants using filters: zipcode, name and type of cuisine
router.route("/").get(RestaurantsCtrl.apiGetRestaurants);

// Define route for a specific restaurant
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById);

// Define route to get a list of cuisines
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines);

// Define routes for reviews
router
	.route("/review")
	.post(ReviewsCtrl.apiPostReview)
	.put(ReviewsCtrl.apiUpdateReview)
	.delete(ReviewsCtrl.apiDeleteReview);

export default router;
