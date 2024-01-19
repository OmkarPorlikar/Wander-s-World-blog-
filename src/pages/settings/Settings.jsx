

import "./settings.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../../ReduxToolkit/action";
import { deleteUser, uploadImage } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "../../ReduxToolkit/userSlice";
import UserPost from '../../components/userPost/UserPost'
import { AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";
import { useRef } from "react";

export default function Settings() {
  const { user, isFetching, Error } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState({
    username: user?.tokenObject?.username,
    email: user?.tokenObject?.email,
    password: "",
    image: "",
  });

  const [open, setOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const userId = user?.tokenObject?.id;
  const Navigate = useNavigate();

  const dispatch = useDispatch();

  const PF = "http://localhost:9080/images/";

  const error = useSelector((state) => state.user.error);

  console.log(error, "error");

  const cancelOperation = () => {
    setShowConfirmation(false);
  };

  const conformDeleteAccount = async () => {
    try {
      setShowConfirmation(false);

      const res = await deleteUser(
        userId,
        user?.tokenObject?.username,
        user?.token
      );
      localStorage.clear();

      if (res.id === userId) {
        dispatch(logout());
        Navigate("/");
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  console.log(
    user?.tokenObject?.auth === "google Auth",
    "Auth"
  );

  console.log(user?.tokenObject?.profilePic, "link form settings");

  function handleClicks() {
    setShowConfirmation(true);
    setOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, image } = userDetails;

    const updatedUser = {
      userId: user.tokenObject?.id,
      username,
      email,
      password,
      photo:image
    };

  
    try {
      console.log(user.tokenObject?.id, "user id ");
      dispatch(userUpdate(updatedUser, user.tokenObject?.id, user?.token));
    } catch (error) {
      console.log("user cannot be updated", error);
    }
  
  
     setUserDetails({
      username: user?.tokenObject?.username,
      email: user?.tokenObject?.email,
      password: "",
      image: "",
    });
  
  };


  // profile pic upload image login 

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const handleUpload = () => {
    widgetRef.current?.open();
  };

 console.log("upload profile pic " , userDetails)
 
  // const handleNext = () => {
  //   setPostDetails((prev) => ({ ...prev, image: imageURL }));
  // };
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dcdhklrjc",
        uploadPreset: "vx0dyjgc",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
      setUserDetails((prev)=>( {...prev , image:result.info.secure_url}));
        }
      }
    );
  }, []);

  console.log(user?.tokenObject?.profilePic , "profile pic")
  console.log((userDetails?.image === "") , "is image")
  return (
    <div>
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle" onClick={handleSubmit}>
            Update Your Account
          </span>
          <span
            className="settingsDeleteTitle"
            onClick={(e) => handleClicks()}
          >
            Delete Account
          </span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <div>
              { (userDetails?.image === "") ?
                <img
                  className="user"
                  src={
                       user?.tokenObject?.profilePic === ""
                        ? `/images/user.png`
                        : user?.tokenObject?.profilePic
                  }
                  alt=""
                />: (
                  <img
                  className="user"
                  src={
                    userDetails?.image
                  }
                  alt=""
                />
                ) }

            </div>
            <span >
              <i
                className="settingsPPIcon far fa-user-circle"
                onClick={handleUpload}
              ></i>
            </span>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) =>
                setUserDetails({ ...userDetails, file: e.target.files[0] })
              }
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user?.username}
            value={userDetails.username}
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user?.email}
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {showConfirmation && (
            <div className="conformContainer">
              <div className="subContainer">
                <span className="rightCross" onClick={cancelOperation}>
                  ❌
                </span>
                <p className="popUp">
                  Are you sure you want to Delete Your Account
                </p>
                <button onClick={conformDeleteAccount}>Yes</button>
                <button
                  onClick={cancelOperation}
                  style={{ marginLeft: "15px" }}
                >
                  No
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
<div className="user-post">
  <UserPost  />
</div>
 </div>
  );
}
