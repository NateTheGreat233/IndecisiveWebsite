import React, { Component, useEffect, useState } from "react";
import {
  Button,
  Text,
  Slider,
  SliderTrack,
  Box,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  Image,
  Stack,
  InputGroup,
  InputLeftAddon,
  Input,
  Grid,
  GridItem,
  Link,
} from "@chakra-ui/react";

import { ExternalLinkIcon } from "@chakra-ui/icons";

import Navbar from "../Navbar";

import "../../utilities.css";
import "./Food.css";

import { useFoodList } from "../../hooks/useFoodList";
import { useRestaurantGenerator } from "../../hooks/useRestaurantGenerator";
import { useRecipeGenerator } from "../../hooks/useRecipeGenerator";

const Food = () => {
  const { selectedFoodType, foodTypeList, selectRandomFood } = useFoodList();
  const { selectedRestaurant, getRestaurants } = useRestaurantGenerator();
  const { selectedRecipe, getRecipes } = useRecipeGenerator();

  const [sliderValue, setSliderValue] = React.useState(5);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [loadingRestaurant, setLoadingRestaurant] = useState(false);
  const [loadingRecipe, setLoadingRecipe] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#f7f7f7";
  });

  return (
    <div>
      <Navbar />
      {/* <Text className="u-flex u-flex-justifyCenter u-large-text u-bold Food-title-margin">
        <b>
          Hungry but don't know <i>what</i> to eat? Look no further
        </b>
      </Text> */}
      <Grid
        h="700px"
        templateRows="repeat(7, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap="0.4cm"
        className="Food-gridmargin u-poppins"
      >
        <GridItem
          rowSpan={2}
          colSpan={2}
          bg="#e2e9ec"
          className="Food-container u-flex u-column u-flex-alignCenter Food-radius u-bold u-medium-text"
        >
          <Button
            size="lg"
            onClick={() => {
              selectRandomFood();
            }}
          >
            Generate Random Cuisine
          </Button>
          <Text className="u-full-height u-flex u-column u-flex-justifyCenter u-large-text">
            {selectedFoodType}
          </Text>
        </GridItem>
        <GridItem
          rowSpan={7}
          colSpan={3}
          bg="#e2e9ec"
          className="Food-container u-flex u-column u-flex-alignCenter Food-radius u-bold u-medium-text"
        >
          <Text>Generate Restaurant</Text>
          <Stack spacing="0.2cm">
            <InputGroup className="Food-top-margin">
              <Input
                variant="outline"
                placeholder="Type of food (optional)"
                backgroundColor="#FFFFFF"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              />
            </InputGroup>
            <InputGroup>
              <Input
                variant="outline"
                placeholder="City"
                backgroundColor="#FFFFFF"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </InputGroup>
          </Stack>
          <Text className="u-textCenter u-small-text Food-top-margin">Distance (miles)</Text>
          <Slider
            defaultValue={5}
            width="50%"
            min={1}
            max={20}
            step={1}
            onChange={(v) => setSliderValue(v)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <SliderTrack bg="blue.100">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="blue" />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              zIndex={1}
              isOpen={showTooltip}
              label={sliderValue + (sliderValue > 1 ? " miles" : " mile")}
            >
              <SliderThumb boxSize={3} />
            </Tooltip>
          </Slider>
          <Button
            isLoading={loadingRestaurant}
            className="Food-top-margin u-no-resize"
            loadingText="Generating"
            size="lg"
            onClick={() => {
              setLoadingRestaurant(true);
              setEmpty(false);
              getRestaurants({
                term: type,
                location: location,
                radius: Math.floor(sliderValue * 1609.34),
              }).then((res) => {
                setEmpty(res.status == "empty");
                setLoadingRestaurant(false);
              });
            }}
          >
            Generate Random Restaurant
          </Button>
          <div className="Food-top-margin u-full-width u-textCenter u-flex u-column u-flex-alignCenter u-scroll-y">
            {selectedRestaurant ? (
              <div className="u-full-width u-flex u-column u-flex-alignCenter">
                <Link href={selectedRestaurant.url} className="u-textCenter" isExternal>
                  {selectedRestaurant.name}
                  <ExternalLinkIcon mx="2px" />
                </Link>
                <div className="u-small-text">
                  <Text>Price: {selectedRestaurant.price}</Text>
                  <Text>Yelp Rating: {selectedRestaurant.rating}</Text>
                </div>

                <Image
                  src={selectedRestaurant.image_url}
                  className="Food-radius Food-top-margin"
                  width="50%"
                  fit="contain"
                ></Image>
                <div className="u-small-text">
                  <Link
                    href={`http://maps.google.com/?q=${selectedRestaurant.location.display_address[0]} ${selectedRestaurant.location.display_address[1]}`}
                    className="u-textCenter"
                    isExternal
                  >
                    {selectedRestaurant.location.display_address[0]}{" "}
                    {selectedRestaurant.location.display_address[1]}
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                  <Text>{selectedRestaurant.display_phone}</Text>
                </div>
              </div>
            ) : empty ? (
              <Text className="Food-top-margin u-medium-text u-bold">No Results Found</Text>
            ) : null}
          </div>
        </GridItem>
        <GridItem
          rowSpan={5}
          colSpan={2}
          bg="#e2e9ec"
          className="Food-container u-flex u-column u-flex-alignCenter Food-radius u-bold u-medium-text"
        >
          {" "}
          <Button
            className="u-flex u-no-resize Food-bottom-margin"
            loadingText="Generating"
            isLoading={loadingRecipe}
            size="lg"
            onClick={() => {
              setLoadingRecipe(true);
              getRecipes({ number: 5 }).then(() => {
                setLoadingRecipe(false);
              });
            }}
          >
            Generate Random Recipe
          </Button>
          {selectedRecipe ? (
            <div className="u-flex u-column u-flex-alignCenter u-scroll-y">
              <Link
                href={selectedRecipe.sourceUrl}
                className="u-textCenter Food-top-margin"
                isExternal
              >
                {selectedRecipe.title}
                <ExternalLinkIcon mx="2px" />
              </Link>
              <Image src={selectedRecipe.image} className="Food-radius" fit="contain"></Image>
              <Text className="Food-top-margin u-medium-text">
                <b>Ingredients</b>
              </Text>
              <div className="u-textCenter u-small-text">
                {selectedRecipe.extendedIngredients.map((ingredient, index) => (
                  <Text key={index}>
                    <b>-</b>
                    {ingredient.original}
                  </Text>
                ))}
              </div>
              <Text className="Food-top-margin u-textCenter u-medium-text">
                <b>Instructions</b>
              </Text>
              <Text className="u-textCenter u-small-text u-flex u-textLeft">
                {selectedRecipe.instructions}
              </Text>
            </div>
          ) : null}
        </GridItem>
      </Grid>
    </div>
  );
};

export default Food;
