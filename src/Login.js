import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function Login() {
    // const Swal = require('sweetalert2')
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "username": inputs.username,
        "password": inputs.password,
        "expiresIn": 60000
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://www.melivecode.com/api/login", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if (result.status === 'ok') {
            Swal.fire({
              title: 'Logged-in Success!',
              // html:<i>{result.message}</i>,
              icon: 'success'
            }).then((value) =>{
              localStorage.setItem('token', result.accessToken)
              navigate('/profile')
            })
          } else {
            Swal.fire({
              title: 'Error!',
              // html:<i>{result.message}</i>,
              icon: 'error'
            })
          }
        })
        .catch(error => console.log('error', error));

        console.log(inputs);
      }
  return (
    <div class="relative flex flex-col justify-center p-4 items-center min-h-screen overflow-hidden">
        <div class="w-full p-6  bg-white rounded-md shadow-md border-top lg:max-w-md">
            <form class ="mt-6"onSubmit={handleSubmit}>
            <div class="relative mb-8">
                <label class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">&nbsp;&nbsp;Username:</label>
                <input 
                type="text" 
                name="username" 
                value={inputs.username || ""} 
                onChange={handleChange}
                class="w-full h-10 text-gray-900 rounded placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-orange-500"
                placeholder="john@doe.com" 
                />
          
            </div>
            <div class="relative mb-4">
                <label class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                &nbsp;&nbsp;Password</label>
                <input 
                type="password" 
                name="password" 
                value={inputs.password || ""} 
                onChange={handleChange}
                class="w-full h-10 text-gray-900 rounded placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-orange-500"
                placeholder="john@doe.com"
                />
            
            </div>
            
            <a href="#" class="text-xs text-orange-500 hover:underline">Forget Password?</a>
            <div class="mt-6">
            <input class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#C6480C] 
            rounded-md hover:bg-orange-500 focus:outline-none focus:bg-purple-600" type= "submit"/>
            </div>
            </form>
        </div>

       

    </div>
  )
}

export default Login