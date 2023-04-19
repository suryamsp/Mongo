import { client } from './index.js';

export async function createUsers(data) {
  return await client
    .db("movie")
    .collection("users")
    .insertOne(data);
}
