import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

const RestaurantsList = (props) => {
	const [restaurants, setRestaurants] = useState([]);
	const [searchName, setSearchName] = useState("");
	const [searchZip, setSearchZip] = useState("");
	const [searchCuisine, setSearchCuisine] = useState("");
	const [cuisines, setCuisines] = useState(["All Cuisines"]);

	useEffect(() => {
		retrieveRestaurants();
		retrieveCuisines();
	}, []);

	const onChangeSearchName = (err) => {
		const searchName = err.target.value;
		setSearchName(searchName);
	};

	const onChangeSearchZip = (err) => {
		const searchZip = err.target.value;
		setSearchZip(searchZip);
	};

	const onChangeSearchCuisine = (err) => {
		const searchCuisine = err.target.value;
		setSearchCuisine(searchCuisine);
	};

	const retrieveRestaurants = () => {
		RestaurantDataService.getAll()
			.then((response) => {
				console.log(response.data);
				setRestaurants(response.data.restaurants);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const retrieveCuisines = () => {
		RestaurantDataService.getCuisines()
			.then((response) => {
				console.log(response.data);
				setCuisines(["All Cuisines"].concat(response.data));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const refreshList = () => {
		retrieveRestaurants();
	};

	const find = (query, by) => {
		RestaurantDataService.find(query, by)
			.then((response) => {
				console.log(response.data);
				setRestaurants(response.data.restaurants);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const findByName = () => {
		find(searchName, "name");
	};

	const findByZip = () => {
		find(searchZip, "zipcode");
	};

	const findByCuisine = () => {
		if (searchCuisine === "All Cuisines") {
			refreshList();
		} else {
			find(searchCuisine, "cuisine");
		}
	};

  // TODO: Forms need to be rendered using better positioning and another layout, when buttons and forms are in same orientation
  // TODO: add pagination support
	return (
		<div className="container">
			<div className="row g-3">
				<div className="col-lg-4">
					<input
						type="text"
						className="form-control"
						placeholder="Search by name"
						value={searchName}
						onChange={onChangeSearchName}
					/>
					<div className="input-group-append">
						<button
							className="btn btn-outline-secondary"
							type="button"
							onClick={findByName}
						>
							Search
						</button>
					</div>
				</div>
				<div className="col-lg-4">
					<input
						type="text"
						className="form-control"
						placeholder="Search by zipcode"
						value={searchZip}
						onChange={onChangeSearchZip}
					/>
					<div className="input-group-append">
						<button
							className="btn btn-outline-secondary"
							type="button"
							onClick={findByZip}
						>
							Search
						</button>
					</div>
				</div>
				<div className="col-lg-4">
					<select className="form-select" onChange={onChangeSearchCuisine}>
						{cuisines.map((cuisine) => {
							return (
								<option value={cuisine} key={cuisine}>
									{cuisine.substr(0, 20)}
								</option>
							);
						})}
					</select>
					<button
						type="button"
						className="btn btn-outline-secondary"
						onClick={findByCuisine}
					>
						Search
					</button>
				</div>
			</div>


      <div className="row">
        {restaurants.map((restaurant) => {
          const  address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;

          return (
            <div className="col-lg-4 pb-1" key={restaurant._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine:</strong>{restaurant.cuisine}<br/>
                    <strong>Address:</strong>{address}
                  </p>
                  <div className="row">
                    <Link to={"/restaurants/"+restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                      View Reviews
                    </Link>
                    <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1" rel="noreferrer">View Maps</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
		</div>
	);
};

export default RestaurantsList;
