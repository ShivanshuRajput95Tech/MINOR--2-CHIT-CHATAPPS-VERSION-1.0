import React, { useState } from "react";
import Contact from "./Contact";

const OnlineUsersList = ({
  onlinePeople,
  offlinePeople,
  selectedUserId,
  setSelectedUserId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter online people by search
  const filteredOnlinePeople = Object.keys(onlinePeople).filter((userId) => {
    const username = onlinePeople[userId]?.username || "";
    return username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Filter offline people by search
  const filteredOfflinePeople = Object.keys(offlinePeople).filter((userId) => {
    const { firstName, lastName } = offlinePeople[userId] || {};
    const fullName = `${firstName || ""} ${lastName || ""}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <section className="w-[29%] lg:w-[38%] py-3 border-r border-gray-700 px-2 lg:px-4 bg-background">
      {/* Search bar */}
      <div className="text-white flex items-center gap-2 p-1 px-3 rounded-xl bg-gray-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 hidden sm:block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0a7.5 7.5 0 1 0-10.607-10.607 7.5 7.5 0 0 0 10.607 10.607z"
          />
        </svg>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent outline-none text-white"
        />
      </div>

      {/* Online and Offline Lists */}
      <div className="max-h-[85vh] overflow-auto no-scrollbar mt-4">
        {/* Online users */}
        {filteredOnlinePeople.map((userId) => {
          const { username, avatarLink } = onlinePeople[userId];

          return (
            <Contact
              key={userId}
              userId={userId}
              username={username}
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              isOnline={true}
              avatarLink={avatarLink}
            />
          );
        })}

        {/* Offline users */}
        {filteredOfflinePeople.map((userId) => {
          const { _id, firstName, lastName, avatarLink } = offlinePeople[userId];

          return (
            <Contact
              key={_id}
              userId={_id}
              username={`${firstName} ${lastName}`}
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              isOnline={false}
              avatarLink={avatarLink}
            />
          );
        })}
      </div>
    </section>
  );
};

export default OnlineUsersList;