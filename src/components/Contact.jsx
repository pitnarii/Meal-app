import React from 'react'

const Contact = () => {
  return (
    <div name='contact' className='w-full h-screen bg-[#22333B] flex justify-center items-center p-4'>
        <form method='POST' action="https://getform.io/f/73d06034-08e1-4d01-a9bb-0ca86cf35b00" className='flex flex-col max-w-[600px] w-full'>
            <div className='pb-8'>
                <p className='text-4xl sm:text-7xl font-bold text-[#84C318]'>Feedback Welcome</p>
                <p className='text-gray-300 py-4'> We are new here, so submit the form and let us know how we are doing </p>
            </div>
            <input className='bg-[#ccd6f6] p-2' type="text" placeholder='Name' name='name' />
            <input className='my-4 p-2 bg-[#ccd6f6]' type="email" placeholder='Email' name='email' />
            <textarea className='bg-[#ccd6f6] p-2' name="message" rows="10" placeholder='Message'></textarea>
            <button className='text-white border-2 hover:bg-green-600 hover:border-green-600 px-4 py-3 my-8 mx-auto flex items-center'>Get in touch</button>
        </form>
    </div>
  )
}

export default Contact