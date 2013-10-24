chewbone
========

#This is ZenPen#

<center><img class="logo" src="http://kumailht.com/responsive-elements/media/img/logo.png"><h1>Responsive elements makes it possible for any element to adapt and respond to the area they occupy. It's a tiny javascript library that you can drop into your projects today.</h1><h3>**[Download on Github](https://github.com/kumailht/responsive-elements)**</h3></center><div id="demo"><img class="hint" src="http://kumailht.com/responsive-elements/media/img/hint.png"><div class="ui-resizable" id="resizable"><div class="quote gt100 gt150 gt200 gt250 gt300 gt350 gt400 gt450 lt500 lt550 lt600 lt650 lt700 lt750 lt800 lt850 lt900" data-respond="start: 100px; end: 900px; interval: 50px;"><img class="author-photo" src="http://kumailht.com/responsive-elements/media/img/tommy.jpg"><p class="words">Design must reflect the practical and aesthetic in business but above all... good design must primarily serve people.
<p class="author">Thomas J. Watson
<p class="author-context">Chairman and CEO of International Business Machines
</div></div></div><div id="fusion_ad"><span class="fusionentire"><a target="_top" title="Amazing Vector Art for Graphic Designers - Free &amp;amp; RF Downloads" href="http://adn.fusionads.net/click?creative_id=932&amp;publisher_id=296&amp;1182485821693.151"><img alt="Amazing Vector Art for Graphic Designers - Free &amp;amp; RF Downloads" class="fusionimg" src="http://adn.fusionads.net/creatives/932-vectorartfordesigners120x100blk.gif" height="100" border="0" width="130"></a><a target="_top" title="Amazing Vector Art for Graphic Designers - Free &amp;amp; RF Downloads" class="fusiontext" href="http://adn.fusionads.net/click?creative_id=932&amp;publisher_id=296&amp;1182485821693.151">Amazing Vector Art for Graphic Designers - Free &amp; RF Downloads</a></span><a class="powered-by-fusion" href="http://fusionads.net">Powered by Fusion</a></div><h1 style="line-height:1.1; clear:both"><small>**If you understand responsive web design, you already understand what is happening above. The element (the quote) is aware of it's own width. _It responds and adapts to increasing or decreasing amounts of space._**</small></h1>
<h2>How it works</h2>
The above demo element has the following classes attached to it. **Go ahead and drag the slider to see these classes update.**
**<code class="live-classes" style="color: #217867; margin-bottom:0">gt50 gt100 gt150 gt200 gt250 gt300 gt350 gt400 gt450 gt500 gt550 gt600 gt650 lt700 lt750 lt800 lt850 lt900 lt950</code>**
**<mark>These classes hold information. They tell you how big your element is.</mark>** Classes are prepended with either 'lt' or 'gt' which stand for 'less than' and 'greater than'.  These classes always reflect the real width of the element.  That is what makes responsive elements possible.
 

**A class of 'gt300' means the element has a width 'greater than' 300 pixels. Here is some example CSS to color our element red when the width exceeds 300 pixels:**
<code>.quote**.gt300** {background: red}</code>
**Or color it blue when its width is 'less than' 500 pixels:**
<code>.quote**.lt500** {background: blue}</code>
**Or combine them both by chaining another class. Here's the CSS to color the background yellow when the element is greater than 250 but less than 600 pixels:**
<code>.quote**.gt250.lt600** {background: blue}</code>
<h2>Usage</h2>
<span>1.</span>Load jQuery and <code>responsive-elements.js</code> right before your closing <code>&lt;/head&gt;</code> tag.
<code><pre>&lt;script src="jquery.min.js"&gt;&lt;/script&gt;&lt;script src="responsive-elements.js"&gt;&lt;/script&gt;</pre></code>
<span>2.</span>Explicitly declare which elements you want to be responsive using a <code>data-respond</code> attribute.
<code>&lt;div class="quote" <mark>**data-respond**</mark>&gt;</code>
<span>3.</span>Use 'less than' and 'greater than' classes as breakpoints to write responsive CSS.
<code><pre>.quote**.lt500** {background: blue}.quote**.gt150.lt300** {background: red}</pre></code>

<h1 style="max-width:700px">_**Now checkout [GridForms](http://kumailht.com/gridforms). An opensource library that helps you build better data entry forms. 
And [Formbakery](http://formbakery.com), a form builder that generates ready to use code in minutes!**

Made by [Kumail Hunaid](http://kumailht.com). _</h1>
