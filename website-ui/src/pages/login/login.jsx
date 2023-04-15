import { useState, useEffect } from "react";
import axios from "../../api/index";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("Error");
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const inputStyle =
    "bg-[#d8d8d8] text-[#707070] py-4 px-2 rounded-xl focus:outline-none";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Api call
    try {
      const response = await axios.post("/auth/login", {
        email: email,
        password: pwd,
      });

      // Auth
      localStorage.setItem("token", response.data?.token);

      navigate("/home");
    } catch (err) {
      console.log(err);
      if (false) {
      }
    }

    setEmail("");
    setPwd("");
  };

  return (
    <main className="font-quicksand flex justify-center items-center h-screen bg-[#dfdfdf]">
      <form
        className="flex flex-col w-9/12 gap-6 py-12 px-6 bg-white rounded-md"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-4xl">Login</h1>

        <input
          type="text"
          name="email"
          placeholder="Type your email"
          className={inputStyle}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="Type your password"
          className={inputStyle}
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
        />

        {err && (
          <div className="bg-red-500 h-fit w-fit py-3 px-6 flex justify-center items-center rounded-lg border-2 border-red-950">
            <p className="text-red-950 text-xl font-bold">{errMsg}</p>
          </div>
        )}
        <button
          type="submit"
          className="font-bold text-lg px-4 py-2 rounded-lg bg-[#5BBEFF] hover:scale-[101%]"
        >
          Sign in
        </button>
        <div>
          <p className="font-bold">Need an account?</p>
          <a className="text-blue-700" href="/register">
            Sign up
          </a>
        </div>
      </form>
    </main>
  );
}

export default Login;
