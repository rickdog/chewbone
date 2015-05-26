// linkfier
var altText, tekst, muligtLink;
var regex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z.]{2,6})([\/\w\?\&\#\%=\.-]*)*\/?/gi;
//This array contains the html tags to ignore when evaluating the function
var ikkeTilladteTags = ['a','head','script','style','title','option','textarea'];
var path = '//text()[not(parent::' + ikkeTilladteTags.join(' or parent::') + ')]';

document.body.normalize();
altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < altText.snapshotLength; i++)
{
  tekst = altText.snapshotItem(i);
  muligtLink = tekst.nodeValue;
  if (regex.test(muligtLink))
  {
    console.log(muligtLink);
    var span = document.createElement('span');
    var lastLastIndex = 0;
    regex.lastIndex = 0;
    for (myArray = null; myArray = regex.exec(muligtLink); )
    {
      var link = myArray[0];
      span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index)));
      var href = link;
      var prefix = '';
      if (href.length > 7)
      {
        prefix = href.substring(0, 7);
      }
      if (prefix.toLowerCase() != 'http://' && prefix.toLowerCase() != 'https:/')
      {
        href = 'http://' + href;
      }
      console.log('href: ', href);
      var a = document.createElement('a');
      a.setAttribute('href', href);
      a.appendChild(document.createTextNode(link));
      span.appendChild(a);
      lastLastIndex = regex.lastIndex;
    }
    span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex)));
    tekst.parentNode.replaceChild(span, tekst);
  }
}
