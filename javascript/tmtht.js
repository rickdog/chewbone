/* Parse the table at a TMTHT podcast page 
 * (e.g. http://www.themillertellshertale.co.uk/index.cfm?page=index&show=240),
 * and output it as an unordered list as a prompt.
 */

function parse_table()
{
  var out = document.getElementsByName("playlistform")[0].childNodes[0].nodeValue;
  var re = new RegExp('\\n', 'g');
  out = out.replace(re, '') + '<br><p>For more information about all the music played and links to the artist websites, please check <a href="http://www.themillertellshertale.co.uk" rel="nofollow">themillertellshertale.co.uk</a></p><ul>';
  
  var rows = document.getElementsByClassName("website")[0].tBodies[0].rows;
  for (i = 1; i < rows.length; i++)
  {
    var cols = rows[i].cells;
    if (cols.length == 1)
      continue;
    out += "<li>";
    out += cols[0].innerHTML + ": ";  // artist
    out += cols[2].innerHTML + " (";  // song
    out += cols[1].innerHTML + ", ";  // album
    out += cols[3].innerHTML + ', ';  // label
    out += cols[4].innerHTML + ")</li>";
  }
  
  out += "</ul>";
  //console.log(out);
  prompt("Converted", out);
}

parse_table();
