import React from "react";

const UserDetails = ({ name, signOut }) => {
  return (
    <div name="home" className="w-half h-screen bg-[#22333B] ">
      <div className="max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full">
        <h1 className="text-4xl sm:text-7xl font-bold text-[#ffffff]">
          My profile
        </h1>
        <h2 className="text-4xl sm:text-7xl font-bold text-[#84C318]">
          Welcome, {name}!
        </h2>
        <p className="text-[#8892b0] py-4 max-w-[700px]">
          You're signed in! <button onClick={signOut}>Sign out</button>
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
