
function logQuery(qry, attr)
{
  var ret = [];
  console.groupCollapsed("logQuery", qry, attr);
  try
  {
    [].slice.call(document.querySelectorAll(qry)).forEach(function (node) 
    {
        if (attr) {
          console.dir(node[attr]);
          ret.push(node[attr]);
        }
        else {
          console.dir(node);
          ret.push(node);
        }
    })
  } catch(E) {console.log(E)}
  console.groupEnd();
  return ret;
};

function logArray(ary, attr)
{
  var ret = [];
  console.groupCollapsed("logArray", ary, attr);
  try
  {
    ary.forEach(function (node) 
    {
        if (attr) {
          console.dir(node[attr]);
          ret.push(node[attr]);
        }
        else {
          console.dir(node);
          ret.push(node);
        }
    })
  } catch(E) {console.log(E)}
  console.groupEnd();
  return ret;
}

var a = logQuery("tr.node > td:nth-child(4)", "attributes");
var b = logArray(a, "data-sort-key");
console.log(b);
b.forEach(function (c){console.log("http://" + c.value)})
