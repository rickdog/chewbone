// collect links from mozilla bookmarks file my tags property

// for entire file
var html = '';
/*
var html = '' +
'<!DOCTYPE netscape-bookmark-file-1>' +
'<!--' +
' This is an automatically generated file.' +
'       It will be read and overwritten.' +
'-->' +
'<html>' +
'    <head>' +
'        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>' +
'         <title>' +
'            Bookmarks' +
'        </title>' +
'    </head>' +
'<body>' +
'    <h1>' +
'        Bookmarks Menu' +
'    </h1>' +
'    <dl>';

// for section
html += '' +
'<dt>' +
  '<h3 unfiled_bookmarks_folder="true" last_modified="1427447875" add_date="1340738558">warez</h3>' +
  '<dl>' +
    '<p></p>';
*/
var res = [document.querySelectorAll("a[tags='metal']"), 
           document.querySelectorAll("a[tags^='metal,']"), 
           document.querySelectorAll("a[tags$=',metal']"), 
           document.querySelectorAll("a[tags*=',metal,']")];

[].slice.call(res).forEach(function (nl)
{
[].slice.call(nl).forEach(function (l)
{
    //if (l.attributes.tags.value.match(/.*recipe/) == null)
        html += l.parentNode.outerHTML;
})});

/*
// end section
html += '</dl><p></p></dt>';

// end file
html += '</dl></body></html>';
*/

html


decodeURIComponent('https://papaly.com/items -H Host: papaly.com -H User-Agent: Mozilla/5.0 (Windows NT 6.0; WOW64; rv:36.0) Gecko/20100101 Firefox/36.0 -H Accept: */* -H Accept-Language: en-US,en;q=0.5 --compressed -H Content-Type: application/x-www-form-urlencoded; charset=UTF-8 -H X-Requested-With: XMLHttpRequest -H Referer: https://papaly.com/ -H Cookie: _ga=GA1.2.340415187.1427507956; remember_user_token=BAhbB1sGaQLL%2F0kiIiQyYSQxMCRSNnpZRnhVandXRlpRZUNUNk9hU011BjoGRVQ%3D--3c450596202d75617cdb3822a69ee0654ebaf6a1; remember_user_token=BAhbB1sGaQLL%2F0kiIiQyYSQxMCRSNnpZRnhVandXRlpRZUNUNk9hU011BjoGRVQ%3D--3c450596202d75617cdb3822a69ee0654ebaf6a1; _papaly_session=BAh7D0kiD3Nlc3Npb25faWQGOgZFVEkiJTNjMWEzMTUxMTcxMDkwODFjYzg2OGE1YmVlNzhiZmI1BjsAVEkiFmNvbnRyb2xsZXJfYWN0aW9uBjsARkkiGCgndXNlcnMnLCdzaG93X3YyJykGOwBUSSIdY29udHJvbGxlcl9hY3Rpb25fcGFyYW1zBjsARkkiB3t9BjsARkkiGXdhcmRlbi51c2VyLnVzZXIua2V5BjsAVFsHWwZpAsv%2FSSIiJDJhJDEwJFI2ellGeFVqd1dGWlFlQ1Q2T2FTTXUGOwBUSSIQX2NzcmZfdG9rZW4GOwBGSSIxS1IvbnpTNEY5WFhiZUNJaThZMVJZRTVqbkdrVUFYdzBuN21vTlhKM1dzVT0GOwBGSSIMcmVmZXJlcgY7AEZJIhhodHRwczovL3BhcGFseS5jb20vBjsARkkiDWNhbXBhaWduBjsARkkiCHdlYgY7AFRJIhlsYXN0X2Jyb3dzZXJfaW5mb19hdAY7AEZJdToJVGltZQ2iyxyAiXbSQAo6CXpvbmVJIghQRFQGOwBUOg1uYW5vX251bWkCQwM6DW5hbm9fZGVuaQY6DXN1Ym1pY3JvIgeDUDoLb2Zmc2V0af6QnUkiDGhpc3RvcnkGOwBGWwZbCzoKYm9hcmQ6C3VwZGF0ZUkiJWM2NTQyYzczMmU0NTQzMDFhYzIyNjRkN2RiZWMzYWU0BjsAVHsMSSIJbmFtZQY7AFRJIgptZXRhbAY7AFRJIgpjb2xvcgY7AFRpA0REREkiDmlzX3B1YmxpYwY7AFRGSSINcG9zaXRpb24GOwBUaQBJIg9pc19jcmF3bGVkBjsAVEZJIhBkZXNjcmlwdGlvbgY7AFQwSSINa2V5d29yZHMGOwBUMDBsKwddYBdVSSITdXNlcl9yZXR1cm5fdG8GOwBGSSIGLwY7AFQ%3D--22a0098a8ea0c2624df10eec0d28dfa96897696d; sc_is_visitor_unique=rx10027427.1427559715.C5C2967C3CF04F1C389B412340B4DAE3.3.3.3.3.2.1.1.1.1 -H Connection: keep-alive -H Pragma: no-cache -H Cache-Control: no-cache --data authenticity_token=KR%2FnzS4F9XXbeCIi8Y1RYE5jnGkUAXw0n7moNXJ3WsU%3D&item%5Bcategory_index%5D=746e4cb78ae7424c9b4ce2324eed71ce&item%5Bposition%5D=0&item%5Bname%5D=Google&item%5Bitem_type%5D=item_bookmark&from=url&item%5Burl%5D=http%3A%2F%2Fgoogle.com');

/*
https://papaly.com/items?authenticity_token=KR/nzS4F9XXbeCIi8Y1RYE5jnGkUAXw0n7moNXJ3WsU=&item[category_index]=746e4cb78ae7424c9b4ce2324eed71ce&item[position]=0&item[name]=Google&item[item_type]=item_bookmark&from=url&item[url]=http://google.com
*/
/*
CSRF_TOKEN= LA6mfMplLEgbHeNzZHcUCzp6Uj04LNrOJWlab5l2SIk=
LA6mfMplLEgbHeNzZHcUCzp6Uj04LNrOJWlab5l2SIk=
"LA6mfMplLEgbHeNzZHcUCzp6Uj04LNrOJWlab5l2SIk="
99a4f96f


/*
@Scratchpad/1:1:6

*/*/

/*
Exception: unterminated regular expression literal
@Scratchpad/1:1
*/