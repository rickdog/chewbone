/*
Getting a jQuery selector for an element
http://stackoverflow.com/questions/2068272/getting-a-jquery-selector-for-an-element/
http://stackoverflow.com/questions/5706837/get-unique-selector-of-element-in-jquery
	Usage:
	var path = $('#foo').getPath();
*/

// this one returns entire path including all id's and classes
jQuery.fn.extend({
	getPath: function( path ) {
		// The first time this function is called, path won't be defined.
		if ( typeof path == 'undefined' ) 
        path = '';

		// If this element is <html> we've reached the end of the path.
		if ( this.is('html') )
			return 'html' + path;

		// Add the element name.
		var cur = this.get(0).nodeName.toLowerCase();

		// Determine the IDs and path.
		var id    = this.attr('id'),
		    clazz = this.attr('class');


		// Add the #id if there is one.
		if ( typeof id != 'undefined' )
			cur += '#' + id;

		// Add any classes.
		if ( typeof clazz != 'undefined' )
			cur += '.' + clazz.split(/[\s\n]+/).join('.');

    // distinguish between multiple id-less elements.
    if (typeof id == 'undefined' && cur != 'body') {
        allSiblings = $(this).parent().children(cur);
        var index = allSiblings.index(this);// + 1;
        cur += ':eq(' + index + ')';
    }

		// Recurse up the DOM.
		return this.parent().getPath( ' > ' + cur + path );
	}
});


/*
// this one return entire path, uses :eq(n) only, doesn't use id or class
jQuery.fn.getPath = function () {
  if (this.length != 1) throw 'Requires one element.';
  var path, node = this;
  if (node[0].id) return "#" + node[0].id;
  while (node.length) {
    var realNode = node[0],
        name = realNode.localName;
    if (!name) break;
    name = name.toLowerCase();
    var parent = node.parent();
    var siblings = parent.children(name);
    if (siblings.length > 1) {
      name += ':eq(' + siblings.index(realNode) + ')';
    }
    path = name + (path ? '>' + path : '');
    node = parent;
  }
  return path;
};


// this one returns entire path using only :eq, ex.
// "BODY DIV:eq(30)  DIV:eq(5)  DIV:eq(0)  DIV:eq(1)  DIV:eq(26)  DIV:eq(47)  TABLE:eq(0)  TBODY:eq(0)  TR:eq(0)  TD:eq(1)  DIV:eq(0)  P:eq(0) "
jQuery.fn.ZZZgetPath = function () {
    var current = $(this);
    var path = new Array();
    var realpath = "BODY";
    while ($(current).prop("tagName") != "BODY") {
        var index = $(current).parent().find($(current).prop("tagName")).index($(current));
        var name = $(current).prop("tagName");
        var selector = " " + name + ":eq(" + index + ") ";
        path.push(selector);
        current = $(current).parent();
    }
    while (path.length != 0) {
        realpath += path.pop();
    }
    return realpath;
}

// this one is optimized, stopping when an id is found up the path (assumes id is only used once, which can't be enforced), ex.
// "div#answer-6836560>table>tbody>tr:eq(0)>td.answercell>div.post-text>p"
jQuery.fn.XXXgetPath = function () {
    if (this.length != 1) throw 'Requires one element.';

    var path, node = this;
    while (node.length) {
        var realNode = node[0];
        var name = (
            // IE9 and non-IE
            realNode.localName ||

            // IE <= 8
            realNode.tagName ||
            realNode.nodeName
        );

        // on IE8, nodeName is '#document' at the top level, but we don't need that
        if (!name || name == '#document') break;

        name = name.toLowerCase();
        if (realNode.id) {
            // As soon as an id is found, there's no need to specify more.
            return name + '#' + realNode.id + (path ? '>' + path : '');
        } else if (realNode.className) {
            name += '.' + realNode.className.split(/\s+/).join('.');
        }

        var parent = node.parent(), siblings = parent.children(name);
        if (siblings.length > 1) name += ':eq(' + siblings.index(node) + ')';
        path = name + (path ? '>' + path : '');

        node = parent;
    }

    return path;
};
*/



/* TEST
$(document).ready(function(){        
    $(document.body).bind('click', function(e) {
        e.preventDefault();
        var elem = document.elementFromPoint(e.clientX, e.clientY);
        var path = $(elem).getPath();
				console.log(e);
				console.log(elem);
				console.log("", path);
				$(path).css("border", "2px solid red");
    });
});
*/