import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");

  const submitData = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      // ❌ Handle errors (401)
      if (!res.ok) {
        if (
          json.message === "USER_NOT_FOUND" ||
          json.message === "INVALID_PASSWORD"
        ) {
          setError("Invalid credentials. Please try again.");
        } else {
          setError("Login failed.");
        }
        return;
      }

      // ✅ SUCCESS (200)
      const token = json.token;
      const payload = JSON.parse(atob(token.split(".")[1]));
       const userId = payload.id;

      // store token
      localStorage.setItem("token", token);
      localStorage.setItem("userid",userId)

      // optional: clear error
      setError("");

      // redirect
      navigate("/tasks");
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    submitData(data);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" ,height:"43vh",marginTop:100}}>
      <h2>Login Form</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 40 }}
      > 
      <div>
        <label style={{margin:20}}>ENTER EMAIL</label>
        <input style={{height:20}} ref={emailRef} type="email" placeholder="Email" required />
        </div >

        <div>
         <label style={{marginRight:30}}>ENTER PASSWORD</label>
        <input  style={{height:20,marginRight:20}} ref={passwordRef} type="password" placeholder="Password" required />
        </div>
        <div>
        <button style={{width:200,height:30,marginLeft:100}} type="submit">Login</button>
        </div>
      </form>

      {/* error message */}
      {error && (
        <p style={{ color: "red", marginTop: 10 }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default Login;