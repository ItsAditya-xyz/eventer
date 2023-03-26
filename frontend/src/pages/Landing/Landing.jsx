import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import bigLogo from "../../assets/bigLogo.png";
import Navbar from "../../components/Navbar";
export default function Landing(props) {
  const [isLoggin, setIsLoggin] = useState(false);
  const [hasLoggedIn, setHasloggedIn] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    navigate("start-login");
  };

  useEffect(() => {
    const token = localStorage.getItem("JWT");
    if (token) {
      setHasloggedIn(true);
    }
  }, []);

  return (
    <div className='leading-relaxed tracking-wide flex flex-col'>
      <Toaster />
      <div>
        <Navbar />

        <div className='md:flex md:flex-row mt-20 justify-around'>
          <div className='md:w-2/5 flex flex-col justify-center items-center'>
            <h2 className='font-serif text-5xl text-gray-600 mb-4 text-center md:self-start md:text-left'>
              E-venter
            </h2>
            <p className='uppercase text-gray-600 tracking-wide text-center md:self-start md:text-left font-bold'>
              The one stop for all the Event Organizers!
            </p>
            <p className='uppercase text-gray-600 tracking-wide text-center md:self-start md:text-left'>
              A ONE-STOP for all Event Organizwes, a Websit where Organizers can
              find out the Places to organise there Event (LOCAL AREAS), can
              find local Venders for Printing the stickers, T-Shirts, Caps,
              etc... along with CATREEN SERVICES and all other services that a
              successful event needs!
            </p>
            <a
              href='#localPlaces'
              className='bg-gradient-to-r from-green-700 to-purple-500 rounded-full py-4 px-8 text-gray-50 uppercase text-xl md:self-start my-5 hover:from-green-800 hover:to-purple-600'>
              See Venders
            </a>
          </div>
          <div className=''>
            <img src={bigLogo} className='w-80 h-80' />
          </div>
        </div>

        <div id='localPlaces' className='mt-20'>
          <div className='flex flex-row justify-between my-5'>
            <h2 className='text-3xl'>Local Places</h2>
          </div>
          <div className='mx-auto flex justify-center px-1'>
            <div className='grid grid-flow-row grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3  gap-10  mx-auto'>
              <div className='shadow-lg rounded-lg'>
                <a href='#'>
                  <div className=''>
                    <img
                      src='https://techpoint.africa/wp-content/uploads/2021/03/Techpoint-Tour-2017-Day-04-90-of-895.jpg'
                      className='rounded-tl-lg rounded-tr-lg'
                    />
                  </div>
                </a>
                <div className='p-5'>
                  <h3>Venis Mall</h3>
                  <p>16 x 16</p>
                  <button className='w-full bg-gradient-to-r from-black to-gray-700 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-amber-900 hover:to-amber-200 flex flex-row justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      className='w-5 h-5 mr-1'>
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                      />
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                    View
                  </button>
                </div>
              </div>
              <div className='shadow-lg rounded-lg'>
                <img
                  src='https://image.wedmegood.com/resized/540X/uploads/member/3550092/1665807618_WhatsApp_Image_2022_10_14_at_2.40.43_PM__1_.jpeg?crop=8,79,1265,711'
                  className='rounded-tl-lg rounded-tr-lg'
                />

                <div className='p-5 flex flex-col h- '>
                  <h3>City Marriage Hall</h3>
                  <p>30 x 30</p>
                  <button className='w-full bg-gradient-to-r from-black to-gray-700 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-amber-900 hover:to-amber-200 flex flex-row justify-center '>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      className='w-5 h-5 mr-1'>
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                      />
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                    View
                  </button>
                </div>
              </div>
              <div className='shadow-lg rounded-lg'>
                <img
                  src='https://media.weddingz.in/images/c9a619b086ad66e93bf71e3f79c807ea/birthday-party-venues-in-west-delhi-to-host-your-birthday-starting-from-rs-1000--1.jpg'
                  className='rounded-tl-lg rounded-tr-lg'
                />

                <div className='p-5'>
                  <h3>Mickey Birthday Venue</h3>
                  <p>20 x 20</p>
                  <button className='w-full bg-gradient-to-r from-black to-gray-700 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-amber-900 hover:to-amber-200 flex flex-row justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      className='w-5 h-5 mr-1'>
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                      />
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div id='Swags' className='mt-20'>
            <div className='flex flex-row justify-between my-5'>
              <h2 className='text-3xl'>Swags & Stickers</h2>
            </div>
          </div>

          <div className='grid grid-flow-row grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mx-6'>
            <div className='shadow-lg rounded-lg'>
              <img
                src='https://images.squarespace-cdn.com/content/v1/58a47a81579fb3b0257623f8/1491325034210-XQMALJVCHF0RSIQV8EIW/IMG_3801.JPG'
                className='rounded-tl-lg rounded-tr-lg'
              />

              <div className='p-5'>
                <h3>Zeno Clothing</h3>
                <p>Print T-shirts, Caps, Bands</p>
                <button className='w-full bg-gradient-to-r from-black to-gray-700 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-amber-900 hover:to-amber-200 flex flex-row justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-5 h-5 mr-1'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                    />
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  View
                </button>
              </div>
            </div>
            <div className='shadow-lg rounded-lg'>
              <img
                src='https://www.bestprintingnyc.com/wp-content/uploads/2020/09/sticker-printing-shop-new-york-01.png'
                className='rounded-tl-lg rounded-tr-lg'
              />
              <div className='p-5'>
                <h3>SHags Stickers </h3>
                <p>get your cool Stickers Today!</p>
                <button className='w-full bg-gradient-to-r from-black to-gray-700 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-amber-900 hover:to-amber-200 flex flex-row justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-5 h-5 mr-1'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                    />
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  View
                </button>
              </div>
            </div>
            <div className='shadow-lg rounded-lg'>
              <img
                src='https://i.pinimg.com/736x/ea/4e/4d/ea4e4dea0cace7af3346d82cb66c5ab5--custom-clothing-nyc.jpg'
                className='rounded-tl-lg rounded-tr-lg'
              />

              <div className='p-5'>
                <h3>GIFTeD</h3>
                <p>we diliver gifts and ptinted electronic accessories</p>
                <button className='w-full bg-gradient-to-r from-black to-gray-700 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-amber-900 hover:to-amber-200 flex flex-row justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-5 h-5 mr-1'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                    />
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  View
                </button>
              </div>
            </div>
          </div>

          <div id='Food' className='mt-20'>
            <div className='flex flex-row justify-between my-5'>
              <h2 className='text-3xl'> Fooding</h2>
            </div>
          </div>

          <div className='grid grid-flow-row grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mx-6'>
            <div className='shadow-lg rounded-lg'>
              <img
                src='https://image.wedmegood.com/resized/800X/uploads/member/468694/1672997780_IMG_20211117_WA0066.jpg'
                className='rounded-tl-lg rounded-tr-lg'
              />
              <div className='p-5'>
                <h3>Zaika Catering</h3>
                <p>Best Catering in the City!</p>
                <button className='w-full bg-gradient-to-r from-black to-gray-700 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-amber-900 hover:to-amber-200 flex flex-row justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-5 h-5 mr-1'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                    />
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  View
                </button>
              </div>
            </div>
            <div className='shadow-lg rounded-lg'>
              <img
                src='https://image.wedmegood.com/resized/800X/uploads/member/1367532/1647696054_IMG_20220306_WA0018.jpg'
                className='rounded-tl-lg rounded-tr-lg'
              />
              <div className='p-5'>
                <h3>KKC</h3>
                <p>Expirence True Culinary Finnesse</p>
                <button className='w-full bg-gradient-to-r from-black to-gray-700 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-amber-900 hover:to-amber-200 flex flex-row justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-5 h-5 mr-1'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                    />
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  View
                </button>
              </div>
            </div>
            <div className='shadow-lg rounded-lg'>
              <a href='#'>
                <img
                  src='https://image.wedmegood.com/resized/800X/uploads/member/822111/1646374102_IMG20220205201854.jpg'
                  className='rounded-tl-lg rounded-tr-lg'
                />
              </a>
              <div className='p-5'>
                <h3>Kumar's Cook & Cateren</h3>
                <p>Food that makes your mouth wet!</p>
                <button className='w-full bg-gradient-to-r from-black to-gray-700 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-amber-900 hover:to-amber-200 flex flex-row justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-5 h-5 mr-1'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                    />
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
