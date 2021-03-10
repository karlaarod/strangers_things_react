import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { callApi } from '../api';



const Message= ({token}) =>{
    const {postId} = useParams();
    const [content, setContent] = useState ('');
    const history= useHistory();

console.log('postid', postId)
console.log('token is',token)

const handleSumbit= async(event) =>{
    event.preventDefault();

    const data = await callApi ({
        url: `/posts/${postId}/messages`,
        method:'POST',
        token: token,
        body: { message: {content}}
    })
    console.log('data:',data)

    const messageSuccess = data?.success;
    if (messageSuccess){
        alert('Message Sent!')
        history.push('/dashboard/')
    } 

    console.log(data)

}
    return(   
        <div className='message-form'>
         <h1>Reply to Post</h1>
         <form onSubmit={handleSumbit}>
         <textarea className='message-form-textarea' placeholder= 'type a message' rows="10" cols="40" maxLength="150" required
         value={content}
         onChange= {(event)=>{
             setContent(event.target.value)
         }}
        ></textarea>
        <button>Send</button>
        <button onClick= {()=>{
            history.push(`/posts/${postId}`)
        }} >Cancel</button>
        </form>
         </div>
    )    
}

export default Message