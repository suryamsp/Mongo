import { ObjectId } from 'mongodb';
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
    .deleteOne({ _id: new ObjectId(id) });
}
export async function updateMovie(id, data) {
  return await client
    .db("movie")
    .collection("movie")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
}
export async function getMovieid(id) {
  return await client
    .db("movie")
    .collection("movie")
    .findOne({ _id: new ObjectId(id) });
}
export async function getMovies(query) {
  return await client
    .db("movie")
    .collection("movie")
    .find(query)
    .toArray();
}
