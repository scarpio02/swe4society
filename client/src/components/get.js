// const express = require('express')
// const router = express.Router();
// const foodpost = require('../modles/modelpost');
import fetch from 'node-fetch';//require("node-fetch");
//import App from './app.jsx'


const params = {
	api_key: 'adGOkaniwDcX5OGdQwBKtAG4NnaCknGEsJrpcCX5',
	query: 'Dietz and Watson Provolone Cheese',
	food: 'cheddar cheese',
	dataType: ["Survey (FNDDS)"],
	pagesize: 3,
	pageNumber: 1,
}

//const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dateType)}&pageSize=${encodeURIComponent(params.pagesize)}`
//const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=apple&pageSize=2&api_key=adGOkaniwDcX5OGdQwBKtAG4NnaCknGEsJrpcCX5`
const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(params.query)}&pageSize=${encodeURIComponent(params.pagesize)}&api_key=${encodeURIComponent(params.api_key)}`
const api_url2 = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(params.food)}&pageSize=${encodeURIComponent(params.pagesize)}
&api_key=${encodeURIComponent(params.api_key)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}`


function getData(myString) {
	// return fetch(api_url)
	//.then(response => response.json())
	return fetch(myString).then(response => response.json())
}

// getData(api_url).then(data => console.log(data))//.foods[0].foodNutrients))
// getData(api_url2).then(data => console.log(data))
//Stripping the brand name when searching for alts (can do 2 text boxes)
// var brandName = prompt("Brand Name: ");
// var foodName = prompt("Food Name: ")

//Parsing out specific nutrients

/*------------------------------------------------*/
//Printing to the console: Dietz and Watson Provolone Cheese, Protein: 26, Fat: 28
// getData(api_url).then(data => console.log(data))
getData(api_url).then(data => console.log(data.foods[0].description + ", Protein: " + data.foods[0].foodNutrients[0].value + 
"g, Carbohydrates: " + data.foods[0].foodNutrients[2].value + "g, Fats: " + data.foods[0].foodNutrients[1].value + "g"))
// getData(api_url).then(data => console.log(data.foods[0].foodNutrients[2]))
/*------------------------------------------------*/
/*------------------------------------------------*/
//Store the objects/whatever in a map
let topFoods = new Map();
for(let i = 0; i < 10; i++){
	let myFood = getData(api_url).then(data => data.foods[i])
	console.log(myFood)
	// topFoods.set(i + 1, getData(api_url).then(data => data.foods[i]));
	// console.log("\n" + topFoods.get(i + 1).value)
}
/*------------------------------------------------*/
/*------------------------------------------------*/
//Either sort the map or find top alternative, 2nd alt, 3rd alt -> Return those

//Storing/Sorting -> Storing in a datastructure
//Input -> the params
