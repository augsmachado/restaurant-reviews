let restaurants;

export default class RestaurantsDAO {
	// Establish a connection handle in restaurantsDAO
	static async injectDB(conn) {
		if (restaurants) {
			return;
		}

		try {
			const database = await conn.db(process.env.RESTREVIEWS_NS);
			restaurants = database.collection("restaurants");
		} catch (err) {
			console.error(
				`Unable to establish a collection handle in restaurantsDAO: ${err}`,
				err
			);
		}
	}

	static async getRestaurants({
		filters = null,
		page = 0,
		restaurantsPerPage = 20,
	} = {}) {
		let query;
		if (filters) {
			if ("name" in filters) {
				query = { $text: { $search: filters["name"] } };
			} else if ("cuisine" in filters) {
				query = { cuisine: { $eq: filters["cuisine"] } };
			} else if ("zipcode" in filters) {
				query = { "address.zipcode": { $eq: filters["zipcode"] } };
			}
		}

		let cursor;
		try {
			cursor = await restaurants.find(query);
		} catch (err) {
			console.log(`Unable to issue find command, ${err}`);
			return { restaurantsList: [], totalNumRestaurants: 0 };
		}

		const displayCursor = cursor
			.limit(restaurantsPerPage)
			.skip(restaurantsPerPage * page);
		try {
			const restaurantsList = await displayCursor.toArray();
			const totalNumRestaurants = 
				page === 0 ? await restaurants.countDocuments(query) : 0;
			return { restaurantsList, totalNumRestaurants };
		} catch (err) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${err}`
			);
			return { restaurantsList: [], totalNumRestaurants: 0 };
		}
	}
}
