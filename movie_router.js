import { getMovies, getMovieid, updateMovie, deleteMovie, postMovie } from './movies_service.js';
import express, { query } from "express"; // only type "module"
import {auth} from "./middleware/auth.js";



const router=express.Router()

// Get all movie
router.get("/", auth,  async function (request, response) {
//  console.log(request.query);
 
 if(request.query.rating){
  request.query.rating = +request.query.rating;
 }
//  console.log(request.query);
 
  const movie = await getMovies(request.query);
  response.send(movie);
});
// get movie by iid one movie
router.get("/:id",auth ,async function (request, response) {
  const { id } = request.params;
  console.log(id);
  // const onemovie =movies.filter((mv) => mv.id == id)
  // const onemovie =movies.find((mv) => mv.id == id);
  const onemovie = await getMovieid(id);
  // console.log(onemovie);
  onemovie
    ? response.send(onemovie)
    : response.status(404).send(`movie not found`);
});
// Update movie
router.put("/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  // console.log(data);
  // const onemovie =movies.filter((mv) => mv.id == id)
  // const onemovie =movies.find((mv) => mv.id == id);
  const updatemovie = await updateMovie(id, data);
  updatemovie
    ? response.send(updatemovie)
    : response.status(404).send(`movie not found`);
});
// Delete movie
router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(id);
  // const onemovie =movies.filter((mv) => mv.id == id)
  // const onemovie =movies.find((mv) => mv.id == id);
  const deletemovie = await deleteMovie(id);
  deletemovie.deletedCount >= 1
    ? response.send({ message: "delete movie suessfully" }) : response.status(404).send(`movie not found`);
});
// express json() - middleware (to convert json format)
// Post movie 
router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);
  // const onemovie =movies.filter((mv) => mv.id == id)
  // const onemovie =movies.find((mv) => mv.id == id);
  const postmovie = await postMovie(data);
  response.send(postmovie);
});

export default router;


