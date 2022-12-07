//import of fetch, a function that allows API connection and return available
import fetch from "node-fetch";//require("node-fetch");
//react allows us to use react library and components
import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
// importing specific componenets from react library for use later
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router'
import { useLayoutEffect, useState, useEffect } from 'react'
import { GetNutrientInfo } from "./get.mjs"

//get function is function that gathers sorted map and displays it
function Get() {
	console.log('Hello')
	const history = useNavigate()
	//sets use states for later use of sorted map and the nutrition map
	const [sortedMap, setSortedMap] = useState(new Map([]));
	const [nutrition, setNutrition] = useState(<p></p>);

	//this function test the current user token to determine if they are authorized to access the use of the functions below
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

	//this displays the sorted array entries
	useEffect(() => {
		console.log(Array.from(sortedMap.entries()));
		//converting map to array for easier print
		const mapToArray = Array.from(sortedMap.entries());
		//this render function is where the new array is actually printed
		let newRender = mapToArray.map(([key, value]) => 
			<>
			<ul key={key}>{key}</ul>
			{Object.entries(value).map(([type, amount]) => 
			<li>{`${type}: ${amount}` }</li>)}
			</>
		);
		console.log(newRender);
	//this sets the previously defined use state to what is now the new render defined in the layout
	setNutrition(newRender)
}, [sortedMap])

	async function handleGet(e) {
		e.preventDefault()

        const form = e.target;
		//these are the query parameteres given to the API including Key and products wanted 
		const params = {
			api_key: 'adGOkaniwDcX5OGdQwBKtAG4NnaCknGEsJrpcCX5',
			query: form[0].value,
			//dataType: ["Survey (FNDDS)"],
			pagesize: 5,
		}
		
		let testmap = await GetNutrientInfo(params)
		setSortedMap(testmap);
	}

	//this is the actual output of the screen
	//including new render of sorted products
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

