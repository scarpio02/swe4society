import { useNavigate } from 'react-router'
import { useLayoutEffect, useState, useEffect } from 'react'
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";


function Navbar() {
    const history = useNavigate()
    const [username, setUsername] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    async function logout(e) {
        //logout function - when user logs out, login button will appear
        localStorage.removeItem("token")
        await history.push("/login")
    }

    useLayoutEffect(() => {
        fetch("http://localhost:5000/isUserAuth", {
            method:"POST",
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? setIsLoggedIn(true): null)
        .then(data => data.isLoggedIn ? setUsername(data.username): null)
        .catch(err => alert(err)) 
    }, [])


    return (
        <>
        //setting navbar style attributes and printing Home, Search, Logout (or login), and Register to screen.
        //Login links to login page when clicked
        //Logout logs user out of site when clicked
            <section className={`text-white flex flex-col w-screen justify-center items-center sm:hidden fixed transition-all duration-500 -my- z-30 h-screen bg-gray-900`}>
                <div className="mx-3 text-3xl hover:text-green-300"><Link to="/">Home</Link></div>
                <div className="mx-3 text-3xl hover:text-green-300"><Link to="/get">Search</Link></div>
                {isLoggedIn  
                    ? <div className="text-3xl flex flex-col">
                        <div className="cursor-pointer mx-3 hover:text-green-300" onClick={logout}>Logout</div>
                    </div>  
                    : <div className="flex my-10">
                        <div className="mx-3 px-2 py-1 rounded font-bold text-xl bg-green-400 text-gray-900"><Link to="/login">Login</Link></div>
                        <div className="mx-3 px-2 py-1 rounded font-bold text-xl border-2 border-green-400 text-green-400"><Link to="/register">Register</Link></div>
                    </div>
                }
            </section>
            //Styling and printing Logo, Home, Search, and Logout when user is logged in. Login and Register is set to hidden
            <div className="flex flex-row p-10 justify-end text-2xl text-white">
                <a href="/" className="mr-auto font-extrabold text-2xl z-50">Better4U</a>
                <div className="hidden sm:flex mx-3 hover:text-green-300"><Link to="/">Home</Link></div>
                <div className="hidden sm:flex mx-3 hover:text-green-300"><Link to="/get">Search</Link></div>
                {isLoggedIn  
                    ? <div className="hidden sm:flex">
                        <div className="cursor-pointer mx-3 hover:text-green-300" onClick={logout}>Logout</div>
                    </div>  
                    : <div className="hidden sm:flex">
                        <div className="mx-3 px-2 py-1 rounded font-bold text-xl bg-green-400 text-gray-900"><Link to="/login">Login</Link></div>
                        <div className="mx-3 px-2 py-1 rounded font-bold text-xl border-2 border-green-400 text-green-400"><Link to="/register">Register</Link></div>
                    </div>
                }
            </div>
        </>
    )
}

export default Navbar;
