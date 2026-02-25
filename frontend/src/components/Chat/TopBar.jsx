import React from "react";

const TopBar = ({
  setSelectedUserId,
  selectedUserId,
  offlinePeople,
  onlinePeople,
}) => {
  const isOnline = !!onlinePeople[selectedUserId];

  const username = isOnline
    ? onlinePeople[selectedUserId]?.username
    : `${offlinePeople[selectedUserId]?.firstName || ""} ${
        offlinePeople[selectedUserId]?.lastName || ""
      }`;

  return (
    <div className="absolute top-0 left-0 right-0 flex items-center gap-3 px-5 py-4 bg-background border-b border-gray-700 text-white z-30">

      {/* Back Button */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-7 h-7 cursor-pointer hover:text-primary transition"
        onClick={() => setSelectedUserId(null)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>

      {/* Username + Status */}
      <div className="flex items-center gap-2 text-lg font-medium capitalize">
        {username}

        <span
          className={`h-3 w-3 rounded-full ${
            isOnline ? "bg-green-500" : "bg-gray-500"
          }`}
        ></span>
      </div>
    </div>
  );
};

export default TopBar;