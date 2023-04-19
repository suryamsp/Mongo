import express from "express";
import { createUsers } from "./users_service.js";
import bcrypt from "bcrypt";

const router = express.Router();

async function gen_salt_password(password){
  const no_of_Rounds = 10;
  const salt = await bcrypt.genSalt(no_of_Rounds);
  const hashpassword = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hashpassword);
  return hashpassword;
}


// express json() - middleware (to convert json format)
// Post movie 
router.post("/signup", async function (request, response) {
  const {username, password}= request.body;
  const hashedpassword = await gen_salt_password(password);
  const result = await createUsers({
    username: username,
    password: hashedpassword,
  });
  response.send(result);
});

export default router;


