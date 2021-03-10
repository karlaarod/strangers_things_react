import React from "react";
import { useHistory } from "react-router-dom";

const ViewUserPosts = ({ userData }) => {
  const myPosts = userData.posts;
  const history = useHistory();

  console.log("userData", userData);


  if (!myPosts) {
    return <h5>NO posts to display</h5>;
  }
  const activePost = myPosts.filter((post) => post.active === true);
  return (
    <div className="users-posts">
      {activePost.map((post, index) => {
        return (
          <div key={index}>
            <h5>{post.title}</h5>
            <div>Created at: {post.createdAt}</div>
            <div>Description: {post.description} </div>
            <button
              onClick={() => {
                history.push(`/posts/${post._id}`);
              }}
            >
              View Post
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ViewUserPosts;
