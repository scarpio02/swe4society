
//import of fetch, a function that allows API connection and return available
import fetch from 'node-fetch';//require("node-fetch");

export async function GetNutrientInfo(params) {

console.log('Hellovcfbhgjkl')

//API url, needed for connection to API
const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(params.query)}&pageSize=${encodeURIComponent(params.pagesize)}&api_key=${encodeURIComponent(params.api_key)}`
// getData function that calls fetch
// it is an asynchronous function because it needs to wait for the promised API return,
// the promised object gives and error if accessed before the return so an addition .then() is necessary
async function getData() {
	let info =  await fetch(api_url).then(response => response.json())
	return info
}
//initial call of getData for entire API return
var info = await getData().then(data => {return (data).foods} )
//API return that returns specifically the foods, eliminating the other returned information
var nutritionInfo = await getData().then(data => {return (data).foods} )

//Create map of nutrient info
var resultsMap = new Map()
//interates through the returned products 
for(let i = 0; i < Object.keys(info).length; i++)
{
	var nutritionDict = []
	//extracts the current iterations nutrition information
	var nutrients = nutritionInfo[i].foodNutrients
	//interates through each of the 10 provided nurtients and pushes them to dictionary
	for(let j = 0; j < 10; j++)
	{
		nutritionDict.push({Nutrient : nutrients[j].nutrientName, Grams :  nutrients[j].value})
	}
	//pushes the product name and associated nutrition dictionary onto a map
	resultsMap.set(info[i].brandName +', '+ info[i].description,nutritionDict)

}


//Create new 'simpler' map
var resultsMap2 = new Map()
//simplifies nutrient names so that they can be accessed later.
//iterates through the returned products
for(let i = 0; i < Object.keys(info).length; i++)
{
	var nutritionDict = {}
	//gets that specific products nutrition info
	var nutrients = nutritionInfo[i].foodNutrients
	//iterates through each nutrient
	for(let j = 0; j < 10; j++)
	{
        var nutrient;
        var value;
	//splits the nutrient name, removing whitespace so that it can be searched for later without error
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
//manually inputted user attributes for testing
var sortCriteria = "Protein" //1 for most 2 for least
var order = 'ascending'
var sortedMap = new Map()
//sorter function takes in nutrient to sort by and the desired order
function sorter(sortCrtiteria,order)
{
	if(order == 'descending')
	{
		//iterates through each food
		for(let i = 0; i <5; i++)
	{
		max = -1
		//forEach function checks the value of current product and returns desired least or greatest
		resultsMap2.forEach(function(value, key) {
		//function provides sorting aspect checking current running max 
		if(value[sortCriteria] > max)
		{
			//checks if value is greater than current running max to save for return
			max = value[sortCriteria]
			maxName = key
		}
		})
		//pushes to new sorted map
		sortedMap.set(maxName,resultsMap2.get(maxName))
		
		resultsMap2.delete(maxName)
	}
	}
	else if(order == 'ascending')
	{
		//iterates through each food
		for(let i = 0; i <5; i++)
	{
		min = 9999999
		//forEach function checks the value of current product and returns desired least or greatest
		resultsMap2.forEach(function(value, key) {
		//function provides sorting aspect checking current running min
		if(value[sortCriteria] < min)
		{
			//checks if value is less than current running min to save for return
			min = value[sortCriteria]
			minName = key
		}
		})
		//pushes to new sorted map
		sortedMap.set(minName,resultsMap2.get(minName))	
		resultsMap2.delete(minName)
	}
	}
}
//test call of sorting function
sorter(sortCriteria,order)
console.log(sortedMap);
return sortedMap;
}

