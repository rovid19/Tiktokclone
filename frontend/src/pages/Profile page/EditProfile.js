import React from "react";

const EditProfile = ({ handleVisible }) => {
  return (
    <div className="h-full w-full  bg-black bg-opacity-50 flex justify-center items-center">
      <form className="w-[450px] h-[600px] bg-white">
        <div className="h-[10%]">
          <h1>Edit Profile</h1>
        </div>
        <div className="h-[80%] w-[400px]">
          <div>
            <div className="w-[100px]">Profile photo</div>
            <div className="w-[300px]">
              <input type="text" />
            </div>
          </div>
          <div>
            <div className="w-[100px]">Username</div>
            <div className="w-[300px]">
              <input type="text" />
            </div>
          </div>
          <div>
            <div className="w-[100px]">Email</div>
            <div className="w-[300px]">
              <input type="text" />
            </div>
          </div>
          <div>
            <div className="w-[100px]">Bio</div>
            <div className="w-[300px]">
              <input type="text" />
            </div>
          </div>
        </div>
        <div className="h-[10%]">
          <button onClick={handleVisible}>Cancel</button>
          <button onClick={handleVisible}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
