import { useState, useEffect } from "react";
import axios from "../../api/index";
import { FiUser } from "react-icons/fi";
import { AiOutlineLock } from "react-icons/ai";

function Login() {
  const [usr, setUsr] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("Error");
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const usrRegex = /^.{4, 20}$/;
  const pwdRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(pwdRegex.test(pwd));

    // Api call
    try {
      const response = await axios.post(
        "/login",
        JSON.stringify({ usr, pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }

    // Auth

    setUsr("");
    setPwd("");
  };

  return (
    <main className='flex justify-center items-center w-screen h-screen bg-slate-300'>
      <form
        className='flex flex-col w-[22rem] h-[25rem] border-2 rounded-lg gap-6 px-4 py-2 bg-white'
        onSubmit={handleSubmit}
      >
        <h1 className='font-bold text-4xl'>Login</h1>
        <label htmlFor='email'>
          Email
          <FiUser></FiUser>
        </label>
        <input
          type='text'
          name='email'
          placeholder='Type your email'
          className='border-b-[0.15rem] border-black'
          onChange={(e) => {
            setUsr(e.target.value);
          }}
        />
        <label htmlFor='password'>
          Password
          <AiOutlineLock></AiOutlineLock>
        </label>
        <input
          type='password'
          name='password'
          placeholder='Type your password'
          className='border-b-[0.15rem] border-black'
          onChange={(e) => setPwd(e.target.value)}
        />

        {err && (
          <div className='bg-red-500 h-fit w-fit py-3 px-6 flex justify-center items-center rounded-lg border-2 border-red-950'>
            <p className='text-red-950 text-xl font-bold'>{errMsg}</p>
          </div>
        )}
        <button
          type='submit'
          className='h-16 border-2 border-black rounded-sm mb-2 hover:bg-black hover:text-white mt-2 font-bold'
        >
          Sign in
        </button>
      </form>
    </main>
  );
}

export default Login;
