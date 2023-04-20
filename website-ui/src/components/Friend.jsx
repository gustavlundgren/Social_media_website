import React from "react";

function Friend({ friend }) {
  return (
    <div>
      <div className="flex flex-row gap-2">
        <img
          src={`http://localhost:3000/assets/${friend.picturePath}`}
          alt="profile"
          className="h-8 w-8 rounded-full"
        />
        <div>
          <h4 className="font-bold h-4">{`${friend.firstName} ${friend.lastName}`}</h4>
        </div>
      </div>
    </div>
  );
}

export default Friend;
