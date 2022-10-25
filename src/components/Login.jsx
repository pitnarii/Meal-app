import Loginresized from '../assets/Loginresized.jpg';
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

      <div class="relative flex flex-col justify-center p-4 items-center min-h-screen overflow-hidden">
            <div
                class="w-full p-6  bg-white rounded-md shadow-md border-top lg:max-w-md">
               
                <form class="mt-6">

                    
                    <div class="relative mb-8">
                        <input id="email" name="email" type="text"
                            class="w-full h-10 text-gray-900 rounded placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-orange-500"
                            placeholder="john@doe.com" />
                        <label for="email"
                            class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">&nbsp;&nbsp;Email
                            address</label>
                    </div>
                    <div class="relative mb-4">
                        <input id="password" name="password" type="password"
                            class="w-full h-10 text-gray-900 rounded placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-orange-500"
                            placeholder="john@doe.com" />
                        <label for="Password"
                            class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                            &nbsp;&nbsp;Password</label>
                    </div>

                    <a href="#" class="text-xs text-orange-500 hover:underline">Forget Password?</a>
                    <div class="mt-6">
                        <button
                            class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#C6480C] rounded-md hover:bg-orange-500 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>
                <p class="mt-8 text-s font-light text-center text-gray-700"> Don't have an account? <a href="#"
                        class="font-medium text-orange-500 hover:underline">Sign up</a></p>
                        </div>
                        </div>
      )
      };



const RegistrationContainer = ({ checkIfLoggedIn }) => (
  <div style={{ backgroundImage:`url(${Loginresized})`,backgroundRepeat:"no-repeat",backgroundSize:"95%"}}  name="home" className="w-half h-screen bg-[#DEDFE1] ">
    <div className="max-w-[700px] mx-auto flex-col px-4 justify-center h-full">
  

      <RegistrationForm checkIfLoggedIn={checkIfLoggedIn} />
    </div>
  </div>

);

export default RegistrationContainer;
