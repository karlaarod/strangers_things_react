import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from "@material-ui/core";


const postMatches = (post, searchTerm) =>{
    const searchTermLowercase= searchTerm.toLowerCase();
    const{ 
        description, 
        location, 
        title, 
        author: { username }
    } = post;

    const toMatch = [description, location, title, username];
    for (const field of toMatch){
        if (field.toLowerCase().includes(searchTermLowercase)){
            return true;
        }
    }
}

const List = ({ posts, loading }) => {
    const history = useHistory();
    const [searchTerm, updateSearchTerm] = useState ('')

    const postsDisplay = searchTerm.length > 0 ?
    posts.filter((post) => postMatches(post, searchTerm)) : posts;

    if (loading){
        return <CircularProgress className='loading-icon'/> ;

    }

    return (
        <>
            
            <h2>Posts</h2>
            <div className= 'search-bar'>
            <input
            className= 'search-input'
            type = 'text'
            placeholder= 'Search for posts'
            value= {searchTerm}
            onChange= {(event)=> {
                updateSearchTerm(event.target.value);
            }} 
            />
             <button>SEARCH</button>
            </div>
            <div className='post-list'>
            { postsDisplay.length > 0 && postsDisplay ? (
                postsDisplay.map(( post ) => (
                    <div key= {post._id} className= 'post'>
                <h5>{post.title}</h5>
                <div>Posted by: {post.author.username}</div>
                <div>Description: {post.description} </div>
                <button
                    onClick={() => {
                    history.push(`/posts/${post._id}`);
                    }}>View Post</button>
                    </div>
                    ))
                ) : (
                    <h5>NO posts to display</h5>
            )}
            </div>
        </>
    );
};

export default List;

