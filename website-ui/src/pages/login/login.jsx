import { useState, useEffect } from "react";
import axios from "../../api/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToken, addUser } from "../../redux/features/authSlice";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [err, setErr] = useState(false);

  /* Redux state */
  const dispatch = useDispatch();

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
      dispatch(addToken(response.data?.token));
      dispatch(addUser(response.data?.user));

      setEmail("");
      setPwd("");
      navigate("/");
    } catch (err) {
      console.log(err);

      switch (err.response?.status) {
        case 400:
          setErrMsg("User with that email does not exist");

          break;

        case 403:
          setErrMsg("Invalid credentials");

          break;

        default:
          setErrMsg("Server connection failed");

          break;
      }
    }
  };

  useEffect(() => {
    setErr(true);
    setErrMsg("");
  }, [email, pwd]);

  return (
    <main className='font-quicksand flex justify-center items-center h-screen bg-[#dfdfdf]'>
      <form
        className='flex flex-col w-9/12 gap-6 py-12 px-6 bg-white rounded-md'
        onSubmit={handleSubmit}
      >
        <h1 className='font-bold text-4xl'>Login</h1>

        <input
          type='text'
          name='email'
          placeholder='Type your email'
          className={inputStyle}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <input
          type='password'
          name='password'
          placeholder='Type your password'
          className={inputStyle}
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
        />

        {err && <p className='text-red-600 text-lg font-semibold'>{errMsg}</p>}
        <button
          type='submit'
          className='font-bold text-lg px-4 py-2 rounded-lg bg-[#5BBEFF] hover:scale-[101%]'
        >
          Sign in
        </button>
        <div>
          <p className='font-bold'>Need an account?</p>
          <a className='text-blue-700' href='/register'>
            Sign up
          </a>
        </div>
      </form>
    </main>
  );
}

export default Login;
