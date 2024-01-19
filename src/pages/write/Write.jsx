import { useContext, useState, useEffect } from "react";
import "./write.css";
import { useSelector } from "react-redux";
import { uploadImage, writePost } from "../../utils/api";
import toast from "react-hot-toast";
import UploadImage from "../../components/uploadImage/uploadImage";

export default function Write() {
  const user = useSelector((state) => state.user.user);
  const [postDetails, setPostDetails] = useState({
    title: "",
    desc: "",
    image: "",
    category: "",
  });
  const [cat , setCat] = useState()

  console.log(postDetails.category , "category")
  console.log(cat , "sub cat")
  // Load post details from local storage on component mount
  useEffect(() => {
    const storedPostDetails = localStorage.getItem("postDetails");
    if (storedPostDetails) {
      setPostDetails(JSON.parse(storedPostDetails));
    }
  }, []);

  // Save post details to local storage on state change
  useEffect(() => {
    localStorage.setItem("postDetails", JSON.stringify(postDetails));
  }, [postDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    (!postDetails.title && toast.error("Title Cannot be Empty"));
    (!postDetails.desc && toast.error("Description Cannot be Empty"));
    (!postDetails.image && toast.error("Image cannot be empty"));

    const newPost = {
      username: user?.tokenObject?.username,
      title: postDetails.title,
      desc: postDetails.desc,
      photo:postDetails.image,
      categories: postDetails.category,
    };

    console.log(postDetails?.image , "image is post")
  
    // Writing Post
    const err = writePost(newPost, user?.token);
    if (err) {
      console.log("I am here");
      toast.error("Cannot Upload Post! , Try again Later");
    }

    // Reset postDetails after submission
    setPostDetails({
      title: "",
      desc: "",
      image: "",
      category: "",
    });
  };

  const handleAddCategory = () => {
    if (cat.trim() !== "") {
      setPostDetails({
        ...postDetails,
        category: [...postDetails.category , cat],
      });
    setCat("")
    }
  };

  const handleRemoveCategory = (category) => {
    const update =   postDetails.category.filter((fil)=> fil != category)
    console.log("update" , update)
    setPostDetails({
      ...postDetails,
      category: update
    });
  };

  return (
    <div className="write">
<div className="imageUp">
<UploadImage  postDetails={postDetails} setPostDetails={setPostDetails}  />

</div>
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            value={postDetails.title}
            onChange={(e) => setPostDetails({ ...postDetails, title: e.target.value })}
          />
        </div>
        <div className="cat-container">
          <div className="cat-input">
            <input
              type="text"
              value={cat}
              placeholder="Add Categories..."
              onChange={(e) => setCat(  e.target.value )}
            />
            <button type="button" className="cat-button" onClick={handleAddCategory}>
              Add Cat
            </button>
          </div>
          {postDetails.category && (
            <div className="show-cat">
              {postDetails.category.map((category, index) => (
                <div key={index} className="category-item">
                  <span>{category.trim()}</span>
                  <button
                    type="button"
                    onClick={()=> handleRemoveCategory(category)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="desc-area" style={{justifyContent:'center'}}>
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            value={postDetails.desc}
            onChange={(e) => setPostDetails({ ...postDetails, desc: e.target.value })}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
