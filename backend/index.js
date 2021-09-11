import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";

import RestaurantsDAO from "./dao/restaurantsDAO.js";

// Define .env config
dotenv.config();
const MongoClient = mongodb.MongoClient;

// Define port connection
const port = process.env.PORT || 8000;

// Define connection with database
MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
	wtimeoutMS: 2500,
	useNewUrlParser: true,
})
	.catch((err) => {
		console.error(err.stack);
		process.exit(1);
	})
	.then(async (client) => {
		await RestaurantsDAO.injectDB(client);
		app.listen(port, () => {
			console.log(`Database is running on port: ${port}`);
		});
	});
