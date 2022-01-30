import { useEffect, useState } from "react";
import { get } from "../utilities";

export function useRestaurantGenerator() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(undefined);

  function getRestaurants(data) {
    return new Promise((resolve, reject) => {
      get("/api/restaurants", {
        term: data.term,
        location: data.location,
        radius: data.radius,
      }).then((restaurants) => {
        if (Object.keys(restaurants).length == 0) {
          resolve({ status: "empty" });
        }
        console.log(restaurants);
        const numFound = restaurants.length;
        const randomIndex = Math.floor(Math.random() * numFound);
        console.log(randomIndex);
        console.log(restaurants[1]);
        setSelectedRestaurant(restaurants[randomIndex]);
        resolve({ status: "normal" });
      });
    });
  }

  return {
    selectedRestaurant,
    getRestaurants,
  };
}
