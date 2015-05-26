/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */


/*
var someElement = document.querySelector("body");

Object.prototype.yolo = {
	stuff: function() {
		var junk = "hidden";	
		return junk;
	},
	foo: function () {
		console.log(this); 
	},
	
	bar: function () { console.log("I'm bar()")}
};

someElement.yolo.foo(); // Object {foo: function, bar: function}

*/
var someElement = document.querySelector("script");

Object.defineProperty(Element.prototype, "yolo", {
	get: function () {
		return {
			element: this,
			toClass: {}.toString,
			foo: function() {
				//alert(this.toClass.call(this.element));
 			  //alert(this.element instanceof Object);
				console.log(this.element);
			},
			
			bar: function() { /* ... */ }
		}
	},
	configurable: true,
	writeable: false
});

someElement.yolo.foo(); // It works! (Logs our actual element)
/*
This works, but there is a rather annoying issue here: We are generating this object and redefining our functions every single time this property is called. This is a rather bad idea for performance. Ideally, we want to generate this object once, and then return the generated object. We also don’t want every element to have its own completely separate instance of the functions we defined, we want to define these functions on a prototype, and use the wonderful JS inheritance for them, so that our library is also dynamically extensible. Luckily, there is a way to do all this too:
 */

			var x2js = new X2JS();

			var json = x2js.xml_str2json(xml);