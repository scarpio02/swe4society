import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'

export function Register() {
    const history = useNavigate()
    const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);
    const [registrationFailed, setRegistrationFailed] = useState(false);

    async function handleRegister(e) {
        e.preventDefault()

        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value,
        }

        fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        }).then((response) => {
            return response.json();
        }).then(result => {
            console.log(result);
            if (result.message === "Success") {
                setSuccessfullyRegistered(true);
                setRegistrationFailed(false);
                form[0].value = "";
                form[1].value = "";
            }
            else {
                setSuccessfullyRegistered(false);
                setRegistrationFailed(true);
                form[0].value = "";
                form[1].value = "";
            }
        })
    }

    useEffect(() => {
        fetch("/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? history.push("/dashboard"): null)
    }, [history])

    return (
        <form onSubmit={event => handleRegister(event)}>
            <input required type="text"/>
            <input required type="password"/>
            <input type="submit" value="Submit"/>
            {successfullyRegistered &&
                <p>
                You registered!
                </p> 
            }
            {registrationFailed &&
                <p>
                Username has already been taken.
                </p> 
            }
        </form>
    )
}

export default Register;