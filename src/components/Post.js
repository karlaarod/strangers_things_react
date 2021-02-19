import React from 'react';
import { useParams } from 'react-router-dom'
import { callApi } from '../api';




const Post = ({posts}) => {

const {postId} = useParams();
const post = posts.find((post) => postId === post._id);

// {postId !== undefined && <Post posts={posts} />}

const handleDelete = async ()=>{
    const { data: { posts } } = await callApi ({
        url: `/posts/${post._id}`,
    });
    return posts;
}
  if (!post){
      return <div></div>
  }
    return (
        <>
             <h5> {post.title} </h5>
             <div> Posted by: { post.author.username }</div>
             <div> Location: { post.location }</div>
             <div> Description: { post.description }</div>
             <div>Price : ${post.price}</div>
             <div>Delivers: { post.willDeliver ? 'Yes' : 'No' }</div>
        </>
    )


}

export default Post