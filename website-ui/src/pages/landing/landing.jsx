import React, { useEffect, useState } from "react";
import Post from "../../components/Post";
import { BsMicFill, BsFillImageFill } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineSchool } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import axios from "../../api/index";

import { useSelector, useDispatch } from "react-redux";

function Landing() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [desc, setDesc] = useState("");
  const [posts, setPosts] = useState([]);
  const [addPicture, setAddPicture] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const getFeed = async () => {
    try {
      const response = await axios.get("/posts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log(response);
      setPosts(response.data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const makePost = async () => {
    if (desc.length === 0 || !file) {
      alert("post content needed");
      return;
    }

    const formData = new FormData();

    formData.append("userId", user._id);
    formData.append("description", desc);
    formData.append("file", file);
    formData.append("picturePath", file.name);

    try {
      const response = await axios.post("/post", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log(response.data);
      setPosts(response.data);
      setDesc("");
      setFile(null);
      setAddPicture(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <main className="font-quicksand flex flex-col w-screen h-fit">
      <section className="fixed z-10 flex flex-row justify-between w-screen h-[4rem] bg-white border-b-[1px]">
        <div className="flex flex-row items-center gap-8 ml-3">
          <h1 className="font-bold text-4xl text-[#42b6f5]">Brollicgram</h1>
          <input
            type="text"
            placeholder="Sök"
            className="bg-[#d8d8d8] text-[#707070] py-2 px-2 rounded-xl focus:outline-none"
          />
        </div>
      </section>
      <section className="flex flex-row justify-between w-screen h-[50rem] px-5 pt-5">
        <div className="fixed top-[4rem] mt-10 flex flex-col w-[20rem] h-[25rem] gap-2 py-6 px-6 bg-white rounded-md">
          <h1 className="font-bold text-2xl">Profil</h1>

          <div className="flex flex-row gap-2">
            <img
              src={`http://localhost:3000/assets/${user.picturePath}`}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
            <div>
              <h4 className="font-bold h-4">{`${user.firstName} ${user.lastName}`}</h4>
              <p className="font-thin text-sm text-gray-500">
                {user.friends.length} följare
              </p>
            </div>
          </div>

          <hr />

          <div>
            <div className="flex flex-row items-center gap-2">
              <FiMapPin />
              <p>{user.location}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <AiOutlineEye />
              <p>0</p>
            </div>

            <hr />

            <h4 className="font-bold h-4">Bio</h4>
            <button
              onClick={() => {
                console.log(user.friends);
              }}
            >
              Log
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="absolute top-[4rem] left-1/2 -translate-x-1/2 mt-10 flex flex-col w-[40rem] h-[17rem] gap-6 py-6 px-6 bg-white rounded-md">
            <h1 className="font-bold text-2xl">Nytt Inlägg</h1>
            <div className="flex flex-row gap-6">
              <img
                src={`http://localhost:3000/assets/${user.picturePath}`}
                alt="profile"
                className="w-12 h-12 rounded-full"
              />
              <input
                type="text"
                placeholder="Nytt inlägg..."
                className="bg-[#d8d8d8] text-[#707070] w-11/12 py-4 px-2 rounded-xl focus:outline-none"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
            </div>
            <hr />
            <div className="flex flex-row gap-2 font-thin justify-between">
              <div
                className="flex gap-2 items-center"
                onClick={() => setAddPicture(!addPicture)}
              >
                <BsFillImageFill />
                <p>Bild</p>
              </div>

              {addPicture && <input type="file" onChange={handleFileChange} />}

              <button
                className="font-bold text-lg px-4 py-2 rounded-lg bg-[#5BBEFF] hover:scale-[101%]"
                onClick={() => {
                  makePost();
                }}
              >
                Post
              </button>
            </div>
          </div>

          <div className="absolute top-[25rem] left-1/2 -translate-x-1/2 flex flex-col gap-3">
            {posts.map((post) => {
              return <Post key={post._id} post={post} />;
            })}
          </div>
        </div>

        <div className="fixed top-[4rem] right-0 mt-10 flex mr-6 flex-col gap-8">
          <div className="flex flex-col w-[20rem] h-[25rem] gap-6 py-6 px-6 bg-white rounded-md">
            <h1 className="font-bold text-2xl">Reklam</h1>
          </div>

          <div className="flex flex-col w-[20rem] h-fit gap-6 py-6 px-6 bg-white rounded-md">
            <h1 className="font-bold text-2xl">Vänner</h1>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;
