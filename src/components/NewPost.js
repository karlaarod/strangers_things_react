import React, {useState} from 'react';
import { callApi } from '../api';


const NewPost = ({posts, setPosts, token}) =>{
    const [title, setTitle] = useState('');
    const [description, setDescription]= useState('')
    const [price, setPrice] = useState ('');
    const [location, setLocation] = useState ('');
    const [willDeliver, setWillDeliver] = useState (false);

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        const data = await callApi({
            url: `/posts`,
            body: { post:  
          {  title,
        description,
        price,
        location,
        willDeliver}
                },
            method: 'POST',
            token: token
        })

            // history.push(`/posts/${post._id}`);
            console.log(data)
        
        setPosts([data.post, ...posts])
 

    }

    return (
    
        <form onSubmit = {handleOnSubmit}>        
        <input type= 'text' placeholder= 'title' 
        value = {title}
        onChange= {(event)=>{
            setTitle(event.target.value)
        }}
        required></input>
        <textarea placeholder= 'Description' rows="2" cols="15" maxLength="50" required
        value= {description}
        onChange= {(event)=> {
            setDescription(event.target.value)
        }}
        ></textarea>
        <input type='number' placeholder= 'Price' required
        value= {price}
        onChange= {(event)=> {
            setPrice(event.target.value)
        }}
        ></input>
        <input type= 'text' placeholder= 'Location' 
        value= {location}
        onChange= {(event)=> {
            {location? setLocation(event.target.value) : setLocation(['[On Request]'])}
        }}
        ></input>
        <button>Add Post</button>
        </form>
    
    )

}

export default NewPost;