import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../Usercontext";
import Img from "../../images/defaultphoto.jpg";

const SearchAccounts = () => {
  // CONTEXT & EXTRA
  const { searched, setVideos, setAccount, darkMode } = useContext(userContext);
  const navigate = useNavigate();

  // HANDLE BUGFIX
  if (window.location.href === "http://localhost:3000/search/accounts") {
    setVideos(false);
    setAccount(true);
  }

  return (
    <div
      className={
        darkMode
          ? "w-full h-full overflow-scroll bg-black bg-opacity-80 text-white scrollbar-hide "
          : "w-full h-full overflow-scroll scrollbar-hide "
      }
    >
      {searched && searched.length > 0 ? (
        searched.map((item) => {
          return (
            <div className="h-[30%] lg:h-[20%]  w-full border-b-2 border-gray-200 border-opacity-50 flex pl-2 pr-2 pt-4 pb-4 ">
              <div
                className="w-[20%] md:w-[8%] lg:w-[10%] flex justify-end"
                onClick={() => {
                  navigate(`/profile/${item._id}`);
                }}
              >
                <img
                  className="h-[70%] rounded-full cursor-pointer object-cover"
                  src={
                    item.profilePhoto[0]
                      ? "https://gymtok-api-app.onrender.com/uploads/" +
                        item.profilePhoto[0].replace(
                          "/opt/render/project/src/backend/uploads/",
                          ""
                        )
                      : Img
                  }
                ></img>{" "}
              </div>
              <div className="w-[80%] ml-4">
                <h1 className="font-bold text-xl">{item.username}</h1>
                <div>
                  <h3 className="">{item.email}</h3>
                  <h3>
                    Followers{" "}
                    <span className="font-bold">{item.followers.length}</span>
                  </h3>
                </div>
                <p className="text-sm">{item.description}</p>{" "}
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="p-8 font-bold text-xl">No accounts found</h1>
      )}
    </div>
  );
};

export default SearchAccounts;
