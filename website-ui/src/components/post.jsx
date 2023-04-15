import React, { useState } from "react";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

function Post() {
  const [like, setLike] = useState(false);
  return (
    <div className="flex flex-col w-[35rem] h-full gap-6 py-6 px-6 bg-white rounded-md">
      <div className="flex flex-row gap-2">
        <img
          src="public/images/user-profile-icon.png"
          alt="profile"
          className="h-6 w-6"
        />
        <div>
          <h4 className="font-bold h-4">Full Name</h4>
          <p className="font-thin text-sm text-gray-500">Location</p>
        </div>
      </div>

      <hr />

      <img
        src="public/images/nature-post.jpg"
        alt="post pic"
        className="rounded-sm"
      />
      <p>Description of the post</p>
      <div className="flex flex-row gap-2">
        {like ? (
          <BsHandThumbsUpFill onClick={() => setLike(false)} />
        ) : (
          <BsHandThumbsUp onClick={() => setLike(true)} />
        )}
        <FaRegComment />
      </div>
    </div>
  );
}

export default Post;
