import axios from "../api/index";
import React, { useEffect, useState } from "react";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";

function Post({ post }) {
  const [like, setLike] = useState(false);
  const [user, setUser] = useState();
  const [count, setCount] = useState(0);

  const token = useSelector((state) => state.auth.token);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/users/${post.userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log(response.data);

      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {user && (
        <div className='flex flex-col w-[40rem] h-full gap-6 py-6 px-6 bg-white rounded-md'>
          <div className='flex flex-row gap-2'>
            <img
              src='public/images/user-profile-icon.png'
              alt='profile'
              className='h-6 w-6'
            />
            <div>
              <h4 className='font-bold h-4'>{`${user.firstName} ${user.lastName}`}</h4>
              <p className='font-thin text-sm text-gray-500'>{`${user.location}`}</p>
            </div>
          </div>

          <hr />

          <img
            src='public/images/linkan.jpg' // nature-post.jpg'
            alt='post pic'
            className='rounded-sm'
          />
          <p>{post.description}</p>
          <div className='flex flex-row items-center gap-2'>
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
      )}
    </>
  );
}

export default Post;
