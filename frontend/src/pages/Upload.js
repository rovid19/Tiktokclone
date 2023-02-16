import React from "react";

const Upload = ({ handleOpenClose }) => {
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

          <form className="flex-col mt-10   w-[80%] h-[75%]">
            <div className=" mt-2 bg-gray-400 bg-opacity-30 flex items-center">
              <label className="p-2">
                <input
                  type="file"
                  className="mt-1 w-full bg-transparent bg-gray-300 bg-opacity-30 h-12 pl-4"
                  placeholder="Insert your email"
                />
              </label>
            </div>
            <div className="mt-1">
              <input
                type="type"
                className="w-full bg-transparent bg-gray-400 bg-opacity-30 h-12 pl-4"
                placeholder="Title of your video"
              />
            </div>
            <div className="mt-1 ">
              <input
                type="type"
                className="w-full bg-transparent bg-gray-400 bg-opacity-30 h-24 pl-4"
                placeholder="Description of your video"
              />
            </div>
            <button className=" bg-gray-200 w-full text-gray-400 p-2 mt-10 hover:bg-black hover:text-white">
              Upload
            </button>
          </form>
          <div className="border-t-2 border-opacity-30 text-sm border-gray-300 w-full p-4 text-center">
            {" "}
            Don't have an account yet?{" "}
            <button>
              <span className="text-red-500">Sign up!</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
