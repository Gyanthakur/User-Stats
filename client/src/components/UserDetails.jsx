// 
import React from "react";

const UserDetails = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-xl shadow-lg max-w-sm mx-auto">
      {/* Profile Image */}
      <div className="relative w-28 h-28 mx-auto">
        <img
          src={user.avatar_url}
          alt="Profile"
          className="w-full h-full rounded-full border-4 border-white shadow-lg"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-30 blur-md"></div>
      </div>

      {/* User Name */}
      <h2 className="text-2xl font-extrabold text-center mt-4 text-gray-800">
        {user.name}
      </h2>

      {/* Bio with Gradient Background and Border */}
      <p className="text-white text-center p-4 mt-4 rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 shadow-lg border-2 border-blue-300">
        {user.bio}
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-4 mt-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <span className="font-semibold">Public Repos:</span> {user.public_repos}
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <span className="font-semibold">Followers:</span> {user.followers}
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <span className="font-semibold">Following:</span> {user.following}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
