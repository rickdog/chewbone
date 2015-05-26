// example of all jQuery deferred/Promise

var jqxhr = $.ajax( {
  url: "note.html", 
  dataType:"html"
} )
  .complete(function(jqXHR, textStatus) {
    // called when the request finishes (after success and error callbacks are executed).
    // called on both success and error, .done/.complete not called on error
    console.log( "complete:", "jqXHR:",jqXHR, "textStatus:",textStatus);
  })
  .fail(function( jqXHR, textStatus, errorThrown) {  // same as error
    console.log( "fail:", "jqXHR",jqXHR, "textStatus:",textStatus, "errorThrown:",errorThrown);
  })
  .error(function( jqXHR, textStatus, errorThrown) { // same as .fail
    console.log( "error:", "jqXHR",jqXHR, "textStatus:",textStatus, "errorThrown:",errorThrown);
  })
  .always(function(response, textStatus, jqXHR) {  // same as .success & .done on success, same as .fail & .error on error
    console.log( "always:", "response:",response, "textStatus:",textStatus, "jqXHR:",jqXHR);
    // jqHXR is errorThrown on error
  })
  .success(function(response, textStatus, jqXHR) {  // same as .done
    console.log( "success:", "response:",response, "textStatus:",textStatus, "jqXHR:",jqXHR);
  })
  .then(function(response, textStatus, jqXHR) {  // same as .done
    console.log( "then:", "response:",response, "textStatus:",textStatus, "jqXHR:",jqXHR);
  })
  .done(function(response, textStatus, jqXHR) {  // same as .success
    console.log( "done:", "response:",response, "textStatus:",textStatus, "jqXHR:",jqXHR);
  });
 