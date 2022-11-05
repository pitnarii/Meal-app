import registrationresized1 from "../assets/registrationresized1.png";
import React, { useState } from "react";

const RegistrationForm = ({ checkIfLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRepeatPasswordChange = (e) => setRepeatPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  const handleRegister = async () => {
    console.log("Register clicked!", email, password);

    if (repeatPassword !== password) {
      alert("Passwords do not match");
      return;
    }

    if (email && password && name) {
      setLoading(true);

      const response = await fetch("http://localhost:3300/register", {
        headers: { "content-type": "application/json" },
        credentials: "include",
        method: "post",
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      setLoading(false);

      const result = await response.json();

      if (!result.success) {
        alert(
          "Failed to register - are you already registered using this e-mail address?"
        );
      }

      checkIfLoggedIn();
      window.location.href = "/";
    } else {
      alert("Enter your e-mail, name and password");
    }
  };

  return (
    <div class="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div class="w-full p-6 m-auto bg-white rounded-md shadow-md border-top lg:max-w-md">
        <h4 class="text-2xl text-center underline text-amber-900">
          Create Account
        </h4>
        <div class="mt-6">
          <div class="relative">
            <input
              d="name"
              name="name"
              type="text"
              disabled={loading}
              value={name}
              onChange={handleNameChange}
              class="w-full h-10 text-gray-900 placeholder-transparent rounded border-b-2 border-gray-300 peer focus:outline-none focus:border-orange-500"
              placeholder="Username"
            />
            <label
              for="name"
              class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              &nbsp;&nbsp;Name
            </label>
          </div>
          <br />
          <div class="relative mb-8">
            <input
              id="email"
              name="email"
              disabled={loading}
              type="text"
              class="w-full h-10 text-gray-900 placeholder-transparent rounded border-b-2 border-gray-300 peer focus:outline-none focus:border-orange-500"
              placeholder="john@doe.com"
              value={email}
              onChange={handleEmailChange}
            />
            <label
              for="email"
              class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              &nbsp;&nbsp;Email address
            </label>
          </div>
          <div class="relative mb-8">
            <input
              id="password"
              name="password"
              type="password"
              disabled={loading}
              value={password}
              class="w-full h-10 text-gray-900 placeholder-transparent rounded border-b-2 border-gray-300 peer focus:outline-none focus:border-orange-500"
              placeholder="password"
              onChange={handlePasswordChange}
            />
            <label
             for="Password"
              class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
             &nbsp;&nbsp;Password
            </label>
          </div>

          <div class="relative mb-4">
            <input
              id="repeatpassword"
              name="repeatpassword"
              disabled={loading}
              value={repeatPassword}
              type="password"
              class="w-full h-10 text-gray-900 placeholder-transparent rounded border-b-2 border-gray-300 peer focus:outline-none focus:border-orange-500"
              placeholder="password"
              onChange={handleRepeatPasswordChange}
            />
            <label
              for="Repeat Password"
              class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              &nbsp;&nbsp;Repeat Password
            </label>
          </div>

          <div class="mt-6">
            <button
              onClick={handleRegister}
              disabled={loading}
              class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#C6480C] rounded-md hover:bg-orange-500 focus:outline-none focus:bg-purple-600"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegistrationContainer = ({ checkIfLoggedIn }) => (
  <div
    style={{
      backgroundImage: `url(${registrationresized1})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "90%",
    }}
    name="home"
    className="w-half h-screen bg-[#F1F1EF] "
  >
    <div className="max-w-[700px] mx-left pl-20 flex flex-col justify-center h-full">
      <p className="text-2xl text-center text-[#864540] text-decoration-line: underline py-4 max-w-[700px]">
        Create Account
      </p>
      <RegistrationForm checkIfLoggedIn={checkIfLoggedIn} />
    </div>
  </div>
);

export default RegistrationContainer;
