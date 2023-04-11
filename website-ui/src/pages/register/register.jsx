import React from "react";
import axios from "../../api/index";

function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/auth/register", () => {});
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='First name' />
        <input type='text' placeholder='Last name' />
        <input type='text' placeholder='Email' />
        <input type='password' placeholder='Password' />
        <input type='text' placeholder='Location' />
        <input type='text' placeholder='School' />
        <input type='file' placeholder='Profile pic' />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
