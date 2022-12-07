// const express = require('express')
// const router = express.Router();
// const foodpost = require('../modles/modelpost');
import fetch from "node-fetch";//require("node-fetch");
//import App from './app.jsx'
import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router'
import { useLayoutEffect, useState, useEffect } from 'react'
import { GetNutrientInfo } from "./get.mjs"

function Get() {
	console.log('Hello')
	const history = useNavigate()
	// const [isLoggedIn, setIsLoggedIn] = useState(false);
	// const [username, setUsername] = useState(null);
	const [sortedMap, setSortedMap] = useState(new Map([]));
	const [nutrition, setNutrition] = useState(<p></p>);

	useLayoutEffect(() => {
		fetch("http://localhost:5000/isUserAuth", {
			method:"POST",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token")
			}
		})
		.then(res => res.json())
		// .then(data => data.isLoggedIn ? setIsLoggedIn(true): null)
		// .then(data => data.isLoggedIn ? setUsername(data.username): null)
		.catch(err => alert(err)) 
	}, )


	useEffect(() => {
		console.log(Array.from(sortedMap.entries()));
		const mapToArray = Array.from(sortedMap.entries());
		let newRender = mapToArray.map(([key, value]) => 
			<>
			<ul key={key}>{key}</ul>
			{Object.entries(value).map(([type, amount]) => 
			<li>{`${type}: ${amount}` }</li>)}
			</>
		);
		console.log(newRender);
	setNutrition(newRender)
}, [sortedMap])

	async function handleGet(e) {
		e.preventDefault()

        const form = e.target;
		
		const params = {
			api_key: 'adGOkaniwDcX5OGdQwBKtAG4NnaCknGEsJrpcCX5',
			query: form[0].value,
			//dataType: ["Survey (FNDDS)"],
			pagesize: 5,
		}
		
		let testmap = await GetNutrientInfo(params)
		setSortedMap(testmap);
	}


	return(
		<div className="text-white flex flex-col h-screen-300 w-screen items-center">
			<div className="p-3 text-3xl font-extrabold">Search Food</div>
			<form className="mx-5 flex flex-col w-72" onSubmit={(e) => handleGet(e)}>
			<label htmlFor="query">Food</label>
                <input className="text-black m-3 border-2 border-green-400 p-1" type="text" name="query" id="query" />
				<input className="m-1 px-2 py-1 rounded font-bold text-xl bg-green-400 text-gray-900" type="submit" value="Search"/>
				</form>
				<div className="h-max flex flex-col">
					{nutrition}
				</div>

		</div>
	)
}

export default Get;

