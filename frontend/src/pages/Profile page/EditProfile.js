import React from "react";
import { useContext } from "react";
import { userContext } from "../../Usercontext";
import { useState } from "react";
import axios from "axios";

const EditProfile = ({ handleVisible }) => {
  const { user, setEdit, edit } = useContext(userContext);
  const [username, setUsername] = useState(user && user.username);
  const [email, setEmail] = useState(user && user.email);
  const [bio, setBio] = useState(user && user.description);
  const [photo, setPhoto] = useState([]);
  const [redirect, setRedirect] = useState(false);

  async function handleEdit(e) {
    e.preventDefault();
    await axios.put("/api/user/editprofile", {
      username,
      email,
      bio,
      photo: photo.length > 0 ? photo : user.profilePhoto,
    });
    setEdit(!edit);
    setRedirect(true);
  }

  if (redirect) {
    handleVisible();
    setRedirect(false);
  }

  function uploadImage(e) {
    const file = e.target.files;
    const formData = new FormData();
    formData.append("photo", file[0]);

    axios
      .post("api/upload/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data } = response;
        setPhoto([data]);
      });
  }

  return (
    <div className="h-full w-full   flex justify-center items-center">
      <form
        className="w-[320px] lg:w-[450px]  h-[680px] lg:h-[800px] bg-white border-4 border-gray-200 mt-6"
        onSubmit={handleEdit}
      >
        <div className="h-[10%] mt-4 p-4 border-b-2 border-gray-500 border-opacity-20">
          <h1 className="font-bold">Edit Profile</h1>
        </div>
        <div className="fl h-[470px] ">
          <div className="h-[90%] p-2 w-full ">
            <div className="gap-2 flex border-b-2 border-opacity-30 p-6 border-gray-500">
              <div className="w-[70px] lg:w-[120px]">
                <span>Profile photo</span>
              </div>
              <div className="w-[130px]  lg:w-[300px] ml-4 flex items-center">
                <div className="fl">
                  <h1>Old</h1>
                  <img
                    value={user.profilePhoto}
                    src={"http://localhost:4000/uploads/" + user.profilePhoto}
                    className="h-20 lg:h-[200px] w-auto rounded-full border-2 border-gray-200 mt-3"
                  ></img>
                </div>

                <div className="fl">
                  <h1>New</h1>
                  <img
                    src={"http://localhost:4000/uploads/" + photo}
                    className="h-20 lg:h-[200px] w-auto rounded-full border-2 border-gray-200 mt-3"
                  ></img>
                </div>
                <label className="mt-6 ml-2">
                  <input
                    type="file"
                    className="hidden"
                    onChange={uploadImage}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6 cursor-pointer"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </label>
              </div>
            </div>
            <div className="gap-2 flex border-b-2 border-opacity-30 p-6 border-gray-500">
              <div className="w-[70px] lg:w-[120px]">
                <span>Username</span>
              </div>
              <div className="w-[130px] lg:w-[300px]">
                <input
                  value={username}
                  type="text"
                  className="bg-gray-500 bg-opacity-50 p-2 rounded-xl"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="gap-2 flex border-b-2 border-opacity-30 p-6 border-gray-500">
              <div className="w-[70px] lg:w-[120px]">Email</div>
              <div className="w-[130px] lg:w-[300px]">
                <input
                  value={email}
                  type="text"
                  className="bg-gray-500 bg-opacity-50 p-2 rounded-xl"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="gap-2 flex  p-6 ">
              <div className="w-[70px] lg:w-[120px]">Bio</div>
              <div className="w-[130px] lg:w-[300px]">
                <input
                  value={bio}
                  type="text"
                  className="bg-gray-500 bg-opacity-50 p-2 h-24 rounded-xl"
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[10%] p-4 lg:mt-[150px] mt-6 border-t-2 border-gray-500 border-opacity-20">
          <button
            onClick={handleVisible}
            className="bg-gray-500 rounded-xl mt-1 text-white p-2 w-24 hover:bg-black "
          >
            Cancel
          </button>
          <button className="bg-gray-500 ml-2 rounded-xl mt-1 text-white p-2 w-24 hover:bg-black ">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
