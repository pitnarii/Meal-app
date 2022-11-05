import Loginresized from "../assets/Loginresized.jpg";
import React from 'react'

const Contact = () => {
  return (

    <div style={{ backgroundImage:`url(${Loginresized})`,backgroundRepeat:"no-repeat",backgroundSize:"100%"}}  name="contact" className="w-half h-screen bg-[#F1F1EF] 
       flex justify-center items-center p-4">
        <div
class="w-full p-6 m-auto bg-white rounded-md shadow-md border-top lg:max-w-md">
                <h4 class="text-2xl text-center underline text-amber-900">Contact Us</h4>
                <form class="mt-6" method='POST' action="https://getform.io/f/73d06034-08e1-4d01-a9bb-0ca86cf35b00" className='flex flex-col max-w-[600px] w-full'>
                    <div class="relative">
                        <input d="name" name="name" type="text" 
                         class="w-full h-10 text-gray-900 placeholder-transparent rounded border-b-2 border-gray-300 peer focus:outline-none focus:border-orange-500"
                         placeholder="Username" />
                         <label for="name"
                           class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">&nbsp;&nbsp;Username
                          </label>
                    </div>
                    <br/>
                    <div class="relative mb-8">
                        <input id="email" name="email" type="text"
                            class="w-full h-10 text-gray-900 placeholder-transparent rounded border-b-2 border-gray-300 peer focus:outline-none focus:border-orange-500"
                            placeholder="john@doe.com" />
                        <label for="email"
                            class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">&nbsp;&nbsp;Email
                            address</label>
                    </div>

                    <label for="message" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Your message</label>
                    <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500" placeholder="Your message..."></textarea>
                    
                    
                    <div class="mt-6">
                        <button
                            class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#C6480C] rounded-md hover:bg-orange-500 focus:outline-none focus:bg-purple-600">
                            Send
                        </button>
                    </div>
                </form>
                        </div>
      </div>
      
  )
}

export default Contact