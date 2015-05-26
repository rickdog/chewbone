/* jqml - jQuery JSONML Plugin - jsonML -> DOM
 * Author: Trevor Norris
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php 
 * https://github.com/trevnorris/jqml
 */

(function ($, document) {

	function createObj(elem) {
		// generate new fragment to store all generated
		var fragment = document.createDocumentFragment(),
			i = 0, j, selector;
		// check if is an element or array of elements
		if (typeof elem[0] == 'string') {
			selector = document.createElement(elem[0]);
			i = 1;
		};
		// loop through all elements in array
		for (; i < elem.length; i++) {
			// if array create new element
			if ($.isArray(elem[i]) && elem[i].length > 0) {
				// to simplify creation of templates, check for array of elements
				if ($.isArray(elem[i][0])) {
					for (j = 0; j < elem[i].length; j++) {
						fragment.appendChild(createObj(elem[i][j]));
					}
				} else {
					fragment.appendChild(createObj(elem[i]));
				}
			// if object set element attributes
			} else if ($.isPlainObject(elem[i])) {
				// trick to have jQuery assign attributes without creating a new jQuery object
				$.fn.attr.call([selector], elem[i], true);
			// if string or number insert text node
			} else if (typeof elem[i] == 'number' || typeof elem[i] == 'string') {
				fragment.appendChild(document.createTextNode(elem[i]));
			// if is an element append to fragment
			} else if (elem[i].nodeType) {
				fragment.appendChild(elem[i]);
			};
		};
		// if a selector is set append children and return
		if (selector) {
			// check if fragment has children to append (thanks IE)
			if (fragment.hasChildNodes()) {
				selector.appendChild(fragment);
			}
			return selector;
		};
		// otherwise return children of fragment
		return fragment.childNodes;
	};

	$.jqml = function (arg) {
		// return new jQuery object of elements
		return $(createObj(arg));
	};
}(jQuery, document));

/*

var xxx = $.jqml([ 'div', {
    'id' : 'mydiv',
    'class' : 'colors borders'
}, [ 'p', {}, "hello" ]]);
$("p").append(xxx);


// Say you need to create a template that prints table rows based on data received 
// from the server. Well, just create an immediately executing anonymous function in the JsonML for a quick little template.

var data = [1,2.3,"xxx"];
var zzz = $.jqml([ 'table', (function( data ) {
    var dataRows = [ 'tbody' ];
    for ( var i = 0; i < data.length; i++ ) {
        dataRows.push([ 'tr', [ 'td', data[ i ]]]);
    }
    return dataRows;
}( data ))]);
$("p").append(zzz);

// While passing an array of elements isn't technically correct JsonML,
// it makes for much easier templating.

var abc = $.jqml([ 'div', (function( strings ) {
    // notice there is no element in the first array item
    var ptags = [];
    for ( var i = 0; i < strings.length; i++ ) {
        ptags.push([ 'p', strings[i]]);
    }
    // see how ptags is incorrect JsonML, but so much easier:
    // ptags == [[ 'p', 'hi' ],[ 'p', 'yall!' ]]
    return ptags;
}([ 'hi', 'yall!' ]))]);
$("p").append(abc);

// The jQuery plugin also ties into the the jQuery event model. So you can attach events 
// to the elements as they're being created.

$.jqml([ 'nav', [ 'a', {
    'href' : '#link',
    'click' : function( e ) {
        e.preventDefault();
        // do more stuff
    }
}]]).prependTo( 'body' );