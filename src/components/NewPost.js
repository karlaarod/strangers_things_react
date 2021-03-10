import React, {useState} from 'react';
import { callApi } from '../api';
import { useHistory } from 'react-router-dom';



const NewPost = ({posts, setPosts, token}) =>{
    const [title, setTitle] = useState('');
    const [description, setDescription]= useState('')
    const [price, setPrice] = useState ('');
    const [location, setLocation] = useState ('On Request');
    const [willDeliver, setWillDeliver] = useState (false);
    const history= useHistory ();


    const handleOnSubmit = async (event) => {
        event.preventDefault();

        const { data, success, error } = await callApi({
            url: `/posts`,
            method: 'POST',
            token: token,
            body: { post:  
          {  title,
            description,
            price,
            location,
            willDeliver}
                },
        })
        if(data && success && data.post)
        {setPosts([ ...posts, data.post])}
        console.log(posts)
        console.log(data)

        history.push(`/posts/`);
 

    }

    return (
    
        <form className='add-post' onSubmit = {handleOnSubmit}>       
        <h2>Create New Post:</h2> 
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
        value={location} 
        onChange= {(event)=> {
            setLocation(event.target.value)
        }}
        ></input>
        <select
        value= {true}
        onChange= {(event)=> {
         setWillDeliver(event.target.value)
        }}
        >
        <option >Able to Deliver?</option>
        <option value='yes'>Yes</option>
        <option value='no'>No</option>
        </select>
        <button>Add Post</button>
        </form>
    
    )

}

export default NewPost;