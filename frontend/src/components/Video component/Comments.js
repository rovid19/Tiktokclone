import axios from "axios";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { userContext } from "../../Usercontext";

const Comments = ({ handleOpenCloseComments, name, visible }) => {
  const [profilePhotoSet, setProfilePhotoSet] = useState([]);
  const [comment, setComment] = useState([""]);
  const [error, setError] = useState(false);
  const { user, addRemoveLike, setAddRemoveLike } = useContext(userContext);
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(false);

  function postComment(e) {
    e.preventDefault();
    if (comment) {
      axios
        .post("/comment", {
          profilePhotoSet,
          comment,
          name,
        })
        .then(() => {
          setAddRemoveLike(!addRemoveLike);
          setPost(!post);
        });
    } else {
      setError(!error);
    }
  }
  useEffect(() => {
    if (user) {
      setProfilePhotoSet(user.profilePhoto);
    }
  });

  useEffect(() => {
    axios
      .post("/get-comments", {
        name,
      })
      .then(({ data }) => setComments(data));
  }, [post]);
  console.log(name);
  return (
    <div className="w-full h-full z-30 absolute ">
      <div className="bg-white h-[60%] rounded-t-xl shadow-2xl w-[70%] lg:h-[50%] lg:w-[40%] absolute bottom-0 right-0 overflow-hidden">
        <div
          onClick={() => {
            setError(!error);
            handleOpenCloseComments();
          }}
          className="ml-2 mt-2 flex  items-center "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-8 h-8 hover:text-red-500 hover:scale-125 cursor-pointer"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clip-rule="evenodd"
            />
          </svg>
          {comments && (
            <h1 className="font-bold ml-3">{comments.length} comments</h1>
          )}
        </div>
        {error && (
          <h1 className="text-red-500 font-bold ml-10 md:ml-20 text-sm lg:text-base lg:ml-14 ">
            You can't post without writing something
          </h1>
        )}
        <div
          className="flex-col ml-2 mt-2 mr-2 overflow-y-scroll h-[80%]
        "
        >
          {comments &&
            comments.map((item) => {
              return (
                <>
                  <div className="flex mt-2 border-t-2 border-gray-200 p-2 ">
                    <div className="w-[10%]  ">
                      <img
                        className="h-[60px] rounded-full "
                        src={"http://localhost:4000/uploads/" + item.profile}
                      ></img>
                    </div>
                    <div className="w-[90%] ml-2">
                      <p>{item.comment}</p>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        <form
          className="flex justify-between absolute bottom-0 w-full "
          onSubmit={postComment}
        >
          <input
            className="bg-gray-300 bg-opacity-30 w-[85%] lg:w-[90%] h-[50px] "
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="w-[15%] lg:w-[10%] bg-red-500 text-white hover:bg-black      ">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
