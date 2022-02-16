/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const yelp = require("yelp-fusion");
const YELP_API_KEY = process.env.YELP_API_KEY;
const yelpClient = yelp.client(YELP_API_KEY);

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const fetch = require("node-fetch");
const request = require("request");

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

require("dotenv").config();

//initialize socket
const socketManager = require("./server-socket");

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.get("/restaurants", (req, res) => {
  yelpClient
    .search(req.query)
    .then((response) => {
      res.send(response.jsonBody.businesses);
    })
    .catch((e) => {
      res.send({});
      console.log(e);
    });
});

router.get("/recipes", (req, res) => {
  fetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=${req.query.number}`
  )
    .then((response) => response.json())
    .then((data) => {
      res.send(data);
    });
});

router.get("/spotifyToken", (req, res) => {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " + Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString("base64"),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });
});

router.get("/genres", (req, res) => {
  let options = {
    url: "https://api.spotify.com/v1/recommendations/available-genre-seeds",
    headers: { Authorization: "Bearer " + req.query.token },
    json: true,
  };
  request.get(options, function (error, response, body) {
    res.send(body);
  });
});

router.get("/songs", (req, res) => {
  let options = {
    url: `https://api.spotify.com/v1/recommendations?seed_artists=${req.query.artists}&seed_genres=${req.query.genres}`,
    headers: { Authorization: "Bearer " + req.query.token },
    json: true,
  };
  console.log(options.url);
  request.get(options, function (error, response, body) {
    console.log(body);
    res.send(body);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
