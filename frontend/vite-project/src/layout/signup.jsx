
 import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitData = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json_res = await res.json();

      if (!res.ok) {
        alert(json_res.message || "Something went wrong");
        alert("please login again correctly");
        navigate("/login");
        return;
      }

      alert(`${data.username} has been successfully registered`);
      alert("Please login again");
      navigate("/login");
      
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    submitData(data);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center",height:"55vh" }}>
      <h2>SIGN UP</h2>

      <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:50,justifyContent:"center",alignItems:"center"}}>

        <div>
        <label for="username" style={{margin:20}}>USERNAME</label>
        <input  ref={usernameRef} placeholder="Username" style={{
        width:200,height:30}} />
        </div>
        
         <div>
          <label for="email" style={{margin:20 ,paddingRight:40}}>EMAIL</label>
       <input ref={emailRef} placeholder="Email" style={{width:200,height:30}} />
       </div>
        
         <div>
        <label for="password" style={{margin:20}}>PASSWORD</label>
        <input ref={passwordRef} type="password" style={{ width:200,height:30}}/> 
        </div>
    

        <button type="submit" style={{width:200,height:30}}>Submit</button>
      </form>
    </div>
  );
}

export default SignUp;