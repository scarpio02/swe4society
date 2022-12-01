// const express = require('express')
// const router = express.Router();
// const foodpost = require('../modles/modelpost');
import fetch from 'node-fetch';//require("node-fetch");
//import App from './app.jsx'

console.log('Hello')

const params = {
	api_key: 'adGOkaniwDcX5OGdQwBKtAG4NnaCknGEsJrpcCX5',
	query: 'Provolone Cheese',
	//dataType: ["Survey (FNDDS)"],
	pagesize: 5,
}
function resolvePromise(info) {
	return Promise.all(info).then(() => foodsArray)
}
//const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dateType)}&pageSize=${encodeURIComponent(params.pagesize)}`
//const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=apple&pageSize=2&api_key=adGOkaniwDcX5OGdQwBKtAG4NnaCknGEsJrpcCX5`
const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(params.query)}&pageSize=${encodeURIComponent(params.pagesize)}&api_key=${encodeURIComponent(params.api_key)}`

async function getData() {
	let info =  await fetch(api_url).then(response => response.json())
	return info
}
var info = await getData().then(data => {return (data).foods} )
var nutritionInfo = await getData().then(data => {return (data).foods} )

//Create map of nutrient info
var resultsMap = new Map()
for(let i = 0; i < Object.keys(info).length; i++)
{
	var nutritionDict = []
	var nutrients = nutritionInfo[i].foodNutrients
	for(let j = 0; j < 10; j++)
	{
		nutritionDict.push({Nutrient : nutrients[j].nutrientName, Grams :  nutrients[j].value})
	}

	resultsMap.set(info[i].brandName +', '+ info[i].description,nutritionDict)

}

console.log(resultsMap)
console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

//Create new 'simpler' map
var resultsMap2 = new Map()
for(let i = 0; i < Object.keys(info).length; i++)
{
	var nutritionDict = {}
	var nutrients = nutritionInfo[i].foodNutrients
	for(let j = 0; j < 10; j++)
	{
        var nutrient;
        var value;
        nutrient = ((nutrients[j].nutrientName).split(' ')[0]).split(',')[0]
        value = nutrients[j].value
		nutritionDict[nutrient] = value   
	}
	resultsMap2.set(info[i].brandName +', '+ info[i].description,nutritionDict)
}


//Set variables for sorting
var max = -1
var min = 99999999
var maxName
var minName

//Sorting checks to call sepcific functions
var sortCriteria = "Protein 1" //1 for most 2 for least
if(sortCriteria == "Protein 1")
{
	sortProteinMost()
}
else if (sortCriteria == "Protein 2")
{
	sortProteinLeast()
}
else if (sortCriteria == "Carbs 1")
{
	sortCarbsMost()
}
else if (sortCriteria == "Carbs 2")
{
	sortCarbsLeast()
}
else if (sortCriteria == "Fats 1")
{
	sortFatsMost()
}
else if (sortCriteria == "Fats 2")
{
	sortFatsLeast()
}

//Sorting Functions
function sortProteinMost()
{
	for(let i = 0; i <5; i++)
	{
		max = -1
		resultsMap2.forEach(function(value, key) {
		if(value.Protein > max)
		{
			max = value.Protein
			maxName = key
		}
		})
		console.log("MAX IS: " + maxName + " = " + max)
		resultsMap2.delete(maxName)
	}
}
function sortProteinLeast()
{
	for(let i = 0; i <5; i++)
	{
		min = 9999999
		resultsMap2.forEach(function(value, key) {
		if(value.Protein < min)
		{
			min = value.Protein
			minName = key
		}
		})
		console.log("MIN IS: " + minName + " = " + min)
		resultsMap2.delete(minName)
	}
}

function sortCarbsMost()
{
	for(let i = 0; i <5; i++)
	{
		max = -1
		resultsMap2.forEach(function(value, key) {
		if(value.Carbohydrate > max)
		{
			max = value.Carbohydrate
			maxName = key
		}
		})
		console.log("MAX IS: " + maxName + " = " + max)
		resultsMap2.delete(maxName)
	}
}
function sortCarbsLeast()
{
	for(let i = 0; i <5; i++)
	{
		min = 9999999
		resultsMap2.forEach(function(value, key) {
		if(value.Carbohydrate < min)
		{
			min = value.Carbohydrate
			minName = key
		}
		})
		console.log("MIN IS: " + minName + " = " + min)
		resultsMap2.delete(minName)
	}
}

function sortFatsMost()
{
	for(let i = 0; i <5; i++)
	{
		max = -1
		resultsMap2.forEach(function(value, key) {
		if(value.Total > max)
		{
			max = value.Total
			maxName = key
		}
		})
		console.log("MAX IS: " + maxName + " = " + max)
		resultsMap2.delete(maxName)
	}
}
function sortFatsLeast()
{
	for(let i = 0; i <5; i++)
	{
		min = 9999999
		resultsMap2.forEach(function(value, key) {
		if(value.Total < min)
		{
			min = value.Total
			minName = key
		}
		})
		console.log("MIN IS: " + minName + " = " + min)
		resultsMap2.delete(minName)
	}
}
