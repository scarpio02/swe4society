import { getData } from "./get.js"

var info = await getData().then(data => {return (data).foods} )
var nutritionInfo = await getData().then(data => {return (data).foods} )
//console.log(nutritionInfo[0].foodNutrients)

var resultsMap = new Map()

//console.log(Object.keys(info).length)
//console.log(typeof nutritionInfo[0])

for(let i = 0; i < Object.keys(info).length; i++)
{
	var nutritionDict = {}
	var nutrients = nutritionInfo[i].foodNutrients
	//console.log(nutrients)
	for(let j = 0; j < 10; j++)
	{
        var nutrient;
        var value;
        nutrient = ((nutrients[j].nutrientName).split(' ')[0]).split(',')[0]
        value = nutrients[j].value
		nutritionDict[nutrient] = value
        
	}
    
	resultsMap.set(info[i].brandName +', '+ info[i].description,nutritionDict)
}

var sortedMap = new Map([resultsMap.entries()].sort((a, b) => b.Protein - a.Protein));
var sortedMap2 = new Map(Array.from(resultsMap.values()).sort((a,b) => b.Protein - a.Protein));
var currentDict ={};
currentDict = resultsMap.get('PRIMO TAGLIO, PROVOLONE CHEESE')

console.log(Array.from(resultsMap.values()).map(c=>c.Protein))
console.log(sortedMap)
console.log(sortedMap2)
//
//.map(a=>a,Protein,b=>b.Protein)
