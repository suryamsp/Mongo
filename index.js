import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

// const express = require("express"); // only type "commanjs"
import express from "express"; // only type "module"
import { MongoClient } from "mongodb";
const app = express();

// globaly declaration 
app.use(express.json());

const PORT = process.env.PORT; // process.env.PORT
// const mongo_url = "mongodb://127.0.0.1";
const mongo_url = process.env.mongo_url;

const client = new MongoClient(mongo_url); // dial
await client.connect(); // call and top level await
console.log("mongodb is connected ");

//Home page

app.get("/", function (request, response) {
  response.send("Hello world");
});

// Get all movie

app.get("/movies", async function (request, response) {

  const movie = await client
  .db("movie")
  .collection("movie")
  .find({})
  .toArray();
  response.send(movie)
});

// get movie by iid one movie

app.get("/movies/:id", async function (request, response) {
  const { id } = request.params;
  console.log(id);
  // const onemovie =movies.filter((mv) => mv.id == id)
  // const onemovie =movies.find((mv) => mv.id == id);
  const onemovie = await client
    .db("movie")
    .collection("movie")
    .findOne({ id: id });
  console.log(onemovie);
  onemovie
    ? response.send(onemovie)
    : response.status(404).send(`movie not found`);
});

// Update movie

app.put("/movies/:id",async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  console.log(data);
  // const onemovie =movies.filter((mv) => mv.id == id)
  // const onemovie =movies.find((mv) => mv.id == id);
  const updatemovie = await client
    .db("movie")
    .collection("movie")
    .updateOne({ id: id }, {$set: data});
  updatemovie
    ? response.send(updatemovie)
    : response.status(404).send(`movie not found`);
});

// Delete movie

app.delete("/movies/:id", async function (request, response) {
  const { id } = request.params;
  console.log(id);
  // const onemovie =movies.filter((mv) => mv.id == id)
  // const onemovie =movies.find((mv) => mv.id == id);
  const deletemovie = await client
    .db("movie")
    .collection("movie")
    .deleteOne({ id: id });
  deletemovie.deletedCount>=1
    ? response.send({message:"delete movie suessfully"}): response.status(404).send(`movie not found`);
});

// express json() - middleware (to convert json format)

// Post movie 

app.post("/movies", async function (request, response) {
  const data = request.body;
  console.log(data);
  // const onemovie =movies.filter((mv) => mv.id == id)
  // const onemovie =movies.find((mv) => mv.id == id);
  const postmovie = await client
    .db("movie")
    .collection("movie")
    .insertMany(data);
    response.send(postmovie);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
