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
  Input,
  Grid,
  GridItem,
  Link,
  Select,
} from "@chakra-ui/react";

import { ExternalLinkIcon } from "@chakra-ui/icons";

import Navbar from "../Navbar";
import SongCard from "../SongCard";

import { get } from "../../utilities";

import "../../utilities.css";
import "./Food.css";

import { useFoodList } from "../../hooks/useFoodList";
import { useRestaurantGenerator } from "../../hooks/useRestaurantGenerator";
import { useRecipeGenerator } from "../../hooks/useRecipeGenerator";
import { useMusicGenerator } from "../../hooks/useMusicGenerator";

const Music = () => {
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

  const [token, setToken] = useState(undefined);
  const {
    selectedGenre,
    getGenre,
    selectedSong,
    getSong,
    previewAudio,
    isPlaying,
    setIsPlaying,
    playlist,
    getPlaylist,
  } = useMusicGenerator();
  const [loadingGenre, setLoadingGenre] = useState(false);
  const [loadingSong, setLoadingSong] = useState(false);
  const [loadingPlaylist, setLoadingPlaylist] = useState(false);
  const [songGenre, setSongGenre] = useState(undefined);

  useEffect(() => {
    document.body.style.backgroundColor = "#f7f7f7";
    get("/api/spotifyToken").then((token) => {
      setToken(token.access_token);
    });
  }, []);

  return (
    <div>
      <Navbar />
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
            backgroundColor="white"
            loadingText="Generating"
            isLoading={loadingGenre}
            onClick={() => {
              setLoadingGenre(true);
              getGenre({ token: token, setGenre: true }).then((res) => {
                setLoadingGenre(false);
              });
            }}
          >
            Generate Random Genre
          </Button>
          <Text className="u-full-height u-flex u-column u-flex-justifyCenter u-large-text">
            {selectedGenre}
          </Text>
        </GridItem>
        <GridItem
          rowSpan={7}
          colSpan={3}
          bg="#e2e9ec"
          className="Food-container u-flex u-column u-flex-alignCenter Food-radius u-bold u-medium-text"
        >
          <Text>Generate Random Playlist</Text>
          <Stack spacing="0.2cm">
            <InputGroup className="Food-top-margin">
              <Input
                variant="outline"
                placeholder="Genre (optional)"
                backgroundColor="#FFFFFF"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              />
            </InputGroup>
            <InputGroup>
              <Input
                variant="outline"
                placeholder="Artist (optional)"
                backgroundColor="#FFFFFF"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </InputGroup>
          </Stack>
          <Text className="u-textCenter u-small-text Food-top-margin">Songs</Text>
          <Slider
            defaultValue={15}
            width="50%"
            min={1}
            max={100}
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
              label={sliderValue + (sliderValue > 1 ? " songs" : " song")}
            >
              <SliderThumb boxSize={3} />
            </Tooltip>
          </Slider>
          <Button
            isLoading={loadingPlaylist}
            disabled={true}
            className="Food-top-margin u-no-resize"
            backgroundColor="white"
            loadingText="Generating Playlist"
            size="lg"
            onClick={() => {
              setLoadingPlaylist(true);
              getPlaylist({ token: token, genres: "pop", artists: "" }).then((res) => {
                setLoadingPlaylist(false);
              });
            }}
          >
            Generate Playlist (Work in progress!)
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
            backgroundColor="white"
            isLoading={loadingSong}
            size="lg"
            onClick={() => {
              if (previewAudio) {
                previewAudio.pause();
                setIsPlaying(false);
              }
              setLoadingSong(true);
              if (songGenre == undefined) {
                getGenre({ token: token, setGenre: false }).then((res) => {
                  console.log(res);
                  getSong({ token: token, genres: res.toLowerCase() }).then((res) => {
                    setLoadingSong(false);
                  });
                });
              } else {
                getSong({ token: token, genres: songGenre.toLowerCase() }).then((res) => {
                  setLoadingSong(false);
                });
              }
            }}
          >
            Generate Random Song
          </Button>
          <Select
            placeholder="Genre (optional)"
            backgroundColor="white"
            className="u-textCenter Food-bottom-margin"
            w="50%"
            onChange={(e) => {
              setSongGenre(e.target.value);
            }}
          >
            <option value="pop">Pop</option>
            <option value="hip-hop">Hip Hop</option>
            <option value="classical">Classical</option>
          </Select>
          {selectedSong ? (
            <div className="u-flex u-column u-full-width u-textCenter u-flex-alignCenter u-scroll-y">
              <SongCard
                selectedSong={selectedSong}
                previewAudio={previewAudio}
                setIsPlaying={setIsPlaying}
                isPlaying={isPlaying}
              />
              {/*
              {console.log(selectedSong)}
              <Text className="Food-top-margin u-medium-text">
                <b>{selectedSong.name}</b>
              </Text>
              <div className="u-flex u-row">
                {selectedSong.artists.map((artist, index) => (
                  <Text key={index} className="u-small-text" display="inline-block">
                    {artist.name}
                    {index == selectedSong.artists.length - 1 ? "" : ","}&nbsp;
                  </Text>
                ))}
              </div>
              <Image
                src={selectedSong.album.images[1].url}
                className="Food-radius Food-top-margin"
                fit="contain"
              ></Image>
              {previewAudio ? (
                <Button
                  className="u-flex u-no-resize Food-top-margin"
                  backgroundColor="white"
                  size="lg"
                  onClick={() => {
                    if (isPlaying) {
                      setIsPlaying(false);
                      previewAudio.pause();
                    } else {
                      setIsPlaying(true);
                      previewAudio.play();
                    }
                  }}
                >
                  Preview Song
                </Button>
                ) : null}*/}
            </div>
          ) : null}
        </GridItem>
      </Grid>
    </div>
  );
};

export default Music;
