

import useGetPosts from "../../Hooks/useGetPosts";
import CardItem from "../CardItem/CardItem";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Post() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetPosts();
  const Navigate = useNavigate();

  const [filter, setFilter] = useState("");

  const handleAddPost = () => {
    user?.tokenObject
      ? navigate("/add_post")
      : toast.error("Please Login to continue");
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div>
          <img src="/images/loader.png" className="loader" alt="Loader" />
        </div>
      </div>
    );
  }


  const filteredPosts = data.filter(
    (val) =>
      val.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) &&
      val.username === user?.tokenObject?.username
  );

  return (
    <div>
      {filteredPosts.length > 0 ? (
        <div style={{width:'100%' , textAlign:'center', marginTop:'1rem'}}> 
                      <span> Your Post...</span>

        <div className="post-container">

          {filteredPosts.map((post, i) => (
            <div onClick={() => Navigate(`/post/${post.id}`)} key={i}>
              <CardItem
                src={post ? post.photo : ""}
                text={post?.title}
                label={post?.categories.slice(0, 1)}
                path=""
              />
            </div>
          ))}
        </div>
        </div>
      ) : (
        <div style={{margin:'0 auto' , width:'100%' , textAlign:'center', display:'flex' ,  flexDirection:"column" ,gap:'1rem' , marginBottom:'2rem' }}>
          <span style={{color:'#808080', fontSize:'22px'}}>No Post to show.....</span>
            <button className="settingsSubmit" onClick={handleAddPost}> Add Post </button>
        </div>
      )}
    </div>
  ); 
}
