import axios from "axios";

export default axios.create({
	baseURL: "https://webhooks.mongodb-realm.com/api/client/v2.0/app/restaurant_reviews-zzgsl/service/restaurants/incoming_webhook/",
	headers: {
		"Content-Type": "application/json",
	},
});
