import React, { useState } from "react";
import { useEffect } from "react";

const RegistrationForm = ({ checkIfLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  const handleRegister = async () => {
    console.log("Register clicked", email, password);

    if (email && password && name) {
      // TODO: Validate e-mail and password against rules
      setLoading(true);

      // TODO: Use environment variable to set API location
      const result = await fetch("http://localhost:3300/register", {
        headers: { "content-type": "application/json" },
        credentials: "include",
        method: "post",
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      setResult(await result.json());
    } else {
      // TODO - Use UI, not alerts
      alert("Enter your e-mail, name and password");
    }
  };

  useEffect(() => {
    setLoading(false);

    if (result) {
      const { success } = result;

      if (!success) {
        alert(
          "Failed to register - are you already registered using this e-mail address?"
        );
      }

      checkIfLoggedIn();
    }
  }, [result]);

  return (
    <form
      action="/register"
      method="post"
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <label>E-mail: </label>
      <input
        disabled={loading}
        value={email}
        onChange={handleEmailChange}
        type="email"
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      />
      <label>Name: </label>
      <input
        disabled={loading}
        value={name}
        onChange={handleNameChange}
        type="text"
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      />
      <label>Password: </label>
      <input
        disabled={loading}
        value={password}
        onChange={handlePasswordChange}
        type="password"
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleRegister}
        disabled={loading}
      >
        Register
      </button>
    </form>
  );
};

const RegistrationContainer = ({ checkIfLoggedIn }) => (
  <div name="home" className="w-half h-screen bg-[#22333B] ">
    <div className="max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full">
      <h1 className="text-4xl sm:text-7xl font-bold text-[#ffffff]">Sign-up</h1>
      <h2 className="text-4xl sm:text-7xl font-bold text-[#84C318]">
        Register for a new account
      </h2>
      <p className="text-[#8892b0] py-4 max-w-[700px]">
        Sign-up now for some budget-friendly tasties!
      </p>
      <RegistrationForm checkIfLoggedIn={checkIfLoggedIn} />
    </div>
  </div>
);

export default RegistrationContainer;
