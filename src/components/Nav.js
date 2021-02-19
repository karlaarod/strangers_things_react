import React from 'react';

const Nav = () =>{

return (
    <header>
    <img src="logo.png"></img>
    <div className='nav-links'>
    <a href= '/'>Home</a>
    <a href= '/posts'>Posts</a>
    
    <a href= '/login'>My Account</a>
    <a href= '#'>Log Out</a>
    </div>
    </header>
)
}

export default Nav;