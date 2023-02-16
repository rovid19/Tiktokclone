import React from "react";
import { userContext } from "../../Usercontext";
import { useContext } from "react";

const Video = () => {
  const { video } = useContext(userContext);
  console.log(video);
  return (
    <div className="relative h-full w-full">
      <div className="h-full w-full">
        {video.map((item) => {
          return (
            <div>
              <video
                className="w-full h-full"
                src={"http://localhost:4000/uploads/videos" + item.video}
              ></video>
              <h1>{item.video}</h1>
            </div>
          );
        })}
      </div>
      <div className="bg-transparent border-t-2 border-gray-300 border-opacity-25 absolute bottom-0 h-12 lg:h-14 w-full flex lg:gap-2 justify-between lg:justify-center items-center p-2 lg:border-none">
        <div className="flex items-center gap-2">
          <h1 className="hidden lg:block font-bold">0</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-8 h-8 lg:h-10 lg:w-10 hover:text-red-500 hover:scale-125 cursor-pointer"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <h1 className="lg:hidden font-bold">0</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="lg:hidden font-bold">0</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-8 h-8 lg:h-10 lg:w-10 hover:text-red-500 hover:scale-125 cursor-pointer"
          >
            <path
              fill-rule="evenodd"
              d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
              clip-rule="evenodd"
            />
          </svg>
          <h1 className="hidden lg:block font-bold">0</h1>
        </div>
      </div>
    </div>
  );
};

export default Video;
