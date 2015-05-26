/*
	jsonml-dom.js
	HTML to JsonML utility
  http://www.jsonml.org/dom/
  http://raw.github.com/mckamey/jsonml/master/jsonml-dom.js

	Created: 2007-02-15-2235
	Modified: 2012-11-03-2051

	Copyright (c)2006-2012 Stephen M. McKamey
	Distributed under The MIT License: http://jsonml.org/license
  
  https://raw.githubusercontent.com/mckamey/jsonml/master/jsonml.xslt
  is a transformation for converting XML or XHTML into JsonML.
*/

var JsonML = JsonML || {};

(function(JsonML, document){
	'use strict';

	var addChildren = function(/*DOM*/ elem, /*function*/ filter, /*JsonML*/ jml) {
		if (elem.hasChildNodes()) {
			for (var i=0; i<elem.childNodes.length; i++) {
				var child = elem.childNodes[i];
				child = fromHTML(child, filter);
				if (child) {
					jml.push(child);
				}
			}
			return true;
		}
		return false;
	};

	/**
	 * @param {Node} elem
	 * @param {function} filter
	 * @return {array} JsonML
	 */
	var fromHTML = JsonML.fromHTML = function(elem, filter) {
		if (!elem || !elem.nodeType) {
			// free references
			return (elem = null);
		}

		var i, jml;
		switch (elem.nodeType) {
			case 1:  // element
			case 9:  // document
			case 11: // documentFragment
				jml = [elem.tagName||''];

				var attr = elem.attributes,
					props = {},
					hasAttrib = false;

				for (i=0; attr && i<attr.length; i++) {
					if (attr[i].specified) {
						if (attr[i].name === 'style') {
							props.style = elem.style.cssText || attr[i].value;
						} else if ('string' === typeof attr[i].value) {
							props[attr[i].name] = attr[i].value;
						}
						hasAttrib = true;
					}
				}
				if (hasAttrib) {
					jml.push(props);
				}

				var child;
				switch (jml[0].toLowerCase()) {
					case 'frame':
					case 'iframe':
						try {
							if ('undefined' !== typeof elem.contentDocument) {
								// W3C
								child = elem.contentDocument;
							} else if ('undefined' !== typeof elem.contentWindow) {
								// Microsoft
								child = elem.contentWindow.document;
							} else if ('undefined' !== typeof elem.document) {
								// deprecated
								child = elem.document;
							}
	
							child = fromHTML(child, filter);
							if (child) {
								jml.push(child);
							}
						} catch (ex) {}
						break;
					case 'style':
						child = elem.styleSheet && elem.styleSheet.cssText;
						if (child && 'string' === typeof child) {
							// unwrap comment blocks
							child = child.replace('<!--', '').replace('-->', '');
							jml.push(child);
						} else if (elem.hasChildNodes()) {
							for (i=0; i<elem.childNodes.length; i++) {
								child = elem.childNodes[i];
								child = fromHTML(child, filter);
								if (child && 'string' === typeof child) {
									// unwrap comment blocks
									child = child.replace('<!--', '').replace('-->', '');
									jml.push(child);
								}
							}
						}
						break;
					case 'input':
						addChildren(elem, filter, jml);
						child = (elem.type !== 'password') && elem.value;
						if (child) {
							if (!hasAttrib) {
								// need to add an attribute object
								jml.shift();
								props = {};
								jml.unshift(props);
								jml.unshift(elem.tagName||'');
							}
							props.value = child;
						}
						break;
					case 'textarea':
						if (!addChildren(elem, filter, jml)) {
							child = elem.value || elem.innerHTML;
							if (child && 'string' === typeof child) {
								jml.push(child);
							}
						}
						break;
					default:
						addChildren(elem, filter, jml);
						break;
				}

				// filter result
				if ('function' === typeof filter) {
					jml = filter(jml, elem);
				}

				// free references
				elem = null;
				return jml;
			case 3: // text node
			case 4: // CDATA node
				var str = String(elem.nodeValue);
				// free references
				elem = null;
				return str;
			case 10: // doctype
				jml = ['!'];

				var type = ['DOCTYPE', (elem.name || 'html').toLowerCase()];

				if (elem.publicId) {
					type.push('PUBLIC', '"' + elem.publicId + '"');
				}

				if (elem.systemId) {
					type.push('"' + elem.systemId + '"');
				}

				jml.push(type.join(' '));

				// filter result
				if ('function' === typeof filter) {
					jml = filter(jml, elem);
				}

				// free references
				elem = null;
				return jml;
			case 8: // comment node
				if ((elem.nodeValue||'').indexOf('DOCTYPE') !== 0) {
					// free references
					elem = null;
					return null;
				}

				jml = ['!',
						elem.nodeValue];

				// filter result
				if ('function' === typeof filter) {
					jml = filter(jml, elem);
				}

				// free references
				elem = null;
				return jml;
			default: // etc.
				// free references
				return (elem = null);
		}
	};

	/**
	 * @param {string} html HTML text
	 * @param {function} filter
	 * @return {array} JsonML
	 */
	JsonML.fromHTMLText = function(html, filter) {
		var elem = document.createElement('div');
		elem.innerHTML = html;

		var jml = fromHTML(elem, filter);

		// free references
		elem = null;

		if (jml.length === 2) {
			return jml[1];
		}

		// make wrapper a document fragment
		jml[0] = '';
		return jml;
	};

})(JsonML, document);


/*
	jsonml-html.js
	JsonML to HTML utility
  http://www.jsonml.org/dom/
  https://raw.github.com/mckamey/jsonml/master/jsonml-html.js

	Created: 2006-11-09-0116
	Modified: 2012-11-24-1051

	Copyright (c)2006-2012 Stephen M. McKamey
	Distributed under The MIT License: http://jsonml.org/license

	This file ensures a global JsonML object adding these methods:

		JsonML.toHTML(JsonML, filter)

			This method produces a tree of DOM elements from a JsonML tree. The
			array must not contain any cyclical references.

			The optional filter parameter is a function which can filter and
			transform the results. It receives each of the DOM nodes, and
			its return value is used instead of the original value. If it
			returns what it received, then structure is not modified. If it
			returns undefined then the member is deleted.

			This is useful for binding unobtrusive JavaScript to the generated
			DOM elements.

			Example:

			// Parses the structure. If an element has a specific CSS value then
			// takes appropriate action: Remove from results, add special event
			// handlers, or bind to a custom component.

			var myUI = JsonML.toHTML(myUITemplate, function (elem) {
				if (elem.className.indexOf('Remove-Me') >= 0) {
					// this will remove from resulting DOM tree
					return null;
				}

				if (elem.tagName && elem.tagName.toLowerCase() === 'a' &&
					elem.className.indexOf('External-Link') >= 0) {
					// this is the equivalent of target='_blank'
					elem.onclick = function(evt) {
						window.open(elem.href); return false;
					};

				} else if (elem.className.indexOf('Fancy-Widgit') >= 0) {
					// bind to a custom component
					FancyWidgit.bindDOM(elem);
				}
				return elem;
			});

		JsonML.toHTMLText(JsonML)
			Converts JsonML to HTML text

		// Implement onerror to handle any runtime errors while binding:
		JsonML.onerror = function (ex, jml, filter) {
			// display inline error message
			return document.createTextNode('['+ex+']');
		};
*/

var JsonML = JsonML || {};

(function(JsonML, document) {
	'use strict';

	/**
	 * Attribute name map
	 * 
	 * @private
	 * @constant
	 * @type {Object.<string>}
	 */
	var ATTR_MAP = {
		'accesskey': 'accessKey',
		'bgcolor': 'bgColor',
		'cellpadding': 'cellPadding',
		'cellspacing': 'cellSpacing',
		'checked': 'defaultChecked',
		'class': 'className',
		'colspan': 'colSpan',
		'contenteditable': 'contentEditable',
		'defaultchecked': 'defaultChecked',
		'for': 'htmlFor',
		'formnovalidate': 'formNoValidate',
		'hidefocus': 'hideFocus',
		'ismap': 'isMap',
		'maxlength': 'maxLength',
		'novalidate': 'noValidate',
		'readonly': 'readOnly',
		'rowspan': 'rowSpan',
		'spellcheck': 'spellCheck',
		'tabindex': 'tabIndex',
		'usemap': 'useMap',
		'willvalidate': 'willValidate'
		// can add more attributes here as needed
	};

	/**
	 * Attribute duplicates map
	 * 
	 * @private
	 * @constant
	 * @type {Object.<string>}
	 */
	var ATTR_DUP = {
		'enctype': 'encoding',
		'onscroll': 'DOMMouseScroll'
		// can add more attributes here as needed
	};

	/**
	 * Attributes to be set via DOM
	 * 
	 * @private
	 * @constant
	 * @type {Object.<number>}
	 */
	var ATTR_DOM = {
		'autocapitalize': 1,
		'autocomplete': 1,
		'autocorrect': 1
		// can add more attributes here as needed
	};

	/**
	 * Boolean attribute map
	 * 
	 * @private
	 * @constant
	 * @type {Object.<number>}
	 */
	var ATTR_BOOL = {
		'async': 1,
		'autofocus': 1,
		'checked': 1,
		'defaultchecked': 1,
		'defer': 1,
		'disabled': 1,
		'formnovalidate': 1,
		'hidden': 1,
		'indeterminate': 1,
		'ismap': 1,
		'multiple': 1,
		'novalidate': 1,
		'readonly': 1,
		'required': 1,
		'spellcheck': 1,
		'willvalidate': 1
		// can add more attributes here as needed
	};

	/**
	 * Leading SGML line ending pattern
	 * 
	 * @private
	 * @constant
	 * @type {RegExp}
	 */
	var LEADING = /^[\r\n]+/;

	/**
	 * Trailing SGML line ending pattern
	 * 
	 * @private
	 * @constant
	 * @type {RegExp}
	 */
	var TRAILING = /[\r\n]+$/;

	/**
	 * @private
	 * @const
	 * @type {number}
	 */
	var NUL = 0;

	/**
	 * @private
	 * @const
	 * @type {number}
	 */
	var FUN = 1;

	/**
	 * @private
	 * @const
	 * @type {number}
	 */
	var ARY = 2;

	/**
	 * @private
	 * @const
	 * @type {number}
	 */
	var OBJ = 3;

	/**
	 * @private
	 * @const
	 * @type {number}
	 */
	var VAL = 4;

	/**
	 * @private
	 * @const
	 * @type {number}
	 */
	var RAW = 5;

	/**
	 * Wraps a data value to maintain as raw markup in output
	 * 
	 * @private
	 * @this {Markup}
	 * @param {string} value The value
	 * @constructor
	 */
	function Markup(value) {
		/**
		 * @type {string}
		 * @const
		 * @protected
		 */
		this.value = value;
	}

	/**
	 * Renders the value
	 * 
	 * @public
	 * @override
	 * @this {Markup}
	 * @return {string} value
	 */
	Markup.prototype.toString = function() {
		return this.value;
	};

	/**
	 * @param {string} value
	 * @return {Markup}
	 */
	JsonML.raw = function(value) {
		return new Markup(value);
	};

	/**
	 * @param {*} value
	 * @return {boolean}
	 */
	var isMarkup = JsonML.isRaw = function(value) {
		return (value instanceof Markup);
	};

	/**
	 * Determines if the value is an Array
	 * 
	 * @private
	 * @param {*} val the object being tested
	 * @return {boolean}
	 */
	var isArray = Array.isArray || function(val) {
		return (val instanceof Array);
	};

	/**
	 * Determines if the value is a function
	 * 
	 * @private
	 * @param {*} val the object being tested
	 * @return {boolean}
	 */
	function isFunction(val) {
		return (typeof val === 'function');
	}

	/**
	 * Determines the type of the value
	 * 
	 * @private
	 * @param {*} val the object being tested
	 * @return {number}
	 */
	function getType(val) {
		switch (typeof val) {
			case 'object':
				return !val ? NUL : (isArray(val) ? ARY : (isMarkup(val) ? RAW : ((val instanceof Date) ? VAL : OBJ)));
			case 'function':
				return FUN;
			case 'undefined':
				return NUL;
			default:
				return VAL;
		}
	}

	/**
	 * Creates a DOM element 
	 * 
	 * @private
	 * @param {string} tag The element's tag name
	 * @return {Node}
	 */
	var createElement = function(tag) {
		if (!tag) {
			// create a document fragment to hold multiple-root elements
			if (document.createDocumentFragment) {
				return document.createDocumentFragment();
			}

			tag = '';

		} else if (tag.charAt(0) === '!') {
			return document.createComment(tag === '!' ? '' : tag.substr(1)+' ');
		}

		if (tag.toLowerCase() === 'style' && document.createStyleSheet) {
			// IE requires this interface for styles
			return document.createStyleSheet();
		}

		return document.createElement(tag);
	};

	/**
	 * Adds an event handler to an element
	 * 
	 * @private
	 * @param {Node} elem The element
	 * @param {string} name The event name
	 * @param {function(Event)} handler The event handler
	 */
	var addHandler = function(elem, name, handler) {
		if (name.substr(0,2) === 'on') {
			name = name.substr(2);
		}

		switch (typeof handler) {
			case 'function':
				if (elem.addEventListener) {
					// DOM Level 2
					elem.addEventListener(name, handler, false);

				} else if (elem.attachEvent && getType(elem[name]) !== NUL) {
					// IE legacy events
					elem.attachEvent('on'+name, handler);

				} else {
					// DOM Level 0
					var old = elem['on'+name] || elem[name];
					elem['on'+name] = elem[name] = !isFunction(old) ? handler :
						function(e) {
							return (old.call(this, e) !== false) && (handler.call(this, e) !== false);
						};
				}
				break;

			case 'string':
				// inline functions are DOM Level 0
				/*jslint evil:true */
				elem['on'+name] = new Function('event', handler);
				/*jslint evil:false */
				break;
		}
	};

	/**
	 * Appends an attribute to an element
	 * 
	 * @private
	 * @param {Node} elem The element
	 * @param {Object} attr Attributes object
	 * @return {Node}
	 */
	var addAttributes = function(elem, attr) {
		if (attr.name && document.attachEvent && !elem.parentNode) {
			try {
				// IE fix for not being able to programatically change the name attribute
				var alt = createElement('<'+elem.tagName+' name="'+attr.name+'">');
				// fix for Opera 8.5 and Netscape 7.1 creating malformed elements
				if (elem.tagName === alt.tagName) {
					elem = alt;
				}
			} catch (ex) { }
		}

		// for each attributeName
		for (var name in attr) {
			if (attr.hasOwnProperty(name)) {
				// attributeValue
				var value = attr[name],
					type = getType(value);

				if (name) {
					if (type === NUL) {
						value = '';
						type = VAL;
					}

					name = ATTR_MAP[name.toLowerCase()] || name;

					if (name === 'style') {
						if (getType(elem.style.cssText) !== NUL) {
							elem.style.cssText = value;
						} else {
							elem.style = value;
						}

					} else if (name.substr(0,2) === 'on') {
						addHandler(elem, name, value);

						// also set duplicated events
						name = ATTR_DUP[name];
						if (name) {
							addHandler(elem, name, value);
						}

					} else if (!ATTR_DOM[name.toLowerCase()] && (type !== VAL || name.charAt(0) === '$' || getType(elem[name]) !== NUL || getType(elem[ATTR_DUP[name]]) !== NUL)) {
						// direct setting of existing properties
						elem[name] = value;

						// also set duplicated properties
						name = ATTR_DUP[name];
						if (name) {
							elem[name] = value;
						}

					} else if (ATTR_BOOL[name.toLowerCase()]) {
						if (value) {
							// boolean attributes
							elem.setAttribute(name, name);

							// also set duplicated attributes
							name = ATTR_DUP[name];
							if (name) {
								elem.setAttribute(name, name);
							}
						}

					} else {
						// http://www.quirksmode.org/dom/w3c_core.html#attributes

						// custom and 'data-*' attributes
						elem.setAttribute(name, value);

						// also set duplicated attributes
						name = ATTR_DUP[name];
						if (name) {
							elem.setAttribute(name, value);
						}
					}
				}
			}
		}
		return elem;
	};

	/**
	 * Appends a child to an element
	 * 
	 * @private
	 * @param {Node} elem The parent element
	 * @param {Node} child The child
	 */
	var appendDOM = function(elem, child) {
		if (child) {
			var tag = (elem.tagName||'').toLowerCase();
			if (elem.nodeType === 8) { // comment
				if (child.nodeType === 3) { // text node
					elem.nodeValue += child.nodeValue;
				}
			} else if (tag === 'table' && elem.tBodies) {
				if (!child.tagName) {
					// must unwrap documentFragment for tables
					if (child.nodeType === 11) {
						while (child.firstChild) {
							appendDOM(elem, child.removeChild(child.firstChild));
						}
					}
					return;
				}

				// in IE must explicitly nest TRs in TBODY
				var childTag = child.tagName.toLowerCase();// child tagName
				if (childTag && childTag !== 'tbody' && childTag !== 'thead') {
					// insert in last tbody
					var tBody = elem.tBodies.length > 0 ? elem.tBodies[elem.tBodies.length-1] : null;
					if (!tBody) {
						tBody = createElement(childTag === 'th' ? 'thead' : 'tbody');
						elem.appendChild(tBody);
					}
					tBody.appendChild(child);
				} else if (elem.canHaveChildren !== false) {
					elem.appendChild(child);
				}

			} else if (tag === 'style' && document.createStyleSheet) {
				// IE requires this interface for styles
				elem.cssText = child;

			} else if (elem.canHaveChildren !== false) {
				elem.appendChild(child);

			} else if (tag === 'object' &&
				child.tagName && child.tagName.toLowerCase() === 'param') {
					// IE-only path
					try {
						elem.appendChild(child);
					} catch (ex1) {}
					try {
						if (elem.object) {
							elem.object[child.name] = child.value;
						}
					} catch (ex2) {}
			}
		}
	};

	/**
	 * Tests a node for whitespace
	 * 
	 * @private
	 * @param {Node} node The node
	 * @return {boolean}
	 */
	var isWhitespace = function(node) {
		return !!node && (node.nodeType === 3) && (!node.nodeValue || !/\S/.exec(node.nodeValue));
	};

	/**
	 * Trims whitespace pattern from the text node
	 * 
	 * @private
	 * @param {Node} node The node
	 */
	var trimPattern = function(node, pattern) {
		if (!!node && (node.nodeType === 3) && pattern.exec(node.nodeValue)) {
			node.nodeValue = node.nodeValue.replace(pattern, '');
		}
	};

	/**
	 * Removes leading and trailing whitespace nodes
	 * 
	 * @private
	 * @param {Node} elem The node
	 */
	var trimWhitespace = function(elem) {
		if (elem) {
			while (isWhitespace(elem.firstChild)) {
				// trim leading whitespace text nodes
				elem.removeChild(elem.firstChild);
			}
			// trim leading whitespace text
			trimPattern(elem.firstChild, LEADING);
			while (isWhitespace(elem.lastChild)) {
				// trim trailing whitespace text nodes
				elem.removeChild(elem.lastChild);
			}
			// trim trailing whitespace text
			trimPattern(elem.lastChild, TRAILING);
		}
	};

	/**
	 * Converts the markup to DOM nodes
	 * 
	 * @private
	 * @param {string|Markup} value The node
	 * @return {Node}
	 */
	var toDOM = function(value) {
		var wrapper = createElement('div');
		wrapper.innerHTML = ''+value;
	
		// trim extraneous whitespace
		trimWhitespace(wrapper);

		// eliminate wrapper for single nodes
		if (wrapper.childNodes.length === 1) {
			return wrapper.firstChild;
		}

		// create a document fragment to hold elements
		var frag = createElement('');
		while (wrapper.firstChild) {
			frag.appendChild(wrapper.firstChild);
		}
		return frag;
	};

	/**
	 * Default error handler
	 * @param {Error} ex
	 * @return {Node}
	 */
	var onError = function(ex) {
		return document.createTextNode('['+ex+']');
	};

	/* override this to perform custom error handling during binding */
	JsonML.onerror = null;

	/**
	 * also used by JsonML.BST
	 * @param {Node} elem
	 * @param {*} jml
	 * @param {function} filter
	 * @return {Node}
	 */
	var patch = JsonML.patch = function(elem, jml, filter) {

		for (var i=1; i<jml.length; i++) {
			if (isArray(jml[i]) || 'string' === typeof jml[i]) {
				// append children
				appendDOM(elem, toHTML(jml[i], filter));

			} else if (isMarkup(jml[i])) {
				appendDOM(elem, toDOM(jml[i].value));

			} else if ('object' === typeof jml[i] && jml[i] !== null && elem.nodeType === 1) {
				// add attributes
				elem = addAttributes(elem, jml[i]);
			}
		}

		return elem;
	};

	/**
	 * Main builder entry point
	 * @param {string|array} jml
	 * @param {function} filter
	 * @return {Node}
	 */
	var toHTML = JsonML.toHTML = function(jml, filter) {
		try {
			if (!jml) {
				return null;
			}
			if ('string' === typeof jml) {
				return document.createTextNode(jml);
			}
			if (isMarkup(jml)) {
				return toDOM(jml.value);
			}
			if (!isArray(jml) || ('string' !== typeof jml[0])) {
				throw new SyntaxError('invalid JsonML');
			}

			var tagName = jml[0]; // tagName
			if (!tagName) {
				// correctly handle a list of JsonML trees
				// create a document fragment to hold elements
				var frag = createElement('');
				for (var i=1; i<jml.length; i++) {
					appendDOM(frag, toHTML(jml[i], filter));
				}

				// trim extraneous whitespace
				trimWhitespace(frag);

				// eliminate wrapper for single nodes
				if (frag.childNodes.length === 1) {
					return frag.firstChild;
				}
				return frag;
			}

			if (tagName.toLowerCase() === 'style' && document.createStyleSheet) {
				// IE requires this interface for styles
				patch(document.createStyleSheet(), jml, filter);
				// in IE styles are effective immediately
				return null;
			}

			var elem = patch(createElement(tagName), jml, filter);

			// trim extraneous whitespace
			trimWhitespace(elem);
			return (elem && isFunction(filter)) ? filter(elem) : elem;
		} catch (ex) {
			try {
				// handle error with complete context
				var err = isFunction(JsonML.onerror) ? JsonML.onerror : onError;
				return err(ex, jml, filter);
			} catch (ex2) {
				return document.createTextNode('['+ex2+']');
			}
		}
	};

	/**
	 * Not super efficient.
	 * TODO: port render.js from DUEL
	 * @param {string|array} jml JsonML structure
	 * @return {string} HTML text
	 */
	JsonML.toHTMLText = function(jml, filter) {
		var elem = toHTML(jml, filter);
		if (elem.outerHTML) {
			return elem.outerHTML;
		}

		var parent = createElement('div');
		parent.appendChild(elem);

		var html = parent.innerHTML;
		parent.removeChild(elem);

		return html;
	};

})(JsonML, document);



/*

xxx = JsonML.fromHTML(document.body);
xxx.toString();
console.dir(xxx);

yyy = JsonML.toHTML(xxx);
document.body.children[3].innerHTML = yyy.outerHTML;
console.log(yyy);  

var xsl;
$.ajax({
            type: "GET",
            url: "jsonml.xslt",
            dataType: "xml",
            success: function(xmlResponse) { alert(xmlResponse); xsl = xmlResponse; }
        });
		
-or -

xhttp=new XMLHttpRequest();
xhttp.open("GET","http://127.0.0.1:8080/lib/jsonml.xslt",true);
xhttp.send();
// wait...
xsl = xhttp.responseXML;


xsltProcessor = new XSLTProcessor();
xsltProcessor.importStylesheet(xsl);
resultDocument = xsltProcessor.transformToFragment(document.body, document);
document.body.outerHTML = resultDocument.textContent;



document.body.innerHTML

ML = ["body","\n",["h1","Index of /xxx"],"\n",["ul",["li",["a",{"href":"/"}," Parent Directory"]],"\n",["li",["a",{"href":"Admin/"}," Admin/"]],"\n",["li",["a",{"href":"Atraci-master/"}," Atraci-master/"]],"\n",["li",["a",{"href":"CRMs/"}," CRMs/"]],"\n",["li",["a",{"href":"HTML5%20audio/"}," HTML5 audio/"]],"\n",["li",["a",{"href":"Index%20of%20xxx.URL"}," Index of xxx.URL"]],"\n",["li",["a",{"href":"ScrapBook%20-%20Shortcut.lnk"}," ScrapBook - Shortcut.lnk"]],"\n",["li",["a",{"href":"Squire-master/"}," Squire-master/"]],"\n",["li",["a",{"href":"TEST/"}," TEST/"]],"\n",["li",["a",{"href":"beaver/"}," beaver/"]],"\n",["li",["a",{"href":"debug_utils-master/"}," debug_utils-master/"]],"\n",["li",["a",{"href":"ditto-master/"}," ditto-master/"]],"\n",["li",["a",{"href":"foundation-5.5.1/"}," foundation-5.5.1/"]],"\n",["li",["a",{"href":"froont-page/"}," froont-page/"]],"\n",["li",["a",{"href":"html-to-markdown-master/"}," html-to-markdown-master/"]],"\n",["li",["a",{"href":"jq-console-master/"}," jq-console-master/"]],"\n",["li",["a",{"href":"libs/"}," libs/"]],"\n",["li",["a",{"href":"loading.gif"}," loading.gif"]],"\n",["li",["a",{"href":"luarocks/"}," luarocks/"]],"\n",["li",["a",{"href":"marked-master(markdown)/"}," marked-master(markdown)/"]],"\n",["li",["a",{"href":"materialize-master/"}," materialize-master/"]],"\n",["li",["a",{"href":"mdwiki-0.6.2/"}," mdwiki-0.6.2/"]],"\n",["li",["a",{"href":"multiple-url-shortener.php"}," multiple-url-shortener.php"]],"\n",["li",["a",{"href":"node-webkit%20(nw)/"}," node-webkit (nw)/"]],"\n",["li",["a",{"href":"nonResponsive/"}," nonResponsive/"]],"\n",["li",["a",{"href":"note%20(2).html"}," note (2).html"]],"\n",["li",["a",{"href":"note.html"}," note.html"]],"\n",["li",["a",{"href":"note_files/"}," note_files/"]],"\n",["li",["a",{"href":"polymer/"}," polymer/"]],"\n",["li",["a",{"href":"responsive/"}," responsive/"]],"\n",["li",["a",{"href":"showdown-master/"}," showdown-master/"]],"\n",["li",["a",{"href":"upndown-master(markdown)/"}," upndown-master(markdown)/"]],"\n",["li",["a",{"href":"web-starter-kit-master/"}," web-starter-kit-master/"]],"\n"],"\n\n"];

var hhh = JsonML.toHTML(ML);
document.body.outerHTML = hhh.outerHTML;


hhh.outerHTML

*/

var xsl =	`<?xml version="1.0" encoding="utf-8" ?>
<!--
	jsonml.xslt

	Created: 2006-11-15-0551
	Modified: 2009-02-14-0927

	Copyright (c)2006-2009 Stephen M. McKamey
	Distributed under The MIT License: http://jsonml.org/license

	This transformation converts any XML document into JsonML.
	It omits processing-instructions and comment-nodes.
	
	To enable comment-nodes to be emitted as JavaScript comments,
	uncomment the Comment() template.
-->
<xsl:stylesheet version="1.0"
				xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="text"
				media-type="application/json"
				encoding="UTF-8"
				indent="no"
				omit-xml-declaration="yes" />

	<!-- constants -->
	<xsl:variable name="XHTML"
				  select="'http://www.w3.org/1999/xhtml'" />

	<xsl:variable name="START_ELEM"
				  select="'['" />

	<xsl:variable name="END_ELEM"
				  select="']'" />

	<xsl:variable name="VALUE_DELIM"
				  select="','" />

	<xsl:variable name="START_ATTRIB"
				  select="'{'" />

	<xsl:variable name="END_ATTRIB"
				  select="'}'" />

	<xsl:variable name="NAME_DELIM"
				  select="':'" />

	<xsl:variable name="STRING_DELIM"
				  select="'&quot;'" />

	<xsl:variable name="START_COMMENT"
				  select="'/*'" />

	<xsl:variable name="END_COMMENT"
				  select="'*/'" />

	<!-- root-node -->
	<xsl:template match="/">
		<xsl:apply-templates select="*" />
	</xsl:template>

	<!-- comments -->
	<xsl:template match="comment()">
	<!-- uncomment to support JSON comments -->
	<!--
		<xsl:value-of select="$START_COMMENT" />

		<xsl:value-of select="."
					  disable-output-escaping="yes" />

		<xsl:value-of select="$END_COMMENT" />
	-->
	</xsl:template>

	<!-- elements -->
	<xsl:template match="*">
		<xsl:value-of select="$START_ELEM" />

		<!-- tag-name string -->
		<xsl:value-of select="$STRING_DELIM" />
		<xsl:choose>
			<xsl:when test="namespace-uri()=$XHTML">
				<xsl:value-of select="local-name()" />
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="name()" />
			</xsl:otherwise>
		</xsl:choose>
		<xsl:value-of select="$STRING_DELIM" />

		<!-- attribute object -->
		<xsl:if test="count(@*)>0">
			<xsl:value-of select="$VALUE_DELIM" />
			<xsl:value-of select="$START_ATTRIB" />
			<xsl:for-each select="@*">
				<xsl:if test="position()>1">
					<xsl:value-of select="$VALUE_DELIM" />
				</xsl:if>
				<xsl:apply-templates select="." />
			</xsl:for-each>
			<xsl:value-of select="$END_ATTRIB" />
		</xsl:if>

		<!-- child elements and text-nodes -->
		<xsl:for-each select="*|text()">
			<xsl:value-of select="$VALUE_DELIM" />
			<xsl:apply-templates select="." />
		</xsl:for-each>

		<xsl:value-of select="$END_ELEM" />
	</xsl:template>

	<!-- text-nodes -->
	<xsl:template match="text()">
		<xsl:call-template name="escape-string">
			<xsl:with-param name="value"
							select="." />
		</xsl:call-template>
	</xsl:template>

	<!-- attributes -->
	<xsl:template match="@*">
		<xsl:value-of select="$STRING_DELIM" />
		<xsl:choose>
			<xsl:when test="namespace-uri()=$XHTML">
				<xsl:value-of select="local-name()" />
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="name()" />
			</xsl:otherwise>
		</xsl:choose>
		<xsl:value-of select="$STRING_DELIM" />

		<xsl:value-of select="$NAME_DELIM" />

		<xsl:call-template name="escape-string">
			<xsl:with-param name="value"
							select="." />
		</xsl:call-template>

	</xsl:template>

	<!-- escape-string: quotes and escapes -->
	<xsl:template name="escape-string">
		<xsl:param name="value" />

		<xsl:value-of select="$STRING_DELIM" />

		<xsl:if test="string-length($value)>0">
			<xsl:variable name="escaped-whacks">
				<!-- escape backslashes -->
				<xsl:call-template name="string-replace">
					<xsl:with-param name="value"
									select="$value" />
					<xsl:with-param name="find"
									select="'\'" />
					<xsl:with-param name="replace"
									select="'\\'" />
				</xsl:call-template>
			</xsl:variable>

			<xsl:variable name="escaped-LF">
				<!-- escape line feeds -->
				<xsl:call-template name="string-replace">
					<xsl:with-param name="value"
									select="$escaped-whacks" />
					<xsl:with-param name="find"
									select="'&#x0A;'" />
					<xsl:with-param name="replace"
									select="'\n'" />
				</xsl:call-template>
			</xsl:variable>

			<xsl:variable name="escaped-CR">
				<!-- escape carriage returns -->
				<xsl:call-template name="string-replace">
					<xsl:with-param name="value"
									select="$escaped-LF" />
					<xsl:with-param name="find"
									select="'&#x0D;'" />
					<xsl:with-param name="replace"
									select="'\r'" />
				</xsl:call-template>
			</xsl:variable>

			<xsl:variable name="escaped-tabs">
				<!-- escape tabs -->
				<xsl:call-template name="string-replace">
					<xsl:with-param name="value"
									select="$escaped-CR" />
					<xsl:with-param name="find"
									select="'&#x09;'" />
					<xsl:with-param name="replace"
									select="'\t'" />
				</xsl:call-template>
			</xsl:variable>

			<!-- escape quotes -->
			<xsl:call-template name="string-replace">
				<xsl:with-param name="value"
								select="$escaped-tabs" />
				<xsl:with-param name="find"
								select="'&quot;'" />
				<xsl:with-param name="replace"
								select="'\&quot;'" />
			</xsl:call-template>
		</xsl:if>

		<xsl:value-of select="$STRING_DELIM" />
	</xsl:template>

	<!-- string-replace: replaces occurances of one string with another -->
	<xsl:template name="string-replace">
		<xsl:param name="value" />
		<xsl:param name="find" />
		<xsl:param name="replace" />

		<xsl:choose>
			<xsl:when test="contains($value,$find)">
				<!-- replace and call recursively on next -->
				<xsl:value-of select="substring-before($value,$find)"
							  disable-output-escaping="yes" />
				<xsl:value-of select="$replace"
							  disable-output-escaping="yes" />
				<xsl:call-template name="string-replace">
					<xsl:with-param name="value"
									select="substring-after($value,$find)" />
					<xsl:with-param name="find"
									select="$find" />
					<xsl:with-param name="replace"
									select="$replace" />
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<!-- no replacement necessary -->
				<xsl:value-of select="$value"
							  disable-output-escaping="yes" />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

</xsl:stylesheet>`;

/*

var parser = new DOMParser;
var xmlDoc = parser.parseFromString(xsl, "text/xml");
	
xsltProcessor = new XSLTProcessor();
xsltProcessor.importStylesheet(xmlDoc);


var newDocument = document.implementation.createHTMLDocument("", "html", null);
var el = newDocument.createElement("body")
var z = newDocument.documentElement.appendChild(el);
newDocument.body.outerHTML = document.body.outerHTML;
resultDocument = xsltProcessor.transformToFragment(newDocument.body, newDocument);
resultDocument = xsltProcessor.transformToDocument(newDocument);
//////////

var processor = new XSLTProcessor();
var testTransform = document.implementation.createDocument("", "test", null);
// just an example to get a transform into a script as a DOM
// XMLDocument.load is asynchronous, so all processing happens in the 
// onload handler
testTransform.addEventListener("load", onload, false);
testTransform.load("jsonml.xslt");
function onload() {
  processor.importStylesheet(testTransform);
	alert("loaded")
}
var newDocument = processor.transformToDocument(testTransform);

var ownerDocument = document.implementation.createDocument("", "test", null);
var newFragment = processor.transformToFragment(testTransform, ownerDocument);


$("body").html(xsl)

*/





    