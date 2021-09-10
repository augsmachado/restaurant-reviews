import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";

// Define .env config
dotenv.config();
const MongoClient = mongodb.MongoClient;

// Define port connection
const port = process.env.PORT || 8000;

// Define connection with database
MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
	poolSize: 50,
	wtimeout: 2500,
	useNewUrlParse: true,
})
	.catch((err) => {
		console.error(err.stack);
		process.exit(1);
	})
	.then(async (client) => {
		app.listen(port, () => {
			console.log(`Server is running on port: ${port}`);
		});
	});
