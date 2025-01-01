import React from "react";

const ProfileDetails = ({ user }) => {
  if (!user) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <img
        src={user.avatar_url}
        alt="User Avatar"
        className="w-32 h-32 rounded-full mx-auto"
      />
      <h2 className="text-2xl font-bold mt-4 text-center">{user.name}</h2>
      <p className="text-center text-gray-500">{user.bio || "No bio available"}</p>
      <div className="mt-4 text-center">
        <p>
          <strong>Followers:</strong> {user.followers}
        </p>
        <p>
          <strong>Following:</strong> {user.following}
        </p>
        <p>
          <strong>Public Repositories:</strong> {user.public_repos}
        </p>
      </div>
    </div>
  );
};

export default ProfileDetails;
