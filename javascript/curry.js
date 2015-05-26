function loadJS(url)
{
	z = document.head.appendChild(document.createElement('script'));
	z.src = url;

};
loadJS("https://raw.githubusercontent.com/dominictarr/curry/master/curry.js");

var objects = [{ id: 1 }, { idx: 2 }, { id: 3 }];
var toClass = {}.toString;
var get = curry(function(property, object){ return object[property] });
var map = curry(function(fn, value){ 
	console.log(value);
	if (toClass.call(value) === '[object NodeList]')
		return Array.slice(value).map(fn);
	else
		return value.map(fn);
})
var getIDs = map(get('id'));
/*
Exception: ReferenceError: arguments is not defined
@Scratchpad/11:1:5
*/
//console.log(getIDs(document.querySelectorAll("*")));
console.log(getIDs(objects));

