import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { callApi } from '../api'


const Account = ({ action, setToken, setUserData }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isLogin= action === 'login';
    const title = isLogin ? 'Login' : 'Create Account';
    const oppositeTitle = isLogin ? 'Create Account' : 'Login';
    const oppositeAction = isLogin ? 'register' : 'login';
    const history= useHistory ();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await callApi({
            url: `/users/${action}`,
            body: { user: { username, password } },
            method: 'POST',
        });
        const token = data?.data?.token;

        if (token) {
            localStorage.setItem('token', token);
            setUsername('');
            setPassword('');
            setToken(token);
            history.push('/');
        }
    };

    return (
        <div className= 'account-form'>
        <h1> {title} </h1>
            <form onSubmit= {handleSubmit}>
                <label>Username:</label>
                <input 
                type='text' 
                required
                onChange = {(event) => 
                    setUsername(event.target.value)
                }></input>
                <label>Password:</label>
                <input 
                type='password' 
                required
                onChange = {(event) => 
                    setPassword(event.target.value)
                }></input>
                  <label>Re-enter Password:</label>
                <input type='password' required
                onChange = {(event) => 
                    setPassword(event.target.value)
                 } ></input>
                <button type='submit'> {title} </button> 
                </form>

            <Link to= {`/${oppositeAction}`}> {oppositeTitle} </Link>
        </div>
    );
 }
export default Account;