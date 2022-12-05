import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router'
import { useLayoutEffect, useState, useEffect } from 'react'

// Here, we display our Navbar
export default function Navbar() {
  const history = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  async function logout(e) {
    localStorage.removeItem("token")
    await history.push("/login")
  }

  useLayoutEffect(() => {
    fetch("http://localhost:5000/isUserAuth", {
        method:"POST",
        headers: {
            "Content-type": "application/json",
            "x-access-token": localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => data.isLoggedIn ? setIsLoggedIn(true): null)
    .then(data => data.isLoggedIn ? setUsername(data.username): null)
    .catch(err => alert(err)) 
}, )

 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <NavLink className="navbar-brand" to="/">
       <a href="/" className="mr-auto font-extrabold text-2xl z-50">Better4U</a>
       </NavLink>
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
 
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
           <li className="nav-item">
           <NavLink className="nav-link" to="/register">
               Register
             </NavLink>
           <NavLink className="nav-link" to="/login">
               Login
             </NavLink>
           </li>
         </ul>
       </div>
     </nav>
   </div>
 );
}

//<img style={{"width" : 25 + '%'}} src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"></img>