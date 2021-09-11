import express from "express";

const router = express.Router();

// Define application routes
router.route("/").get((req, res) => {
	res.send("hello world");
});

export default router;
