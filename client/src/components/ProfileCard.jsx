import React from "react";

const ProfileCard = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <img
        src={profile.avatar_url}
        alt="Profile Avatar"
        className="rounded-full w-32 h-32 mx-auto"
      />
      <h2 className="text-xl font-bold text-center mt-4">{profile.name}</h2>
      <p className="text-center text-gray-600">{profile.bio}</p>
      <div className="flex justify-around mt-4">
        <div>
          <p className="text-sm font-bold">Followers</p>
          <p>{profile.followers}</p>
        </div>
        <div>
          <p className="text-sm font-bold">Following</p>
          <p>{profile.following}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
