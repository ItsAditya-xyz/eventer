import React from "react";
import ProfileForm from "./ProfileForm";
function SignUp() {
  return (
    <div>
      <div className='flex justify-center mx-auto'>
        <div>
          <div className='relative text-3xl md:py-10 text-gray-800 text-center font-extrabold  sm:text-5xl lg:text-4xl  rounded-full sm:w-[70%] flex justify-center mx-auto px-2 '>
            <span className=' blur-2xl filter opacity-10 w-full h-full absolute inset-0 rounded-full leading-snug'></span>
            <span className='md:px-5 leading-snug'>
              Welcome to
              <span className='bg-gradient-to-r from-green-700 to-purple-500 rounded-md text-white'> Eventer.</span> Create your
              profile to get started.
            </span>
          </div>
        </div>
      </div>
      <div className='mb-10'>
        <ProfileForm />
      </div>
    </div>
  );
}

export default SignUp;
