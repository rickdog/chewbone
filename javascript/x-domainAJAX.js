// callback is optional
function getXML(theURL, callback)
{
	/**
	 * Original jQuery.ajax mid - CROSS DOMAIN AJAX 
	 * @author James Padolsey (http://james.padolsey.com)
	 * @updated 12-JAN-10
	 * @info http://james.padolsey.com/javascript/cross-domain-requests-with-jquery/
	 * source: https://raw.github.com/padolsey/jquery.fn/master/cross-domain-ajax/jquery.xdomainajax.js
   *
   * This version adds a fix for correctly handling format:xml
	 */
	jQuery.ajax = (function(_ajax)
	{
		var protocol = location.protocol,
			hostname = location.hostname,
			exRegex = RegExp(protocol + '//' + hostname),
			YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
			query = 'select * from html where url="{URL}" and xpath="*"';

		function isExternal(url)
		{
			return !exRegex.test(url) && /:\/\//.test(url);
		}

		return function(o)
		{
			var url = o.url;
			if (o.dataType == 'xml')   // @rickdog - fix for XML
			   query = 'select * from xml where url="{URL}"';	// XML
			if ( /get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url) )
			{
				// Manipulate options so that JSONP-x request is made to YQL
				o.url = YQL;
				o.dataType = 'json';
				o.data = {
					q: query.replace('{URL}', url + (o.data ? (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data) : '')),
					format: 'xml'
				};

				// Since it's a JSONP request
				// complete === success
				if (!o.success && o.complete) {
					o.success = o.complete;
					delete o.complete;
				}

				o.success = (function(_success)
				{
					return function(data)
					{
						if (_success) {
							// Fake XHR callback.
							_success.call(this, {
								// YQL screws with <script>s, Get rid of them
								responseText: (data.results[0] || '')
									.replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
							}, 'success');
						}
					};
				})(o.success);
			}
			return _ajax.apply(this, arguments); // not special, use base Jquery ajax
		};
	})(jQuery.ajax);


	return $.ajax({
		url: theURL,
		type: 'GET',
		dataType: 'xml',
		success: function(res) {
			// var text = res.responseText;
			// .. then you can manipulate your text as you wish
			callback ? callback(res) : undefined;
		}
	})
};


/*
getXML("http://feeds.feedburner.com/leaverou",
  function(response)
  {
    console.log(response.responseText);
  }
)

// or 

getXML("xhttp://xfeeds.feedburner.com/leaverou")
.success(function(response, statusText, xhrObj) {
  console.log(response, statusText, xhrObj);
  if (response.results.length == 1)
  {
   // console.log(response.results[0]);
  }
})
.error(function(xhrObj, textStatus, err) {
  console.log("error", xhrObj, textStatus, err);
});
*/