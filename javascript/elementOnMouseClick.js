/* get element at mouse click */

if (window.jQuery)
{

        $(document.body).bind('click', function(e) {
            e.preventDefault();
            var elem = document.elementFromPoint(e.clientX, e.clientY);
            console.log("0", elem);
        });
}
else {
       document.body.onclick = function(e) {
            e.preventDefault();
            var elem = document.elementFromPoint(e.clientX, e.clientY);
            console.log("1", elem);
        };
}