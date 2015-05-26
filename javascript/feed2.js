/*
// this grabs XML source from webpage. e.g.
// view-source:view-source:http://hiphopsince1987.com/music/feed/

//console.timeEnd("x2js")
// JSON.stringify(jas)  

*/

var viewRss = function(el, rss)
{
  this.el = el;
  this.rss = rss;
  this.template = function(node) { 
		// note: need link logic, may not be array
    return `<h1><a href="${node.link[1]}" target="_blank">${node.title}</a></h1>` +
			     `<h2>${node.description}</h2>`; 
  };
  this.render = function()
  {
   	this.el.innerHTML += (this.template(this.rss.channel));
  }
}

var viewRssItems = function(el, rss)
{
  this.el = el;
  this.rss = rss;
  this.template = function(node) {
		var tmp = 
      `<hr/><div><b><a href="${node.link}" target="_blank">${node.title}</a></b><br/>` +
			(node.creator || node.author ? `By ${node.creator || node.author}</div>` : `</div>`) +
			new Date(`${node.pubDate}`).toLocaleString() + `<br>` +
			(node.encoded ? `<br/><div>${node.encoded}</div>` : `<br/><div>${node.description}</div>`) +
			(node.comments ? `<div>Comments [${node.comments[1]}]: <a href="${node.comments[0]}">${node.comments[0]}" target="_blank"</a></div>` : ``) +
			(node.commentRss ? `<div>Comments feed: <a href="${node.commentRss}" target="_blank">${node.commentRss}</a></div>` : ``);
		  if (node.enclosure) {
				tmp +=
					`<audio style="height: 28px; width: 50%;" controls>` +
  				  `<source src="` + node.enclosure._url + `" type="audio/mpeg">` +
				    `Your browser does not support the audio element.` +
					`</audio><br/>`;
			}
		  return tmp + txtCategories(node.category);
  };
  this.render = function()
  {
		if (this.rss.channel.item)
			this.rss.channel.item.forEach(function(node) {
				this.el.innerHTML += (this.template(node));
			}.bind(this));
		else
			this.el.innerHTML += `<h1>No items</h1>`;

		this.el.innerHTML += `<hr/>[Last updated: ` +	new Date(`${this.rss.channel.lastBuildDate}`).toLocaleString() + `<br>` +
		 + (this.rss.channel.language ? `, Language: ${this.rss.channel.language}` : ``)
		 + (this.rss.channel.updateFrequency && this.rss.channel.updateFrequency ? `, Update Interval: ${this.rss.channel.updateFrequency}/${this.rss.channel.updatePeriod}` : ``)
		 + (this.rss.channel.generator ? `, Generator:${this.rss.channel.generator}` : ``) +  `]`;

		this.el.innerHTML += txtCategories(this.rss.channel.category);
	};
}

var viewAtom = function(el, feed)
{
  this.el = el;
  this.feed = feed;
  this.template = function(node) { 
		var html = "";
		this.feed.link.forEach(function(aNode) {
			if (aNode._type == "text/html")
			{
				html = `<h1><a href="${aNode._href}" target="_blank">${node.title}</a></h1>`;
			}
		});
		return html + (node.subtitle && node.subtitle.__text ? `<h2>${node.subtitle.__text}</h2>` : ``) + (node.author ? `Author: ` + txtAuthor(node.author) + `<br\>` : ``); 
  };
  this.render = function()
  {
	    this.el.innerHTML += (this.template(this.feed));
  }
}

var viewAtomEntries = function(el, feed)
{
  this.el = el;
  this.feed = feed;
  this.template = function(node) {
		var tmp = "<hr/><div>";
		var link = node.link;
		if (!	Array.isArray(link))
			link = [link];
	  link.forEach(function(aNode) {
			if (aNode._rel == "alternate") {
				tmp += `<b><a href="${aNode._href}" target="_blank">${node.title}</a></b>`;
			}
	  });
		tmp += 
     	`<br>` + new Date("`${node.updated ? node.updated : node.published}`").toLocaleString() + 
			`<br>Author: ${txtAuthor(node.author)}`;
		  if (node.thumbnail) {
				tmp += ` <img src="${node.thumbnail._url}" style="height: ${node.thumbnail._height}; width: ${node.thumbnail._width}"></img>`;
			}		  

			tmp += `<div>${node.content}</div>`;
		  if (node.enclosure) {
				tmp +=
					`<audio style="height: 28px; width: 50%;" controls>` +
  				  `<source src="` + node.enclosure._url + `" type="audio/mpeg">` +
				    `Your browser does not support the audio element.` +
					`</audio><br/>`;
			}
		return tmp + `</div>`;
  };
  this.render = function()
  {
	  this.feed.entry.forEach(function(node) {
	    this.el.innerHTML += (this.template(node));
			this.el.innerHTML += txtCategories(node.category, true);
	  }.bind(this));

		this.el.innerHTML += `<hr/>[Last updated: ` + new Date("`${this.feed.updated}`").toLocaleString() 
		 + (this.feed.generator ? `, Generator:${this.feed.generator}` : ``) +  `]`;

		this.el.innerHTML += txtCategories(this.feed.category, true);
	};
}

txtAuthor = function(author)
{
	var txt = "";
	if (author.image)
	{
		var src = author.image._src;
		if (src.substring(0,2) == "//")
			src = "http:" + src;
		txt += `<img src="${src}" style="height: ${author.image._height}; width: ${author.image._width}"/>`;
	}
	if (author.uri)
	{
		txt = `<a href="${author.uri}" target="_blank">` + txt + `${author.name}</a>`		
	}
	else if (author.name)
	{
		txt = txt + `${author.name}`		
	}
	return txt;
}

txtCategories = function(cats, isAtom)
{
	var txt = "";
	if (cats)
	{
		txt += `<br\>category: `;
		var tmp = cats;
		if (!	Array.isArray(tmp))
			tmp = [tmp];
		txt += (isAtom ? `${tmp[0]._term}` : `${tmp[0]}`);
		tmp.shift();
		tmp.forEach(function(cat) {
			txt += `, ${(isAtom ? cat._term : cat)}`;
		});
	}
	return txt;
}

	


var xmlSrc = $("#viewsource > pre:nth-child(1)").textContent;
var x2js = new X2JS();
var jas = x2js.xml_str2json(xmlSrc);

var d = document.createElement("DIV");
if (jas.rss)
{
	var z = new viewRss(d, jas.rss);
	var y = new viewRssItems(d, jas.rss);
	z.render();
	y.render();
}	
else if (jas.feed)
{
	var z = new viewAtom(d, jas.feed);
	var y = new viewAtomEntries(d, jas.feed);
	z.render();
	y.render();
}
document.body.insertAdjacentHTML('afterend', d.innerHTML)

JSON.stringify(jas)






/*
This library provides XML to JSON (JavaScript Objects) and vice versa javascript conversion functions. 
The library is very small and doesn't require any other additional libraries.

API functions

    new X2JS() - to create your own instance to access all library functionality
        new X2JS(config) - to create your own instance with additional config:
            escapeMode : true|false - Escaping XML characters. Default is true from v1.1.0+
            attributePrefix : "<string>" - Prefix for XML attributes in JSon model. Default is "_"
            arrayAccessForm : "none"|"property" - The array access form (none|property). 
								Use this property if you want X2JS generates an additional property <element>_asArray to access in array form for any XML element. Default is none from v1.1.0+
            emptyNodeForm : "text"|"object" - Handling empty nodes (text|object) mode. 
								When X2JS found empty node like <test></test> it will be transformed to test : '' for 'text' mode, 
								or to Object for 'object' mode. Default is 'text'
            enableToStringFunc : true|false - Enable/disable an auxiliary function in generated JSON objects to 
								print text nodes with text/cdata. Default is true
            arrayAccessFormPaths : [] - Array access paths. Use this option to configure paths to XML elements 
								always in "array form". You can configure beforehand paths to all your array elements based on XSD 
								or your knowledge. Every path could be a simple string (like 'parent.child1.child2'), 
								a regex (like /.*\.child2/), or a custom function. Default is empty
            skipEmptyTextNodesForObj : true|false - Skip empty text tags for nodes with children. Default is true.
            stripWhitespaces : true|false - Strip whitespaces (trimming text nodes). Default is true.
            datetimeAccessFormPaths : [] - Datetime access paths. Use this option to configure paths to XML elements 
								for "datetime form". You can configure beforehand paths to all your array elements based on XSD 
								or your knowledge. Every path could be a simple string (like 'parent.child1.child2'), 
								a regex (like /.*\.child2/), or a custom function. Default is empty 
								  // Working with XML DateTime. Configuring it beforehand
									x2js = new X2JS({
        						datetimeAccessFormPaths : [
           						"MyDts.testds" // Configure it beforehand
        						]
    							});
    							xmlText = "<MyDts>"+
                							"<testds>2002-10-10T12:00:00+04:00</testds>"+
        										"</MyDts>";
    							jsonObj = x2js.xml_str2json( xmlText );
    							console.log(jsonObj.MyDts.testds );
									jsonObj.MyDts.testds.getMonth();
									// Or using the utility function
									x2js = new X2JS();
    							xmlText = "<MyDts>"+
                							"<testds>2002-10-10T12:00:00+04:00</testds>"+
        										"</MyDts>";
    							jsonObj = x2js.xml_str2json( xmlText );
    							console.log(x2js.asDateTime( jsonObj.MyDts.testds ));				
									
    <instance>.xml2json - Convert XML specified as DOM Object to JSON
    <instance>.json2xml - Convert JSON to XML DOM Object
    <instance>.xml_str2json - Convert XML specified as string to JSON
    <instance>.json2xml_str - Convert JSON to XML string
    <instance>.asArray - Utility function for working with JSON field always in array form
    <instance>.asDateTime - Utility function for convert the specified parameter from XML DateTime to JS Date
    <instance>.asXmlDateTime - Utility function for convert the specified parameter to XML DateTime from JS Date or timestamp 
		
 Copyright 2011-2013 Abdulla Abdurakhmanov
 Original sources are available at https://code.google.com/p/x2js/

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

function X2JS(config) {
	'use strict';
		
	var VERSION = "1.1.5";
	
	config = config || {};
	initConfigDefaults();
	initRequiredPolyfills();
	
	function initConfigDefaults() {
		if(config.escapeMode === undefined) {
			config.escapeMode = true;
		}
		config.attributePrefix = config.attributePrefix || "_";
		config.arrayAccessForm = config.arrayAccessForm || "none";
		config.emptyNodeForm = config.emptyNodeForm || "text";
		if(config.enableToStringFunc === undefined) {
			config.enableToStringFunc = true; 
		}
		config.arrayAccessFormPaths = config.arrayAccessFormPaths || []; 
		if(config.skipEmptyTextNodesForObj === undefined) {
			config.skipEmptyTextNodesForObj = true;
		}
		if(config.stripWhitespaces === undefined) {
			config.stripWhitespaces = true;
		}
		config.datetimeAccessFormPaths = config.datetimeAccessFormPaths || [];
	}

	var DOMNodeTypes = {
		ELEMENT_NODE 	   : 1,
		TEXT_NODE    	   : 3,
		CDATA_SECTION_NODE : 4,
		COMMENT_NODE	   : 8,
		DOCUMENT_NODE 	   : 9
	};
	
	function initRequiredPolyfills() {
		function pad(number) {
	      var r = String(number);
	      if ( r.length === 1 ) {
	        r = '0' + r;
	      }
	      return r;
	    }
		// Hello IE8-
		if(typeof String.prototype.trim !== 'function') {			
			String.prototype.trim = function() {
				return this.replace(/^\s+|^\n+|(\s|\n)+$/g, '');
			}
		}
		if(typeof Date.prototype.toISOString !== 'function') {
			// Implementation from http://stackoverflow.com/questions/2573521/how-do-i-output-an-iso-8601-formatted-string-in-javascript
			Date.prototype.toISOString = function() {
		      return this.getUTCFullYear()
		        + '-' + pad( this.getUTCMonth() + 1 )
		        + '-' + pad( this.getUTCDate() )
		        + 'T' + pad( this.getUTCHours() )
		        + ':' + pad( this.getUTCMinutes() )
		        + ':' + pad( this.getUTCSeconds() )
		        + '.' + String( (this.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
		        + 'Z';
		    };
		}
	}
	
	function getNodeLocalName( node ) {
		var nodeLocalName = node.localName;			
		if(nodeLocalName == null) // Yeah, this is IE!! 
			nodeLocalName = node.baseName;
		if(nodeLocalName == null || nodeLocalName=="") // =="" is IE too
			nodeLocalName = node.nodeName;
		return nodeLocalName;
	}
	
	function getNodePrefix(node) {
		return node.prefix;
	}
		
	function escapeXmlChars(str) {
		if(typeof(str) == "string")
			return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
		else
			return str;
	}

	function unescapeXmlChars(str) {
		return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x2F;/g, '\/');
	}
	
	function toArrayAccessForm(obj, childName, path) {
		switch(config.arrayAccessForm) {
		case "property":
			if(!(obj[childName] instanceof Array))
				obj[childName+"_asArray"] = [obj[childName]];
			else
				obj[childName+"_asArray"] = obj[childName];
			break;		
		/*case "none":
			break;*/
		}
		
		if(!(obj[childName] instanceof Array) && config.arrayAccessFormPaths.length > 0) {
			var idx = 0;
			for(; idx < config.arrayAccessFormPaths.length; idx++) {
				var arrayPath = config.arrayAccessFormPaths[idx];
				if( typeof arrayPath === "string" ) {
					if(arrayPath == path)
						break;
				}
				else
				if( arrayPath instanceof RegExp) {
					if(arrayPath.test(path))
						break;
				}				
				else
				if( typeof arrayPath === "function") {
					if(arrayPath(obj, childName, path))
						break;
				}
			}
			if(idx!=config.arrayAccessFormPaths.length) {
				obj[childName] = [obj[childName]];
			}
		}
	}
	
	function fromXmlDateTime(prop) {
		// Implementation based up on http://stackoverflow.com/questions/8178598/xml-datetime-to-javascript-date-object
		// Improved to support full spec and optional parts
		var bits = prop.split(/[-T:+Z]/g);
		
		var d = new Date(bits[0], bits[1]-1, bits[2]);			
		var secondBits = bits[5].split("\.");
		d.setHours(bits[3], bits[4], secondBits[0]);
		if(secondBits.length>1)
			d.setMilliseconds(secondBits[1]);

		// Get supplied time zone offset in minutes
		if(bits[6] && bits[7]) {
			var offsetMinutes = bits[6] * 60 + Number(bits[7]);
			var sign = /\d\d-\d\d:\d\d$/.test(prop)? '-' : '+';

			// Apply the sign
			offsetMinutes = 0 + (sign == '-'? -1 * offsetMinutes : offsetMinutes);

			// Apply offset and local timezone
			d.setMinutes(d.getMinutes() - offsetMinutes - d.getTimezoneOffset())
		}
		else
			if(prop.indexOf("Z", prop.length - 1) !== -1) {
				d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()));					
			}

		// d is now a local time equivalent to the supplied time
		return d;
	}
	
	function checkFromXmlDateTimePaths(value, childName, fullPath) {
		if(config.datetimeAccessFormPaths.length > 0) {
			var path = fullPath.split("\.#")[0];
			var idx = 0;
			for(; idx < config.datetimeAccessFormPaths.length; idx++) {
				var dtPath = config.datetimeAccessFormPaths[idx];
				if( typeof dtPath === "string" ) {
					if(dtPath == path)
						break;
				}
				else
				if( dtPath instanceof RegExp) {
					if(dtPath.test(path))
						break;
				}				
				else
				if( typeof dtPath === "function") {
					if(dtPath(obj, childName, path))
						break;
				}
			}
			if(idx!=config.datetimeAccessFormPaths.length) {
				return fromXmlDateTime(value);
			}
			else
				return value;
		}
		else
			return value;
	}

	function parseDOMChildren( node, path ) {
		if(node.nodeType == DOMNodeTypes.DOCUMENT_NODE) {
			var result = new Object;
			var nodeChildren = node.childNodes;
			// Alternative for firstElementChild which is not supported in some environments
			for(var cidx=0; cidx <nodeChildren.length; cidx++) {
				var child = nodeChildren.item(cidx);
				if(child.nodeType == DOMNodeTypes.ELEMENT_NODE) {
					var childName = getNodeLocalName(child);
					result[childName] = parseDOMChildren(child, childName);
				}
			}
			return result;
		}
		else
		if(node.nodeType == DOMNodeTypes.ELEMENT_NODE) {
			var result = new Object;
			result.__cnt=0;
			
			var nodeChildren = node.childNodes;
			
			// Children nodes
			for(var cidx=0; cidx <nodeChildren.length; cidx++) {
				var child = nodeChildren.item(cidx); // nodeChildren[cidx];
				var childName = getNodeLocalName(child);
				
				if(child.nodeType!= DOMNodeTypes.COMMENT_NODE) {
					result.__cnt++;
					if(result[childName] == null) {
						result[childName] = parseDOMChildren(child, path+"."+childName);
						toArrayAccessForm(result, childName, path+"."+childName);					
					}
					else {
						if(result[childName] != null) {
							if( !(result[childName] instanceof Array)) {
								result[childName] = [result[childName]];
								toArrayAccessForm(result, childName, path+"."+childName);
							}
						}
						(result[childName])[result[childName].length] = parseDOMChildren(child, path+"."+childName);
					}
				}								
			}
			
			// Attributes
			for(var aidx=0; aidx <node.attributes.length; aidx++) {
				var attr = node.attributes.item(aidx); // [aidx];
				result.__cnt++;
				result[config.attributePrefix+attr.name]=attr.value;
			}
			
			// Node namespace prefix
			var nodePrefix = getNodePrefix(node);
			if(nodePrefix!=null && nodePrefix!="") {
				result.__cnt++;
				result.__prefix=nodePrefix;
			}
			
			if(result["#text"]!=null) {				
				result.__text = result["#text"];
				if(result.__text instanceof Array) {
					result.__text = result.__text.join("\n");
				}
				if(config.escapeMode)
					result.__text = unescapeXmlChars(result.__text);
				if(config.stripWhitespaces)
					result.__text = result.__text.trim();
				delete result["#text"];
				if(config.arrayAccessForm=="property")
					delete result["#text_asArray"];
				result.__text = checkFromXmlDateTimePaths(result.__text, childName, path+"."+childName);
			}
			if(result["#cdata-section"]!=null) {
				result.__cdata = result["#cdata-section"];
				delete result["#cdata-section"];
				if(config.arrayAccessForm=="property")
					delete result["#cdata-section_asArray"];
			}
			
			if( result.__cnt == 1 && result.__text!=null  ) {
				result = result.__text;
			}
			else
			if( result.__cnt == 0 && config.emptyNodeForm=="text" ) {
				result = '';
			}
			else
			if ( result.__cnt > 1 && result.__text!=null && config.skipEmptyTextNodesForObj) {
				if( (config.stripWhitespaces && result.__text=="") || (result.__text.trim()=="")) {
					delete result.__text;
				}
			}
			delete result.__cnt;			
			
			if( config.enableToStringFunc && (result.__text!=null || result.__cdata!=null )) {
				result.toString = function() {
					return (this.__text!=null? this.__text:'')+( this.__cdata!=null ? this.__cdata:'');
				};
			}
			
			return result;
		}
		else
		if(node.nodeType == DOMNodeTypes.TEXT_NODE || node.nodeType == DOMNodeTypes.CDATA_SECTION_NODE) {
			return node.nodeValue;
		}	
	}
	
	function startTag(jsonObj, element, attrList, closed) {
		var resultStr = "<"+ ( (jsonObj!=null && jsonObj.__prefix!=null)? (jsonObj.__prefix+":"):"") + element;
		if(attrList!=null) {
			for(var aidx = 0; aidx < attrList.length; aidx++) {
				var attrName = attrList[aidx];
				var attrVal = jsonObj[attrName];
				if(config.escapeMode)
					attrVal=escapeXmlChars(attrVal);
				resultStr+=" "+attrName.substr(config.attributePrefix.length)+"='"+attrVal+"'";
			}
		}
		if(!closed)
			resultStr+=">";
		else
			resultStr+="/>";
		return resultStr;
	}
	
	function endTag(jsonObj,elementName) {
		return "</"+ (jsonObj.__prefix!=null? (jsonObj.__prefix+":"):"")+elementName+">";
	}
	
	function endsWith(str, suffix) {
	    return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
	
	function jsonXmlSpecialElem ( jsonObj, jsonObjField ) {
		if((config.arrayAccessForm=="property" && endsWith(jsonObjField.toString(),("_asArray"))) 
				|| jsonObjField.toString().indexOf(config.attributePrefix)==0 
				|| jsonObjField.toString().indexOf("__")==0
				|| (jsonObj[jsonObjField] instanceof Function) )
			return true;
		else
			return false;
	}
	
	function jsonXmlElemCount ( jsonObj ) {
		var elementsCnt = 0;
		if(jsonObj instanceof Object ) {
			for( var it in jsonObj  ) {
				if(jsonXmlSpecialElem ( jsonObj, it) )
					continue;			
				elementsCnt++;
			}
		}
		return elementsCnt;
	}
	
	function parseJSONAttributes ( jsonObj ) {
		var attrList = [];
		if(jsonObj instanceof Object ) {
			for( var ait in jsonObj  ) {
				if(ait.toString().indexOf("__")== -1 && ait.toString().indexOf(config.attributePrefix)==0) {
					attrList.push(ait);
				}
			}
		}
		return attrList;
	}
	
	function parseJSONTextAttrs ( jsonTxtObj ) {
		var result ="";
		
		if(jsonTxtObj.__cdata!=null) {										
			result+="<![CDATA["+jsonTxtObj.__cdata+"]]>";					
		}
		
		if(jsonTxtObj.__text!=null) {			
			if(config.escapeMode)
				result+=escapeXmlChars(jsonTxtObj.__text);
			else
				result+=jsonTxtObj.__text;
		}
		return result;
	}
	
	function parseJSONTextObject ( jsonTxtObj ) {
		var result ="";

		if( jsonTxtObj instanceof Object ) {
			result+=parseJSONTextAttrs ( jsonTxtObj );
		}
		else
			if(jsonTxtObj!=null) {
				if(config.escapeMode)
					result+=escapeXmlChars(jsonTxtObj);
				else
					result+=jsonTxtObj;
			}
		
		return result;
	}
	
	function parseJSONArray ( jsonArrRoot, jsonArrObj, attrList ) {
		var result = ""; 
		if(jsonArrRoot.length == 0) {
			result+=startTag(jsonArrRoot, jsonArrObj, attrList, true);
		}
		else {
			for(var arIdx = 0; arIdx < jsonArrRoot.length; arIdx++) {
				result+=startTag(jsonArrRoot[arIdx], jsonArrObj, parseJSONAttributes(jsonArrRoot[arIdx]), false);
				result+=parseJSONObject(jsonArrRoot[arIdx]);
				result+=endTag(jsonArrRoot[arIdx],jsonArrObj);						
			}
		}
		return result;
	}
	
	function parseJSONObject ( jsonObj ) {
		var result = "";	

		var elementsCnt = jsonXmlElemCount ( jsonObj );
		
		if(elementsCnt > 0) {
			for( var it in jsonObj ) {
				
				if(jsonXmlSpecialElem ( jsonObj, it) )
					continue;			
				
				var subObj = jsonObj[it];						
				
				var attrList = parseJSONAttributes( subObj )
				
				if(subObj == null || subObj == undefined) {
					result+=startTag(subObj, it, attrList, true);
				}
				else
				if(subObj instanceof Object) {
					
					if(subObj instanceof Array) {					
						result+=parseJSONArray( subObj, it, attrList );					
					}
					else if(subObj instanceof Date) {
						result+=startTag(subObj, it, attrList, false);
						result+=subObj.toISOString();
						result+=endTag(subObj,it);
					}
					else {
						var subObjElementsCnt = jsonXmlElemCount ( subObj );
						if(subObjElementsCnt > 0 || subObj.__text!=null || subObj.__cdata!=null) {
							result+=startTag(subObj, it, attrList, false);
							result+=parseJSONObject(subObj);
							result+=endTag(subObj,it);
						}
						else {
							result+=startTag(subObj, it, attrList, true);
						}
					}
				}
				else {
					result+=startTag(subObj, it, attrList, false);
					result+=parseJSONTextObject(subObj);
					result+=endTag(subObj,it);
				}
			}
		}
		result+=parseJSONTextObject(jsonObj);
		
		return result;
	}
	
	this.parseXmlString = function(xmlDocStr) {
		var isIEParser = window.ActiveXObject || "ActiveXObject" in window;
		if (xmlDocStr === undefined) {
			return null;
		}
		var xmlDoc;
		if (window.DOMParser) {
			var parser=new window.DOMParser();			
			var parsererrorNS = null;
			// IE9+ now is here
			if(!isIEParser) {
				try {
					parsererrorNS = parser.parseFromString("INVALID", "text/xml").childNodes[0].namespaceURI;
				}
				catch(err) {					
					parsererrorNS = null;
				}
			}
			try {
				xmlDoc = parser.parseFromString( xmlDocStr, "text/xml" );
				if( parsererrorNS!= null && xmlDoc.getElementsByTagNameNS(parsererrorNS, "parsererror").length > 0) {
					//throw new Error('Error parsing XML: '+xmlDocStr);
					xmlDoc = null;
				}
			}
			catch(err) {
				xmlDoc = null;
			}
		}
		else {
			// IE :(
			if(xmlDocStr.indexOf("<?")==0) {
				xmlDocStr = xmlDocStr.substr( xmlDocStr.indexOf("?>") + 2 );
			}
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async="false";
			xmlDoc.loadXML(xmlDocStr);
		}
		return xmlDoc;
	};
	
	this.asArray = function(prop) {
		if(prop instanceof Array)
			return prop;
		else
			return [prop];
	};
	
	this.toXmlDateTime = function(dt) {
		if(dt instanceof Date)
			return dt.toISOString();
		else
		if(typeof(dt) === 'number' )
			return new Date(dt).toISOString();
		else	
			return null;
	};
	
	this.asDateTime = function(prop) {
		if(typeof(prop) == "string") {
			return fromXmlDateTime(prop);
		}
		else
			return prop;
	};

	this.xml2json = function (xmlDoc) {
		return parseDOMChildren ( xmlDoc );
	};
	
	this.xml_str2json = function (xmlDocStr) {
		var xmlDoc = this.parseXmlString(xmlDocStr);
		if(xmlDoc!=null)
			return this.xml2json(xmlDoc);
		else
			return null;
	};

	this.json2xml_str = function (jsonObj) {
		return parseJSONObject ( jsonObj );
	};

	this.json2xml = function (jsonObj) {
		var xmlDocStr = this.json2xml_str (jsonObj);
		return this.parseXmlString(xmlDocStr);
	};
	
	this.getVersion = function () {
		return VERSION;
	};
	
}
