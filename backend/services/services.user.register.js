
const User=require("../models/user");
const registeruser= async function(body)
{
  try {
    const new_user= new User(body.username,body.email,body.password);

     const result_register= await new_user.save();
     //console.log("error");
    return result_register;
    
  } catch (error) {
    //console.error(error.message);
    return false;
  }
     
}

module.exports=registeruser;