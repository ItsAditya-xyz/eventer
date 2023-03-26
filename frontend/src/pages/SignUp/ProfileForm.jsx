import React, { useState, useContext, useEffect } from "react";
import { Loader } from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BiUpload, BiX } from "react-icons/bi";
import banner from "../../assets/banner.jpg";
import default_profile_pic from "../../assets/default_profile_pic.png";
import { BACKEND_URL } from "../../constants/constant";
function ProfileForm({ tags }) {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(default_profile_pic);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [isUploadingProfilePic, setIsUploadingProfilePic] = useState(false);

  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const fileInput = React.useRef(null);
  const DEFAULT_PROFILE_PIC =
    "https://images.deso.org/7f3907cf1947c6171ab038da5eabc728deabc092ebd538d33a7d0db3895da596.webp";

  const updateProfile = async () => {
    if (!username) return toast.error("Please enter a username");
    if (!profileDescription)
      return toast.error("Please enter a profile description");

    const loadingToast = toast.loading("Creating profile...");

    setIsCreatingProfile(true);
    const res = await fetch(`${BACKEND_URL}create-user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        profileDescription,
        profilePhoto: profileImageFile ? profileImageFile : DEFAULT_PROFILE_PIC,
        tags: tags,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.exception) {
      toast.dismiss(loadingToast);
      toast.error(data.exception[0]);
      // navigate("/");
      setIsCreatingProfile(false);
    }
    if (data.message == "User created") {
      toast.dismiss(loadingToast);
      toast.success("Profile created");
      const tempJson = {
        username: username,
        profileDescription: profileDescription,
        profilePhoto: profileImageFile ? profileImageFile : DEFAULT_PROFILE_PIC,
      };
      localStorage.setItem("loggedInUser", JSON.stringify(tempJson));
      navigate("/app");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleProfilePicUpload = async () => {
    //store the file in the state
    const file = fileInput.current.files[0];
    if (!file) return toast.error("Please select a file");
    if (file.size > 1000000) return toast.error("File size too large");
    if (!file.type.includes("image"))
      return toast.error("Please upload an image file");

    console.log(file);
    //mkae post request to BACKEND_URL
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${"https://tipdeso.com/"}upload-image-to-deso`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    if (data.ImageURL) {
      setProfileImageFile(data.ImageURL);
      setProfileImage(data.ImageURL);
    } else {
      toast.error("Error uploading image");
    }
  };

  return (
    <div className='flex   mx-auto  justify-center items-start w-full md:w-2/3 mb-24'>
      <Toaster />
      <div className='flex mx-auto  w-full space-y-6 md:flex-row md:space-x-10 md:space-y-0'>
        <div className='flex mx-auto flex-col w-full md:w-3/4 secondaryBg border secondaryBorder rounded-xl p-4'>
          <div className='rounded-lg w-full   relative flex justify-center items-center   z-20 '>
            <div className='flex  -bottom-24 left-auto absolute items-center'>
              <div
                className='w-24 h-24 my-2 group rounded-full relative z-20 flex items-center justify-center dark:border-[#2D2D33] border-white border-2'
                id='profilePicOnSignUp'
                style={{
                  backgroundImage: `url(${profileImage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}>
                {!isUploadingProfilePic ? (
                  <button
                    className='bg-white/[.7]  group-hover:flex rounded-full px-2 py-2 hover:bg-white/[.9]'
                    onClick={() => {
                      fileInput.current.click();
                    }}>
                    <input
                      ref={fileInput}
                      type='file'
                      accept='image/*'
                      onChange={handleProfilePicUpload}
                      style={{ display: "none" }}
                    />
                    <BiUpload size={24} />
                  </button>
                ) : (
                  <Loader />
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col mt-16 pt-5 w-full space-y-4 items-center'>
            <div className='w-full md:w-3/5'>
              <p className='font-semibold mb-2 primaryTextColor'>Username</p>
              <input
                type='text'
                value={username}
                onChange={handleUsernameChange}
                placeholder='Your Name'
                className='search rounded-full darkenBg darkenBorder border darkenHoverBg px-3 py-2 w-full outline-none focus:shadow transition delay-50 placeholder:text-gray-400 dark:placeholder:text-gray-500'
              />
            </div>
            <div className='w-full md:w-3/5'>
              <p className='font-semibold mb-2 primaryTextColor'>Description</p>
              <textarea
                placeholder='Tell us about yourself'
                className='search rounded-xl darkenBg darkenBorder border darkenHoverBg h-32 px-3 py-2 w-full outline-none focus:shadow transition delay-50 placeholder:text-gray-400 dark:placeholder:text-gray-500'
                value={profileDescription}
                onChange={(e) =>
                  setProfileDescription(e.target.value)
                }></textarea>
            </div>

            <div className='mx-auto'>
              <button
                onClick={() => updateProfile()}
                className={` flex items-center justify-center space-x-2 font-medium text-white px-6 py-3 leading-none rounded-full buttonBG my-2 bg-gradient-to-r from-green-700 to-purple-500 ${
                  loading ? "cursor-not-allowed bg-opacity-50" : ""
                }`}>
                {loading && <Loader className='w-3.5 h-3.5' />}
                <span>Create Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
