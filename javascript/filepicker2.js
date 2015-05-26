(function()
{
    var start=function()
    {
    //alert("loaded");
    };
    var s=document.createElement('script');
    s.src='//raw.github.com/rickdog/test/master/filepicker.io.js';
    if(s.addEventListener)
    {
        s.addEventListener('load',start,false);
    }
    else
    {
        s.onreadystatechange=function()
        {
            if(this.readyState=='complete')
            {
                start();s=null;
            }
        }
    }
    s.type='text/javascript';
    document.getElementsByTagName('head')[0].appendChild(s);
})();

//javascript:(function(){var%20start=function(){};var%20s=document.createElement('script');s.src='//raw.github.com/rickdog/test/master/filepicker.io.js';if(s.addEventListener){s.addEventListener('load',start,false);}else{s.onreadystatechange=function(){if(this.readyState=='complete'){start();s=null;}}}s.type='text/javascript';document.getElementsByTagName('head')[0].appendChild(s);})();
//<a id='codeOut' href="javascript:(function(){var start=function(){};var s=document.createElement('script');s.src='//raw.github.com/rickdog/test/master/filepicker.io.js';if(s.addEventListener){s.addEventListener('load',start,false);}else{s.onreadystatechange=function(){if(this.readyState=='complete'){start();s=null;}}}s.type='text/javascript';document.getElementsByTagName('head')[0].appendChild(s);})();">filepicker</a>

//javascript:'<script type%3D"text%2Fjavascript" src%3D"https%3A%2F%2Fraw.github.com%2Frickdog%2Ftest%2Fmaster%2Ffilepicker.io.js"><%2Fscript>';
//javascript:(function(){var%20b=function(){doDialog()};if("undefined"==typeof%20filepicker){var%20a=document.createElement("script");a.src="http://api.filepicker.io/v1/filepicker.js";a.addEventListener?a.addEventListener("load",b,!1):a.onreadystatechange=function(){"complete"==this.readyState&&(doDialog(),a=null)};a.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(a)}else%20doDialog()})();function%20doDialog(){filepicker.setKey("A0b1GBdwgSyv6Pop9ZFNQz");filepicker.pick(function(b){})};