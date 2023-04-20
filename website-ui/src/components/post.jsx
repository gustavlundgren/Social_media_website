import axios from "../api/index";
import React, { useState } from "react";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";

function Post({ post }) {
  const [like, setLike] = useState(false);
  const [count, setCount] = useState(0);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const handleAddFriend = async () => {
    try {
      let friendId = post.userId;

      if (friendId === user._id) {
        alert("Cant add yourself as a friend!");
        return;
      }

      const id = encodeURIComponent(user._id);
      friendId = encodeURIComponent(friendId);

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.put(
        `/users/${id}/${friendId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
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

  return (
    <div className="flex flex-col w-[40rem] h-full gap-6 py-6 px-6 bg-white rounded-md">
      <div className="flex flex-row gap-2">
        <img
          src={`http://localhost:3000/assets/${post.userPicturePath}`}
          alt="profile"
          className="h-8 w-8 rounded-full"
        />
        <div>
          <h4 className="font-bold h-4">{`${post.firstName} ${post.lastName}`}</h4>
          <p className="font-thin text-sm text-gray-500">{`${post.location}`}</p>
        </div>
        <button onClick={() => handleAddFriend()}>add friend</button>
      </div>

      <hr />

      <img
        src={`http://localhost:3000/assets/${post.picturePath}`}
        alt="post pic"
        className="rounded-sm"
      />
      <p>{post.description}</p>
      <div className="flex flex-row items-center gap-2">
        {like ? (
          <BsHandThumbsUpFill
            onClick={() => {
              setLike(false);
              setCount(count - 1);
            }}
          />
        ) : (
          <BsHandThumbsUp
            onClick={() => {
              setLike(true);
              setCount(count + 1);
            }}
          />
        )}
        <p>{`${count} likes`}</p>
        <FaRegComment />
      </div>
    </div>
  );
}

export default Post;
