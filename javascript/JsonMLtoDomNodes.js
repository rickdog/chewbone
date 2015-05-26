/* 
Convert JsonML Array form into nested dom nodes
http://www.codeproject.com/Articles/202436/JsonML-Simplified-Array-prototype-toDomNodes
*/
Array.prototype.toDomNodes = function(p /* parent */, 
f /* function to call on creation of each node */)
{
	if (typeof this[0] === 'string')
	{
		// create element
		var d = document, el = d.createElement(this[0]);

		// resolve parent
		p = (typeof p === 'string') ? d.getElementById(p) : p;

		// a list of attributes to map or 'set directly'
		var am = {id:"id","class":"className",rowspan:"rowSpan",
		colspan:"colSpan",cellpadding:"cellPadding",cellspacing:
		"cellSpacing",maxlength:"maxLength",readonly:"readOnly",
		contenteditable:"contentEditable"};

		// add attributes
		if (this[1] && this[1].constructor == Object) 
		{
			var n = this[1];
			
			for (var a in this[1])
			{
				if (typeof this[a] != 'function')
				{
					if (a === "style" && typeof el.style.cssText 
					!= "undefined") { el.style.cssText = n[a]; }
					else if (a === "style") { el.style = n[a]; }
					else if (am[a]) { el[am[a]] = n[a]; }
					else if (typeof this[a] != "string") { el[a] = 
					n[a]; } // not a string, set directly (expando)
					else { el.setAttribute(a, n[a]); alert(a); }
				}
			}
		}

		// insert element (must be inserted before function call, 
		// otherwise .parentNode does not exist)
		if (p) { p.appendChild(el); }
		
		// pass each node to a function (attributes will exist, 
		// but not innerText||children. can be used for adding events, etc.)
		if (typeof f === 'function') { f.apply(el); }
		
		for (var i=1,l=this.length;i<l;i++) 
		{
			var n = this[i], c = n.constructor;

			if (c === String) // add text node
			{
				el.appendChild(d.createTextNode(n));
			}
			else if (c === Array) // add children
			{
				n.toDomNodes(el, f);
			}
		}

		return el;
	}

	return null;
};


/*

var myDiv = document.createElement("div")
myDiv.id = "myDiv"
myDiv.style.border = "1px solid red";
myDiv.style.backgroundColor = "#cccccc";
myDiv.innerHTML = "Hello World!";
document.body.appendChild(myDiv);
- equals -
["div",{"style":"background-color:#ccc; border: 1px solid red;"},
	"Hello World!"].toDomNodes(document.body, function(){});
---

  var jsonMl =	["table",{"class":"MyTable","style":"background-color:yellow;padding-top:40px;"},
		["tbody",
			["tr",
				["td",{"class":"MyTD","style":"border:1px solid black"},
				"#550758"],
				["td",{"class":"MyTD","style":"background-color:red"},
				"Example text here"]
			],
			["tr", 
				["td",{"class":"MyTD","style":"border:1px solid black"},
				"#993101"],
				["td",{"class":"MyTD","style":"background-color:green"},
				"127624015"]
			],
			["tr", 
				["td",{"class":"MyTD","style":"border:1px solid black"},
				"#E33D87"],
				["td",{"class":"MyTD","style":"background-color:blue"},
				"\u00A9",
					["span",{"id":"mySpan","style":
					"background-color:maroon;color:#fff !important"},"\u00A9"],
					"\u00A9","\u00A9","\u00A9","\u00A9","\u00A9"
				]
			]
		]
	];
  
jsonMl.toDomNodes(document.body);

// If you pass a parent element as the first parameter, 
// the nodes are automatically inserted into that element. 
// If you do not want to insert the elements into the DOM, simply pass null or no parameter.
// In either case, this method will return a reference to the newly created DOM nodes.

var myNewNode = jsonMl.toDomNodes();

// When you are ready to insert the new nodes into the DOM, you can call the 
// traditional appendChild method (or other).

document.body.insertBefore(myNewNode, document.body.firstChild);

*/