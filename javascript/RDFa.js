/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
void (function (u) {
  var s = document.createElement('a');
  var d = document;
  var b = d.body;
  
  s.href = u;
  s.text = 'RDFa'
  s.title = 'Parse RDFa from this page';
  s.target = '_blank';
  s.id = "rdfUri"
  
  var c = b.insertBefore(d.createElement('center'), b.firstChild);
  var dv = c.appendChild(d.createElement('div'));
  dv.style.backgroundColor = '#ECF4FC';
  dv.innerHTML = '<textarea rows=\'6\' cols=\'90\' id=\'txt\'></textarea><br>';
  //dv.style.height="100px";
  s.style.verticalAlign = "text-bottom";
  dv.appendChild(s);
  d.getElementById('txt').scrollIntoView();
 
  
  //d.getElementsByTagName('body')[0].appendChild(s);
}('http://www.w3.org/2012/pyRdfa/extract?format=xml&uri=referer'))
