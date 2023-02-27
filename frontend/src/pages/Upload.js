import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { userContext } from "../Usercontext";
import { useContext } from "react";

const Upload = ({ handleOpenClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [videoFormData, setVideoFormData] = useState([]);
  const [natpis, setNatpis] = useState(false);
  const { setVideoTrigger, user, userReady } = useContext(userContext);
  const [username, setUsername] = useState(null);
  const [className, setClassName] = useState(
    " bg-gray-200 w-full text-gray-400 p-2 mt-10 hover:bg-black hover:text-white"
  );
  const [like, setLike] = useState(1);

  function handleFile(e) {
    const file = e.target.files;
    const formData = new FormData();
    formData.append("video", file[0]);
    setVideoFormData(formData);
  }
  function handleUploadVideo(e) {
    axios
      .post("/api/upload/upload-video", videoFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        setVideo(data);
        setVideoTrigger("mirko");
      });
  }
  async function handleVideo(e) {
    e.preventDefault();

    if (video && title && description) {
      await axios.post("/video", {
        video,
        title,
        description,
        username,
      });
      setVideoTrigger("uploadTriggered");
      handleOpenClose();
    } else {
      setNatpis(true);
    }
  }
  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [userReady]);

  return (
    <>
      <div className="flex items-center bg-black bg-opacity-50 justify-center absolute top-0 left-0 w-screen h-screen z-20">
        <div className="w-[350px] fl md:w-[450px] h-[600px] bg-white">
          <div className="h-16 flex justify-end  w-full p-4">
            <button onClick={handleOpenClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="text-center font-bold "> Upload your video </div>
          {natpis && (
            <div className="text-center text-red-500 mt-2 mb-[-30px]">
              All fields must be filled in
            </div>
          )}
          <form
            className="flex-col mt-10   w-[80%] h-[75%]"
            onSubmit={handleVideo}
          >
            <div className=" mt-2 bg-gray-400 bg-opacity-30 flex items-center">
              <label className="p-2">
                <input
                  type="file"
                  className="mt-5 w-full bg-transparent bg-gray-300 bg-opacity-30 h-12 pl-4"
                  placeholder="Insert your email"
                  onChange={handleFile}
                />
              </label>
              <div onClick={handleUploadVideo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-8 h-8 mr-4 hover:scale-125 hover:text-red-500 cursor-pointer"
                >
                  <path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
                </svg>
              </div>
            </div>
            <div className="mt-1">
              <input
                type="type"
                className="w-full bg-transparent bg-gray-400 bg-opacity-30 h-12 pl-4"
                placeholder="Title of your video"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mt-1 ">
              <input
                type="type"
                className="w-full bg-transparent bg-gray-400 bg-opacity-30 h-24 pl-4"
                placeholder="Description of your video"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button className={className}>Upload</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Upload;
