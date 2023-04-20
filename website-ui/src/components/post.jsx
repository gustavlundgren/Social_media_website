import axios from "../api/index";
import React, { useEffect, useState } from "react";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FiUserPlus, FiUserMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addFriend } from "../redux/features/authSlice";

function Post({ post }) {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const [like, setLike] = useState(false);
  const [count, setCount] = useState(0);
  const [isFriend, setIsFriend] = useState(user.friends.includes(post.userId));

  const handleAddFriend = async () => {
    try {
      let friendId = post.userId;

      if (friendId === user._id) {
        alert("Cant add yourself as a friend!");
        return;
      }

      const id = encodeURIComponent(user._id);
      friendId = encodeURIComponent(friendId);

      const response = await axios.put(
        `/users/${id}/${friendId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(response.data);
      dispatch(addFriend(response.data.map((friend) => friend._id)));

      console.log(user.friends.includes(user.postId));
      setIsFriend(user.friends.includes(post.userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col w-[40rem] h-full gap-6 py-6 px-6 bg-white rounded-md">
      <div className="flex justify-between">
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
        </div>
        <button
          onClick={handleAddFriend}
          className="bg-[#004d87] p-3 rounded-full text-[#7ec0f2]"
        >
          {isFriend ? <FiUserMinus /> : <FiUserPlus />}
        </button>
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
