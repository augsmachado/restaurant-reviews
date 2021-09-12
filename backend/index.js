import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";

import RestaurantsDAO from "./dao/restaurantsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

// Define .env config
dotenv.config();
const MongoClient = mongodb.MongoClient;

// Define port connection
const port = process.env.PORT || 8000;

// Define connection with database
MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
	useNewUrlParser: true,
	wtimeoutMS: 2500,
	maxPoolSize: 50,
})
	.catch((err) => {
		console.error(err.stack);
		process.exit(1);
	})
	.then(async (client) => {
		await RestaurantsDAO.injectDB(client);
		await ReviewsDAO.injectDB(client);
		app.listen(port, () => {
			console.log(`Database is running on port: ${port}`);
		});
	});
