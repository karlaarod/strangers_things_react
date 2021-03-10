import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import {
  Account,
  List,
  Post,
  Nav,
  NewPost,
  Profile,
  Message,
  Inbox,
  ViewUserPosts,
} from "./";
import { callApi } from "../api";

const fetchUserData = async (token) => {
  const { data } = await callApi({
    url: "/users/me",
    token,
  });
  return data;
};

const fetchPosts = async () => {
  const {
    data: { posts },
  } = await callApi({
    url: "/posts",
  });
  return posts;
};

const App = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);

//   console.log("token", token);

  useEffect(async () => {
    const posts = await fetchPosts();
    if (posts){ 
      setPosts(posts);
    }
    if (!token) {
      setToken(localStorage.getItem("token"));
      return;
    }
    const data = await fetchUserData(token);
    if (data && data.username) {
      setUserData(data);
    }}, [token]);


  return (
    <>
      <Nav userData={userData} setUserData={setUserData} setToken={setToken} />

      <Route exact path="/">
        {userData.username ? (
          <div className="title-page">
            <h1>Hello, {userData.username}!</h1>
            <h1>Where Stranger is Better!</h1>
          </div>
        ) : (
          <div className="title-page">
            <h1>Where Stranger is Better!</h1>
          </div>
        )}
      </Route>
      <Route path="/login">
        <Account action="login" setToken={setToken} setUserData={setUserData} />
      </Route>
      <Route path="/register">
        <Account
          action="register"
          setToken={setToken}
          setUserData={setUserData}
        />
      </Route>
      <Route exact path="/posts">
        <List posts={posts} />
        {console.log('posts:', posts)}
      </Route>
      <Route path="/posts/:postId">
        <Post
          posts={posts}
          setPosts={setPosts}
          token={token}
          userData={userData}
        />
      </Route>
      <Route path="/posts/:postId/messages">
        <Message token={token}></Message>
      </Route>
      <Route path="/dashboard">
        <Profile 
        userData={userData} 
        posts={posts} 
        token={token} /> 
      </Route>
      <Route path="/dashboard/messages">
     <Inbox 
        userData={userData} 
        posts={posts} /> 
      </Route>
      <Route path="/newPost">
        <NewPost 
        posts={posts} 
        setPosts={setPosts} 
        token={token} />
      </Route>
      <Route exact path="/dashboard/myposts">
        <ViewUserPosts 
        userData={userData} />
      </Route>
    </>
  );
};

export default App;
