import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/index";

function Register() {
  const navigate = useNavigate();
  const inputStyle =
    "bg-[#d8d8d8] text-[#707070] py-4 px-2 rounded-xl focus:outline-none";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("school", school);
    formData.append("location", location);
    formData.append("password", password);
    formData.append("file", file);

    formData.append("picturePath", file.name);

    try {
      const response = await axios.post("/auth/register", formData);

      console.log(response);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
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
            />
            <input
              type="text"
              placeholder="Last name"
              className={`${inputStyle} w-1/2`}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Email"
            className={`${inputStyle}`}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex flex-row gap-4">
            <input
              type="text"
              placeholder="School"
              className={`${inputStyle} w-1/2`}
              onChange={(e) => setSchool(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              className={`${inputStyle} w-1/2`}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <input
            type="password"
            placeholder="Password"
            className={`${inputStyle}`}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="file"
            placeholder="Profile pic"
            onChange={handleFileChange}
          />
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
