import { useEffect, useState } from "react";
import FOOD_TYPES from "../data/food-types.json";

export function useFoodList() {
  const [foodTypeList, setFoodTypeList] = useState(FOOD_TYPES);
  const [selectedFoodType, setSelectedFoodType] = useState();

  function selectRandomFood() {
    const randomFoodType = foodTypeList[Math.floor(Math.random() * foodTypeList.length)];
    setSelectedFoodType(randomFoodType);
  }

  function addCustomFoodToList() {}

  function removeRemoveFoodfromList() {}

  return {
    foodTypeList,
    selectedFoodType,
    selectRandomFood,
    addCustomFoodToList,
    removeRemoveFoodfromList,
  };
}
