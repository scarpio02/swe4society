import { useNavigate } from 'react-router'
import { useEffect } from 'react'

export function Login() {
    const history = useNavigate()

    function handleLogin(e) {
        e.preventDefault()

        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("token", data.token)
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
        <form onSubmit={event => handleLogin(event)}>
            <input required type="email"/>
            <input required type="password"/>
            <input type="submit" value="Submit"/>
        </form>
    )
}
