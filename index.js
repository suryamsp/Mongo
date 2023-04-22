import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import {auth} from "./middleware/auth.js";
dotenv.config()



// const express = require("express"); // only type "commanjs"
import express from "express"; // only type "module"
import { MongoClient } from "mongodb";
import moviesRouter from "./movie_router.js";
import cors from "cors";


import usersRouter from "./users_routers.js";



export const app = express();

// globaly declaration 
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT; // process.env.PORT
// const mongo_url = "mongodb://127.0.0.1";
const mongo_url = process.env.mongo_url;

export const client = new MongoClient(mongo_url); // dial
await client.connect(); // call and top level await
console.log("mongodb is connected ");

//Home page
app.get("/", function (request, response) {
  response.send("Hello world");
});

app.use("/movies", moviesRouter);
app.use("/users", usersRouter);


const mobiles=[
  {
    "model": "OnePlus 9 5G",
    "img": "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
    "company": "Oneplus"
  },
  {
    "model": "Iphone 13 mini",
    "img": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
    "company": "Apple"
  },
  {
    "model": "Samsung s21 ultra",
    "img": "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
    "company": "Samsung"
  },
  {
    "model": "Xiomi mi 11",
    "img": "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
    "company": "Xiomi"
  }
]

app.get("/mobiles", auth, async function (request, response) {
  const mobiles= await client
  .db("movie")
  .collection("mobiles")
  .find({})
  .toArray();
  response.send(mobiles);
});


app.post("/mobiles", async function (request, response) {
  const data = request.body;
  const result = await client
  .db("movie")
  .collection("mobiles")
  .insertMany(data);

  response.send(result);
});


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
