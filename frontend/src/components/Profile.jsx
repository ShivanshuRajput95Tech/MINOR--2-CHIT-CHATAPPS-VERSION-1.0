import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Chat/Nav";
import { useProfile } from "../context/profileContext";
import SelectAvatar from "./SelectAvatar";

const Profile = () => {
  const { userDetails } = useProfile();
  const [formData, setFormData] = useState({});
  const [selectedLink, setSelectedLink] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put("/api/user/profile/update", {
        ...formData,
        avatarLink: selectedLink,
      });
      // You can toast success or refresh user details here
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  useEffect(() => {
    setFormData(userDetails || {});
  }, [userDetails]);

  return (
    <div className="flex h-full min-h-screen bg-background text-white">
      <Nav />

      <div className="bg-background w-[91%] flex items-center justify-center">
        <div className="max-w-xl w-full mx-auto p-6">
          <h2 className="mb-4 text-2xl font-bold">Update Profile</h2>

          <form onSubmit={handleSubmit}>
            {/* Input Fields */}
            <div className="grid gap-4 mb-6 sm:grid-cols-2 sm:gap-6">
              {/* First Name */}
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-600 focus:ring-primary focus:border-primary"
                  placeholder="First Name"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Last Name */}
              <div className="w-full">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-600 focus:ring-primary focus:border-primary"
                  placeholder="Last Name"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  disabled
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-600 cursor-not-allowed"
                  value={userDetails?.email || ""}
                />
              </div>
            </div>

            {/* Avatar Selection */}
            <SelectAvatar
              setSelectedLink={setSelectedLink}
              selectedLink={selectedLink}
            />

            {/* Submit Button */}
            <div className="flex items-center mt-6">
              <button
                type="submit"
                className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;