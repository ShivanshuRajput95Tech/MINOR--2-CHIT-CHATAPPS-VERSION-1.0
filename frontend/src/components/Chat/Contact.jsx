// Contact.jsx
import React from "react";
import Avatar from "./Avatar";

const Contact = ({
  userId,
  username,
  selectedUserId,
  setSelectedUserId,
  isOnline,
  avatarLink,
}) => {
  return (
    <li
      key={userId}
      className={`flex items-center gap-4 cursor-pointer capitalize py-2 lg:py-3 px-2 lg:px-5 rounded-[1.3rem] ${
        selectedUserId === userId ? "bg-primary" : "hover:bg-gray-700"
      }`}
      onClick={() => {
        setSelectedUserId(userId);
        console.log(userId);
      }}
    >
      {/* Avatar Component */}
      <Avatar
        userId={userId}
        username={username}
        isOnline={isOnline}
        avatarLink={avatarLink}
      />

      {/* Username */}
      <span className="text-xs lg:text-base text-center flex-1">
        {username}
      </span>

      {/* Online Badge */}
      {isOnline && (
        <span className="text-xs rounded-full bg-green-500 px-2 py-1 text-black">
          Active
        </span>
      )}
    </li>
  );
};

export default Contact;