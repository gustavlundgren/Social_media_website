import React from "react";
import Post from "../../components/post";

function Landing() {
  return (
    <main className="font-quicksand flex flex-col w-screen h-fit">
      <section className="flex flex-row justify-between w-screen h-[4rem] bg-white">
        <div className="flex flex-row items-center gap-8 ml-3">
          <h1 className="font-bold text-4xl text-[#42b6f5]">Brollicgram</h1>
          <input
            type="text"
            placeholder="Search"
            className="bg-[#d8d8d8] text-[#707070] py-2 px-2 rounded-xl focus:outline-none"
          />
        </div>
      </section>
      <section className="flex flex-row justify-between w-screen h-[50rem] px-5 pt-5">
        <div className="flex flex-col w-[20rem] h-full gap-6 py-6 px-6 bg-white rounded-md">
          <h1 className="font-bold text-2xl">Profile</h1>

          <div className="flex flex-row gap-2">
            <img
              src="public/images/user-profile-icon.png"
              alt="profile"
              className="h-6 w-6"
            />
            <div>
              <h4 className="font-bold h-4">Full Name</h4>
              <p className="font-thin text-sm text-gray-500">Skola</p>
            </div>
          </div>

          <hr />

          <div>
            <div className="flex flex-row gap-2">
              <h4 className="font-bold h-4">Location:</h4>
              <p>Hammarö</p>
            </div>
            <div className="flex flex-row gap-2">
              <h4 className="font-bold h-4">Views:</h4>
              <p>1.7k</p>
            </div>
            <div className="flex flex-row gap-2">
              <h4 className="font-bold h-4">Interactions:</h4>
              <p>400</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col w-[35rem] h-[17rem] gap-6 py-6 px-6 bg-white rounded-md">
            <h1 className="font-bold text-2xl">New Post</h1>
            <div className="flex flex-row gap-6">
              <img
                src="public/images/user-profile-icon.png"
                alt="profile"
                className="w-12 h-12"
              />
              <input
                type="text"
                placeholder="What have you been up to..."
                className="bg-[#d8d8d8] text-[#707070] w-11/12 py-4 px-2 rounded-xl focus:outline-none"
              />
            </div>
            <hr />
          </div>

          <div className="flex flex-col gap-3">
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>

        <div className="flex  flex-col gap-8">
          <div className="flex flex-col w-[20rem] h-full gap-6 py-6 px-6 bg-white rounded-md">
            <h1 className="font-bold text-2xl">Ad</h1>
          </div>

          <div className="flex flex-col w-[20rem] h-full gap-6 py-6 px-6 bg-white rounded-md">
            <h1 className="font-bold text-2xl">Friends</h1>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;
