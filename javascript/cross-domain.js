/**
 * jQuery.ajax mid - CROSS DOMAIN AJAX 
 * ---
 * @author James Padolsey (http://james.padolsey.com)
 * @version 0.11
 * @updated 12-JAN-10
 * ---
 * Note: Read the README!
 * ---
 * @info http://james.padolsey.com/javascript/cross-domain-requests-with-jquery/
 * source: https://raw.github.com/padolsey/jquery.fn/master/cross-domain-ajax/jquery.xdomainajax.js
 */

jQuery.ajax = (function(_ajax){
    
    var protocol = location.protocol,
        hostname = location.hostname,
        exRegex = RegExp(protocol + '//' + hostname),
        YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
        query = 'select * from html where url="{URL}" and xpath="*"';
    function isExternal(url) {
        return !exRegex.test(url) && /:\/\//.test(url);
    }
    
    return function(o) {

        var url = o.url;
        if (o.dataType == 'xml')   // @rickdog - this works better for XML
           query = 'select * from xml where url="{URL}"';	// XML

        if ( /get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url) ) {
            
            // Manipulate options so that JSONP-x request is made to YQL
            
            o.url = YQL;
            o.dataType = 'json';
            
            o.data = {
                q: query.replace(
                    '{URL}',
                    url + (o.data ?
                        (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data)
                    : '')
                ),
                format: 'xml'
            };
            
            // Since it's a JSONP request
            // complete === success
            if (!o.success && o.complete) {
                o.success = o.complete;
                delete o.complete;
            }
            
            o.success = (function(_success){
                return function(data) {
                    
                    if (_success) {
                        // Fake XHR callback.
                        _success.call(this, {
                            responseText: (data.results[0] || '')
                                // YQL screws with <script>s
                                // Get rid of them
                                .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
                        }, 'success');
                    }
                    
                };
            })(o.success);
            
        }
        
        return _ajax.apply(this, arguments); // not special, use base Jquery ajax
        
    };
    
})(jQuery.ajax);


/*

$.ajax({
    url: "blob:http://localhost:8080/a6cf7580-3580-4f28-a7a6-a6d1d32e88ea",
    type: 'GET',
    dataType: 'text',
    success: function(res) {
        var text = res.responseText;
        // then you can manipulate your text as you wish
        console.log(res);
    }
});


function objToString (obj) {
    var str = '';
    for (var p in obj) {
       if (!(obj[p] instanceof Function))
            str += p + ':' + (obj[p]||'""') + ', ';
    }
    if (str.length)
       str = str.substr(0, str.length-2);
    return "{"+str+"}";
}


*/