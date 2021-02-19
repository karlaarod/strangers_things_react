import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Account, List, Post, Nav, NewPost} from './';
import { callApi } from '../api';


const fetchUserData = async (token) => {
    const { data } = await callApi({
        url: '/users/me',
        token,
    });
    return data;
};

const fetchPosts = async () =>{
    const { data: { posts } } = await callApi ({
        url: '/posts',
    });
    return posts;
}



const App = () => {
    const [token, setToken] = useState('');
    const [userData, setUserData]= useState({})
    const [posts, setPosts] = useState ([])
    // console.log(`Token is: ${token}`);

    useEffect(async () => {
        if (!token) {
            setToken(localStorage.getItem('token'));
            const posts= await fetchPosts();
            setPosts(posts)
            return;
        }
        const data = await fetchUserData(token);
        if (data && data.username) {
            setUserData(data);
            console.log('userdata', data)
        } const posts= await fetchPosts();
        setPosts(posts);

    },[token]);

    return (
        <>

        <Nav/>
         <Route exact path="/">
                {userData.username && <div>Hello, {userData.username}!</div>}
                
                <NewPost posts= {posts} setPosts={setPosts} token={token}/>
            </Route>
            <Route exact path="/posts">
                <List posts = { posts }/>
            </Route>
            <Route path="/posts/:postId">
                <Post posts={posts} />
            </Route>
        <Route path= '/login'>
        <Account action= 'login' setToken={setToken} setUserData= {setUserData}/>

        </Route>
        <Route path ='/register'>
        <Account action= 'register' setToken={setToken} setUserData= {setUserData} />
        </Route>
        </>
    );
};

export default App;

