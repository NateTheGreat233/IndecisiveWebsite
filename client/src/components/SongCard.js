import React, { useState, useEffect } from "react";
import { Button, Text, Image } from "@chakra-ui/react";

import "../utilities.css";
import "./Navbar.css";

const SongCard = (props) => {
  return (
    <div className="u-flex u-column u-full-width u-textCenter u-flex-alignCenter u-scroll-y">
      <Text className="Food-top-margin u-medium-text">
        <b>{props.selectedSong.name}</b>
      </Text>
      <div className="u-flex u-row">
        {props.selectedSong.artists.map((artist, index) => (
          <Text key={index} className="u-small-text" display="inline-block">
            {artist.name}
            {index == props.selectedSong.artists.length - 1 ? "" : ","}&nbsp;
          </Text>
        ))}
      </div>
      <Image
        src={props.selectedSong.album.images[1].url}
        className="Food-radius Food-top-margin"
        fit="contain"
      ></Image>
      {props.previewAudio ? (
        <Button
          className="u-flex u-no-resize Food-top-margin"
          backgroundColor="white"
          size="lg"
          onClick={() => {
            if (props.isPlaying) {
              props.setIsPlaying(false);
              props.previewAudio.pause();
            } else {
              props.setIsPlaying(true);
              props.previewAudio.play();
            }
          }}
        >
          Preview Song
        </Button>
      ) : null}
    </div>
  );
};

export default SongCard;
