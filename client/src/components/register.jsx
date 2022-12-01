import { useNavigate } from 'react-router'
import { useLayoutEffect, useState, useEffect } from 'react'
import {Link, Navigate} from 'react-router-dom';
import ValidationError from './ValidationError'

export function Register() {
    const history = useNavigate()
    // const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);
    // const [registrationFailed, setRegistrationFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    async function handleRegister(e) {
        e.preventDefault()

        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value,
            confirmPassword: form[2].value
        }

        try {
            const res = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const data = await res.json()
            setErrorMessage(data.message)
        } catch (err) {
            setErrorMessage(err)
        }
    }

    //     fetch("http://localhost:5000/register", {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify(user)
    //     }).then((response) => {
    //         return response.json();
    //     }).then(result => {
    //         console.log(result);
    //         if (result.message === "Success") {
    //             setSuccessfullyRegistered(true);
    //             setRegistrationFailed(false);
    //             form[0].value = "";
    //             form[1].value = "";
    //         }
    //         else {
    //             setSuccessfullyRegistered(false);
    //             setRegistrationFailed(true);
    //             form[0].value = "";
    //             form[1].value = "";
    //         }
    //     })
    // }

    useLayoutEffect(() => {
        fetch("http://localhost:5000/isUserAuth", {
            method:"POST",
            headers: {
                "Content-type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? history("/"): null)
    }, [history])

    return (
        // <form onSubmit={event => handleRegister(event)}>
        //     <input required type="text"/>
        //     <input required type="password"/>
        //     <input type="submit" value="Submit"/>
        //     {successfullyRegistered &&
        //         <p>
        //         You registered!
        //         </p> 
        //     }
        //     {registrationFailed &&
        //         <p>
        //         Username has already been taken.
        //         </p> 
        //     }
        // </form>

        <div className="text-white flex flex-col h-screen w-screen items-center justify-center">
        <div className="p-5 text-3xl font-extrabold">Register</div>
        <form className="mx-5 flex flex-col w-72" onSubmit={(e) => handleRegister(e)}>
            <label htmlFor="username">Username</label>
            <input className="text-black m-3 border-2 border-green-400 p-1" type="text" name="username" id="username" />
            <label htmlFor="password">Password</label>
            <input className="text-black m-3 border-2 border-green-400 p-1" type="password" name="password" id="password" />
            <label htmlFor="password">Confirm Password</label>
            <input className="text-black m-3 border-2 border-green-400 p-1" type="password" name="password" id="password" />
            <input className="m-1 px-2 py-1 rounded font-bold text-xl bg-green-400 text-gray-900" type="submit" value="Register" />
            <div className="flex flex-row items-center justify-center">
                <h1>Already have an account?</h1>
                <Link className="m-1 px-2 py-1 rounded font-bold text-xl border-2 border-green-400 text-green-400 text-center" to="/login">Login</Link>
            </div>
            {errorMessage === "Success" ? <Navigate to="/login"/>: <ValidationError message={errorMessage} />}
        </form>
        </div>
    )
}

export default Register;