import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()



// const express = require("express"); // only type "commanjs"
import express from "express"; // only type "module"
import { MongoClient } from "mongodb";
import moviesRouter from "./movie_api.js";
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


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
