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
  const [loading, setLoading]= useState(false)
//   console.log("token", token);

  useEffect(async () => {
    setLoading(true);

    const posts = await fetchPosts();
    if (posts){ 
      setLoading(false);

      setPosts(posts);
    }
    if (!token) {
      setToken(localStorage.getItem("token"));
      setLoading(false);

      return;
    }
    const data = await fetchUserData(token);

    if (data && data.username) {
            setLoading(false);

      setUserData(data);
    }}, [token]);


  return (
    <>
      <Nav userData={userData} setUserData={setUserData} setToken={setToken} />

      <Route exact path="/">
          <div className="title-page">
            <div className='left-side'>
            <img className='home-img' src='https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=100'/>
            </div>
            <div className='right-side'>
            <h2>Where Stranger Is Better</h2>
        
              </div>
          </div>
       
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
        <List posts={posts} 
        loading= {loading}
        />
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
