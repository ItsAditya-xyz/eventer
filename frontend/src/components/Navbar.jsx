import React, { useState, Fragment, useEffect } from "react";
import logo from "../assets/logo.png";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown, BiHomeAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const logout = async () => {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUsername(loggedInUser.username);
      setProfilePic(loggedInUser.profilePhoto);
    }
  }, []);
  return (
    <div className='container h-8 p-5 mx-0'>
      <nav className='flex justify-between'>
        <Link to='/'>
          <img src={logo} alt='' className='h-14 px-6 py-2' />
        </Link>
        <div className='mt-2'>
          {username !== "" && (
            <div className='flex flex-row items-center justify-end'>
              <Menu as='div' className='relative w-full flex text-left'>
                <Menu.Button className='flex w-full menu space-x-1 items-center justify-center focus:outline-none'>
                  <div className='flex space-x-3 items-center justify-center'>
                    <div
                      alt=''
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundImage: `url(${profilePic})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "50%",
                      }}
                      className=''></div>
                    <span className='hidden md:flex'>Hey, {username}</span>
                  </div>
                  <BiChevronDown size={20} />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'>
                  <Menu.Items className='absolute right-0 z-10 mt-10 w-56 origin-top-right divide-y divide-gray-100 bg-white rounded-md primaryBg shadow-lg ring-1 ring-black ring-opacity-5 py-1 focus:outline-none'>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => logout()}
                          className={`cursor-pointer flex menu justify-between w-full px-4 py-2`}>
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}

          {username === "" && (
            <Link to='/start-login'>
              <div className=' bg-gradient-to-r text-white flex menu space-x-1 items-center justify-center focus:outline-none from-green-700 to-purple-500 rounded-full py-3 px-6 uppercase text-lg md:self-start my-2 hover:from-green-800 hover:to-purple-600'>
                <span className='hidden md:flex'>Login</span>
              </div>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
