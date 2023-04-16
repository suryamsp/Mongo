import { client } from './index.js';

export async function postMovie(data) {
  return await client
    .db("movie")
    .collection("movie")
    .insertMany(data);
}
export async function deleteMovie(id) {
  return await client
    .db("movie")
    .collection("movie")
    .deleteOne({ id: id });
}
export async function updateMovie(id, data) {
  return await client
    .db("movie")
    .collection("movie")
    .updateOne({ id: id }, { $set: data });
}
export async function getMovieid(id) {
  return await client
    .db("movie")
    .collection("movie")
    .findOne({ id: id });
}
export async function getMovies() {
  return await client
    .db("movie")
    .collection("movie")
    .find({})
    .toArray();
}
