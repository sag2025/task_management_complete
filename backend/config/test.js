/*const pool=require("./postgres");
const getUUID=require("../utils/getuuid");
async function call()
{
try {
      const query = `
        INSERT INTO users (id,username, email, password, created_at)
        VALUES ($1, $2, $3, $4,NOW())
      `;

      await pool.query(query, [getUUID(),"sagar","hii@gmail.com" , "1234567"]);

      console.log("success"); // success
    } catch (err) {
      console.error(err);
      return 0; // failure
    }
}
call();*/

/*
const User=require("../models/user");
async function call(){


let user=new User("sa","test@gmail.com",1234);

const result=await user.save();
console.log(result);
}
call();*/
// test.js

async function testLogin() {
  try {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
    
        email: "rau@gmail.com",
        password: "1"
      })
    });

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", data);

  } catch (err) {
    console.error("Error:", err.message);
  }
}

testLogin();