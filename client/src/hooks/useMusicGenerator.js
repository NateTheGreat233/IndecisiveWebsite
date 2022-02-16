import { useEffect, useState } from "react";
import { get } from "../utilities";

export function useMusicGenerator() {
  const [selectedGenre, setSelectedGenre] = useState(undefined);
  const [selectedSong, setSelectedSong] = useState(undefined);
  const [playlist, setPlaylist] = useState(undefined);
  const [previewAudio, setPreviewAudio] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  function getGenre(data) {
    return new Promise((resolve, reject) => {
      get("/api/genres", { token: data.token }).then((res) => {
        const genreList = res.genres;
        const numFound = res.genres.length;
        const randomIndex = Math.floor(Math.random() * numFound);
        if (data.setGenre) {
          setSelectedGenre(genreList[randomIndex]);
        }
        resolve(genreList[randomIndex]);
      });
    });
  }

  function getSong(data) {
    return new Promise((resolve, reject) => {
      get("/api/songs", { genres: data.genres, artists: "", token: data.token }).then((res) => {
        const songList = res.tracks;
        const numFound = res.tracks.length;
        const randomIndex = Math.floor(Math.random() * numFound);
        const previewUrl = res.tracks[randomIndex].preview_url;
        setSelectedSong(res.tracks[randomIndex]);
        if (previewUrl) {
          setPreviewAudio(new Audio(res.tracks[randomIndex].preview_url));
        } else {
          setPreviewAudio(undefined);
        }
        console.log(res.tracks[randomIndex].preview_url);
        resolve();
      });
    });
  }

  function getPlaylist(data) {
    return new Promise((resolve, reject) => {
      get("/api/songs", { genres: data.genres, artists: data.artists, token: data.token }).then(
        (res) => {
          console.log(res.tracks.length);
          console.log(res.tracks);
          setPlaylist(res.tracks);
          resolve();
        }
      );
    });
  }

  return {
    selectedGenre,
    getGenre,
    selectedSong,
    getSong,
    previewAudio,
    isPlaying,
    setIsPlaying,
    playlist,
    getPlaylist,
  };
}
