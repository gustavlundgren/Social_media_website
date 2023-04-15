import React, { useState } from "react";
import axios from "../../api/index";

function Register() {
  const inputStyle =
    "bg-[#d8d8d8] text-[#707070] py-4 px-2 rounded-xl focus:outline-none";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/auth/register", () => {});
  };
  return (
    <main>
      <section className="font-quicksand flex justify-center items-center h-screen bg-[#dfdfdf]">
        <form
          className="flex flex-col w-9/12 gap-6 py-12 px-6 bg-white rounded-md"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-4xl">Register</h1>
          <div className="flex flex-row gap-4">
            <input
              type="text"
              placeholder="First name"
              className={`${inputStyle} w-1/2`}
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <input
              type="text"
              placeholder="Last name"
              className={`${inputStyle} w-1/2`}
            />
          </div>

          <input type="text" placeholder="Email" className={`${inputStyle}`} />
          <div className="flex flex-row gap-4">
            <input
              type="text"
              placeholder="School"
              className={`${inputStyle} w-1/2`}
            />
            <input
              type="text"
              placeholder="Location"
              className={`${inputStyle} w-1/2`}
            />
          </div>
          <input
            type="password"
            placeholder="Password"
            className={`${inputStyle}`}
          />
          <input type="file" placeholder="Profile pic" />
          <button className="font-bold text-lg px-4 py-2 rounded-lg bg-[#5BBEFF] hover:scale-[101%]">
            Register
          </button>
          <div>
            <p className="font-bold">Already have an account?</p>
            <a className="text-blue-700" href="/login">
              Sign in
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Register;
