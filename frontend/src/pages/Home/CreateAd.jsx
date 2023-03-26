import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { Loader } from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { BACKEND_URL } from "../../constants/constant";
import { useNavigate } from "react-router-dom";
export default function CreateAd() {
  const navigate = useNavigate();
  const [postDescription, setPostDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [imageList, setImageList] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInput = React.useRef(null);
  const [creatingAdd, setCreatingAdd] = useState(false);
  const createAdd = async () => {
    if (creatingAdd) return;
    if (!postDescription) return toast.error("Please enter a description");
    if (!shortDescription)
      return toast.error("Please enter a short description");
    if (imageList.length === 0)
      return toast.error("Please upload atleast one image");
    try {
      setCreatingAdd(true);
      const loadingToast = toast.loading("Creating advertisement...");
      const res = await fetch(`${BACKEND_URL}create-ad`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          longDescription: postDescription,
          shortDescription: shortDescription,
          imageList: imageList,
          isWork: 0,
        }),
      });
      const data = await res.json();
      if (data.message === "Decoding JWT Failed") {
        navigate("/start-login");
      }
      console.log(data);
      if (data.exception) {
        toast.dismiss(loadingToast);
        toast.error(data.exception[0]);
        setCreatingAdd(false);
      }
      if (data.message == "success") {
        toast.dismiss(loadingToast);
        toast.success("Advertisement created");
        setCreatingAdd(false);
        // await for 2 seconds and then reload
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }

      setCreatingAdd(false);
    } catch (err) {
      setCreatingAdd(false);
      toast.error(`Error creating add ${err.message}`);
    }
  };

  const handleImage = async () => {
    if (uploadingImage) return;

    try {
      const file = fileInput.current.files[0];
      if (!file) return toast.error("Please select a file");
      if (file.size > 4000000) return toast.error("File size too large");
      if (!file.type.includes("image"))
        return toast.error("Please upload an image file");

      console.log(file);
      //mkae post request to BACKEND_URL
      const formData = new FormData();
      formData.append("file", file);
      setUploadingImage(true);
      const res = await fetch(`${BACKEND_URL}upload-image-to-deso`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      if (data.ImageURL) {
        setImageList([...imageList, data.ImageURL]);
      } else {
        toast.error("Error uploading image");
      }
      setUploadingImage(false);
    } catch (err) {
      setUploadingImage(false);
      toast.error(`Error uploading image ${err.message}`);
    }
  };
  return (
    <div>
      <Toaster />
      <div className='relative text-2xl md:py-10 text-gray-800 text-center font-extrabold  sm:text-3xl  rounded-full sm:w-[70%] flex justify-center mx-auto px-2  mt-8'>
        <span className=' blur-2xl filter opacity-10 w-full h-full absolute inset-0 rounded-full leading-snug'></span>
        <span className='md:px-5 leading-snug'>
          Create an Advertisement for the services you provide
        </span>
      </div>
      <div className='mt-4 w-full px-2 sm:w-3/5 md:w-3/4 lg:w-1/2 flex flex-col space-y-1 mx-auto'>
        <input
          className='focus:ring-0 focus:outline-none outline-none darkenBg darkenHoverBg border  border-gray-200 hover:border-gray-200 resize-none w-full rounded-lg heading px-4 py-2'
          placeholder={"Short Tagline of your Ad"}
          value={shortDescription}
          type='text'
          onChange={(e) => setShortDescription(e.target.value)}
        />
        <textarea
          className='focus:ring-0 focus:outline-none outline-none darkenBg darkenHoverBg border  border-gray-200 hover:border-gray-200 resize-none w-full rounded-lg heading px-4 py-2
          h-44
          '
          placeholder={
            "Details of your Advertisement. Explain what you serve! Add Images for better reach."
          }
          value={postDescription}
          onChange={(e) => setPostDescription(e.target.value)}
        />
        <div className='flex justify-end px-2 mt-2 items-center space-x-2'>
          <div>
            <button
              onClick={() => {
                fileInput.current.click();
              }}>
              {uploadingImage ? (
                <Loader />
              ) : (
                <BiImageAdd size={24} className='text-gray-500' />
              )}
            </button>
            <input
              ref={fileInput}
              type='file'
              accept='image/*'
              onChange={handleImage}
              style={{ display: "none" }}
            />
          </div>
          <button
            onClick={() => {
              createAdd();
            }}
            className='bg-gradient-to-r from-green-700 to-purple-500  px-8 py-3 text-white rounded-md shadow-sm hover:bg-[#ec866d] hover:from-green-800 hover:to-purple-600'>
            Create Ad
          </button>
        </div>
      </div>

      <div className='container mx-auto flex flex-wrap justify-center'>
        {imageList.map((image, index) => (
          <div key={index} className={`relative w-full md:w-1/2 lg:w-1/3 p-4`}>
            <div className='container'>
              <img
                src={image}
                alt=''
                className='w-full darkenBorder border rounded-lg'
              />
              <div className='absolute top-2 right-2 '>
                <button
                  onClick={() => {
                    let temp = [...imageList];
                    temp.splice(index, 1);
                    setImageList(temp);
                  }}
                  className='bg-red-500 group hover:bg-red-700  rounded-full w-10  h-10 drop-shadow-lg flex items-center justify-center'>
                  <BsTrash size={16} className='text-white' />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
