// https://gist.github.com/colllin/5409954
// Use jQuery to find the shortest selector for a given element in the DOM.

jQuery(function ($) {
  // returns an array of the potential selector components for the first element in the jQuery object. IDs, classes, and tagNames only.
  var getSelectorComponents = function ($el) {
    var components = [
    ]; 
    var id = $el.attr('id');
    if (typeof (id) != 'undefined' && /[^\s]/.test(id)) {
      components.push('#' + id);
    }
    var classes = $el.attr('class');
    if (typeof (classes) != 'undefined' && /[^\s]/.test(classes)) {
      classes = '.' + classes.split(/\s+/).join(' .');
      components = components.concat(classes.split(' '));
    }
    components.push($el[0].tagName);
    return components;
  };
  var getSelectorFromComponents = function (components) {
    return components[components.length - 1] + components.slice(0, - 1).join('');
  };
  $(document.body).on('click', function (event) {
    event.preventDefault();
    // handle deselection of any previously selected elements
    // (for now, only allows selection of one element at a time)
    var selectedTag = 'cdo-selected';
    $('.' + selectedTag).removeClass(selectedTag).css('box-shadow', 'none');
    var $target = $(event.target).css('box-shadow', '0 0 0 4px rgba(255,100,0,.5)');
    // 2 step process
    // Step 1 - find the closest unique context selector, i.e. `#main .special-container ul`
    // Step 2 - invent a creative selector within that context (if necessary), i.e. `li:nth-child(2) a`
    // Step 1.
    // path will be an array of arrays. for each level of the DOM hierarchy between the body and our target element (inclusive),
    // there will be an array containing the potential selector components we can use for that element
    // i.e. for this container within the DOM path: <div id="main" class="column left blue"></div>
    // we will have this element in our path array: ['#main', '.column', '.left', '.blue', 'DIV']
    // from which we can construct various selectors to test for uniqueness
    // NOTE: because the jQuery .parents() method naturally returns the element ancestors ordered from the inside out, the path array is reversed from the norm
    var path = [
    ];
    $target.parents().each(function () {
      path.push(getSelectorComponents($(this)));
    });
    path.splice(0, 0, getSelectorComponents($target));
    var uniqueContextPath = [
    ];
    // Find the first element
    // repeat this step to construct a path of unique contexts
    var i = 0;
    var $context = $(document.body);
    while (path.length > 0 && i < path.length) {
      var $testQuery;
      // find the nearest parent that has a unique selector (within any previously determined context, otherwise within the DOM)
      for (i = 0; i < path.length; i++) {
        $testQuery = $(getSelectorFromComponents(path[i]), $context);
        if ($testQuery.length == 1) {
          break;
        }
      }
      if (i < path.length) {
        $context = $testQuery;
        uniqueContextPath.push(path[i]);
        path.splice(i, path.length);
        // reset i to make sure we repeat the loop
        i = 0;
      }
    }
    var contextSelector = $(uniqueContextPath).map(function () {
      return getSelectorFromComponents(this);
    }).get().join(' ');
    console.log(contextSelector);
    console.log($(contextSelector).length);
    var $message = $('#message');
    if ($message.length == 0) {
      $message = $('<div id="message" style="position:fixed; left: 0; right: 0; bottom: 0; background:rgba(0,0,0,.7); color: #fff; font-size:15px; text-align: center; padding:20px; font-family:Helvetica;"/>');
      $(document.body).append($message);
    }
    var message = 'Closest selector using only ID, class, tagName: <strong style="color:#f60;">' + contextSelector + '</strong>';
    message += '<br>100% match? <strong style="color:#f60;">' + (path.length == 0 ? 'YES' : 'NO') + '</strong>, Remaining DOM levels to narrow the match: <strong style="color:#f60;">' + path.length + '</strong>';
    $message.html(message);
    // Step 2.
    // Find a creative selector using :nth-child(). Other kinds of selectors could be included later.
    if (path.length > 0) {
      // TODO
    }
    // tag the element so we can find it later

    $target.addClass(selectedTag);
  });
});
