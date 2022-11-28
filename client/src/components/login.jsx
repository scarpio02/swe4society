import { useNavigate } from 'react-router'
import { useLayoutEffect, useState, useEffect } from 'react'
import {Link, Navigate} from 'react-router-dom';
import ValidationError from './ValidationError'

function Login() {
    const history = useNavigate()
    // const [successfullyLoggedIn, setSuccessfullyLoggedIn] = useState(false);
    // const [loginFailed, setLoginFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleLogin(e) {
        e.preventDefault()

        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }

        try {
            console.log(user.username);
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const data = await res.json()
            localStorage.setItem("token", data.token)
            console.log(localStorage.getItem("token"));
            setErrorMessage(data.message)
        } catch(err) {
            setErrorMessage(err)
        }
    }

    //     fetch("http://localhost:5000/login", {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify(user)
    //     }).then((response) => {
    //         return response.json();
    //     })//.then(res => res.json())
    //     .then(data => {
    //         localStorage.setItem("token", data.token)
    //     }).then(result => {
    //         console.log(result);
    //         if (result.message === "Success") {
    //             setSuccessfullyLoggedIn(true);
    //             setLoginFailed(false);
    //             form[0].value = "";
    //             form[1].value = "";
    //         }
    //         else {
    //             setSuccessfullyLoggedIn(false);
    //             setLoginFailed(true);
    //             form[0].value = "";
    //             form[1].value = "";
    //         }
    //     })
    // }

    useLayoutEffect(() => {
        fetch("http://localhost:5000/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? history.push("/dashboard"): null)
        .catch(err => {
            console.log(`${err}`);
            setErrorMessage(err);
        })
    }, [history])

    return (
        <div className="text-black flex flex-col h-screen w-screen items-center justify-center">
            <div className="p-5 text-3xl font-extrabold">Login</div>
            <form className="mx-5 flex flex-col w-72" onSubmit={(e) => handleLogin(e)}>
                <label htmlFor="username">Username</label>
                <input className="text-black m-3 border-2 border-green-400 p-1" type="text" name="username" id="username" />
                <label htmlFor="password">Password</label>
                <input className="text-black m-3 border-2 border-green-400 p-1" type="password" name="password" id="password" />
                <input className="m-1 px-2 py-1 rounded font-bold text-xl bg-green-400 text-gray-900" type="submit" value="Login"/>
                <div className="flex flex-row items-center justify-center">
                    <h1>Don't have an account?</h1>
                    <Link className="m-1 px-2 py-1 rounded font-bold text-xl border-2 border-green-400 text-green-400 text-center" to="/register">Register</Link>
                </div>  
                          </form>
                
            
        </div>

        //{errorMessage === "Success" ? <Navigate to="/"/>: <ValidationError message={errorMessage} />}

        // <form onSubmit={event => handleLogin(event)}>
        //     <input required type="text"/>
        //     <input required type="password"/>
        //     <input type="submit" value="Submit"/>
        //     {successfullyLoggedIn &&
        //         <p>
        //         Login Successful!
        //         </p> 
        //     }
        //     {loginFailed &&
        //         <p>
        //         Invalid Username or Password.
        //         </p> 
        //     }

        // </form>
    )
}

export default Login;
