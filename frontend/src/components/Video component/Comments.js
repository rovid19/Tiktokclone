import axios from "axios";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { userContext } from "../../Usercontext";

const Comments = ({ handleOpenCloseComments, name, visible }) => {
  const [profilePhotoSet, setProfilePhotoSet] = useState([]);
  const [comment, setComment] = useState([""]);
  const [error, setError] = useState(false);
  const { user, addRemoveLike, setAddRemoveLike } = useContext(userContext);
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(false);
  const [id, setId] = useState(null);
  const [commentDelete, setCommentDelete] = useState(null);
  const [username, setUsername] = useState(null);
  const [profileId, setProfileId] = useState(null);
  function postComment(e) {
    e.preventDefault();
    if (comment) {
      if (!user) {
        alert("You must be logged in in order to post a comment");
      } else {
        axios
          .post("/comment", {
            profilePhotoSet,
            comment,
            name,
            id,
            username,
          })
          .then(() => {
            setAddRemoveLike(!addRemoveLike);
            setPost(!post);
            setComment([]);
          });
      }
    } else {
      setError(!error);
    }
  }
  useEffect(() => {
    if (user) {
      setProfilePhotoSet(user.profilePhoto);
      setId(user._id);
      setUsername(user.username);
    }
  });

  useEffect(() => {
    axios
      .post("/get-comments", {
        name,
      })
      .then(({ data }) => setComments(data));
  }, [post]);
  console.log(comments);

  useEffect(() => {
    if (commentDelete) {
      axios
        .post("/delete-comment", {
          commentDelete,
        })
        .then(() => {
          setPost(!post);
        });
    }
  }, [commentDelete]);
  useEffect(() => {
    if (profileId) {
      handleNavigate();
    }
  }, [profileId]);

  const navigate = useNavigate();
  function handleNavigate() {
    if (profileId) {
      console.log(profileId);
      navigate(`/profile/${profileId}`);
    }
  }
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
                    <div
                      className="w-[10%] cursor-pointer  "
                      onClick={() => {
                        setProfileId(item.owner);
                        handleNavigate();
                      }}
                    >
                      <img
                        className="h-[60px] rounded-full "
                        src={"http://localhost:4000/uploads/" + item.profile}
                      ></img>
                    </div>
                    <div className="w-[90%] relative ml-2">
                      <h1 className="text-sm">{item.username}</h1>
                      <p>{item.comment}</p>
                      {user && user._id === item.owner && (
                        <div
                          className="absolute right-0 top-0"
                          onClick={() => {
                            setCommentDelete(item._id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-4 h-4 text-black cursor-pointer hover:scale-125 hover:text-red-500 "
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
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
            value={comment}
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
