import express from "express";
import { createUsers, getUsername } from "./users_service.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";

const router = express.Router();

async function gen_salt_password(password){
  const no_of_Rounds = 10;
  const salt = await bcrypt.genSalt(no_of_Rounds);
  const hashpassword = await bcrypt.hash(password, salt);
  // console.log(salt);
  // console.log(hashpassword);
  return hashpassword;
}


// express json() - middleware (to convert json format)
// Post movie 
router.post("/signup", async function (request, response) {
  const {username, password}= request.body;
  const usernsmeDB = await getUsername(username);
  // console.log(usernsmeDB);
  if(usernsmeDB){
    response.status(400).send({message:"user name already exit"});
   }
   else if(password.length<=8){
    
    response.status(400).send({message:"Must be 8 charcter"});

   } else{
    
    const hashedpassword = await gen_salt_password(password);
    const result = await createUsers({
      username: username,
      password: hashedpassword,
    });
    response.send(result);
    }
  });



// login page

router.post("/login", async function (request, response) {
  const {username, password}= request.body;
  const userfromDB = await getUsername(username);
  // console.log(usernsmeDB);
  if(!userfromDB){
    response.status(400).send({message:"invalid credential"});
   }
    else{
     const storedDBpassword = userfromDB.password
     const ispasswordcheck = await bcrypt.compare(password, storedDBpassword);
    //  console.log(ispasswordcheck);
    if(ispasswordcheck){
      const token = jwt.sign({id: userfromDB._id}, process.env.secret_key);
      response.send({message:"login sucessfully", token: token});
    
    }else{
      response.status(400).send({message:"invalid credential"});

    }
    }
    });
 
export default router;


