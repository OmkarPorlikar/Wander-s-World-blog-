
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";
import './uploadImage.css';
// propertyDetails
const UploadImage = ({
  postDetails,
  setPostDetails
}) => {
  const [imageURL, setImageURL] = useState(postDetails?.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  console.log(imageURL , "Image url is ")
  console.log(postDetails , "post details")
  const handleUpload = () => {
    widgetRef.current?.open();
  };

 
 
  const handleNext = () => {
    setPostDetails((prev) => ({ ...prev, image: imageURL }));
  };
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
          setImageURL(result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <div className="uploadWrapper">
      {!imageURL ? (
        <div className="uploadZone" onClick={handleUpload}>
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div className="uploadedImage ">
          <img src={imageURL} alt="" />
          <div className="imageActions " >
            <button   onClick={handleUpload}>
            <span > Re-upload </span>
            </button>
            <button  onClick={handleNext}>
              <AiOutlineDelete /> <span > Conform </span>
            </button>
          
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
