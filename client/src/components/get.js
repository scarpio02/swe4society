// const express = require('express')
// const router = express.Router();
// const foodpost = require('../modles/modelpost');
import fetch from 'node-fetch';//require("node-fetch");
//import App from './app.jsx'

console.log('Hello')

const params = {
	api_key: 'adGOkaniwDcX5OGdQwBKtAG4NnaCknGEsJrpcCX5',
	query: 'Dietz and Watson Provolone Cheese',
	//dataType: ["Survey (FNDDS)"],
	pagesize: 5,
}

//const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dateType)}&pageSize=${encodeURIComponent(params.pagesize)}`
//const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=apple&pageSize=2&api_key=adGOkaniwDcX5OGdQwBKtAG4NnaCknGEsJrpcCX5`
const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(params.query)}&pageSize=${encodeURIComponent(params.pagesize)}&api_key=${encodeURIComponent(params.api_key)}`

function getData() {
	return fetch(api_url).then(response => response.json())
}

getData().then(data => console.log(data))//.foods[0].foodNutrients))

//Stripping the brand name when searching for alts (can do 2 text boxes)
//Parsing out specific nutrients
//Printing to the console: Dietz and Watson Provolone Cheese, Protein: 26, Fat: 28

//Store the objects/whatever in a map
//Either sort the map or find top alternative, 2nd alt, 3rd alt -> Return those

//Storing/Sorting -> Storing in a datastructure
//Input -> the params
