/*
MIT License
_____________________________________________________________________________________

Copyright (c) 2006 Nathan Hopkins

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be included in all copies
or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.

_____________________________________________________________________________________

Feel free to contact me regarding jsTracer at natehop@yahoo.com.
*/

/**
 * A simple trace function added for ease of use.
 * Note as this is a generic name, it may have naming conflicts with other scripts.
 * This function will most likely be deprecated in favor of developers writing their own.
function trace(message, messageType, css)
{
	if (jstracer)
	{
	  jstracer.write(message, messageType, css);
	}
}
*/

if (typeof(CSSStyleSheet) != "undefined")
{
  window.isMoz = true;

	CSSStyleSheet.prototype.__defineGetter__("rules", function()
	{
		return this.cssRules;
	});

	CSSStyleSheet.prototype.addRule = function(selector, style, index)
	{
		this.insertRule(selector + " { " + style + " }", index);
	}
}

/**
 * The jsTracer object constructor.
 *
 * @class
 * jsTracer serves as a simple but powerful JavaScript logging, tracing and debugging tool.
 * When used in conjunction with JavaScript debuggers such as Venkman or even Microsoft's Visual Studio,
 * jsTracer will improve your JavaScript authoring and debugging experience.  It is especially helpful
 * with cross browser JavaScript development as it allows you to trace or log messages and then compare
 * method calls and sequencing.  I've found it to be very helpful with those elusive and hard to find
 * cross browser JavaScript discrepancies. */
function jsTracer()
{
	if (!jsTracer.prototype.defined)
	{
	  /**
	   * An enum listing the available message types.
	   * The available types are:
	   * <ul>
	   *   <li>INFO<li>
     *   <li>WARNING</li>
     *   <li>ERROR</li>
     * </ul> */
	  jsTracer.prototype.MessageType =
	  {
    	INFO: 1,
    	WARNING: 2,
    	ERROR: 3
    }

	  /**
	   * Cross browser way of adding an event listener.  Used internally. */
	  jsTracer.prototype.addEventListener = function(obj, eventName, listener)
    {
      if (obj.addEventListener)
        obj.addEventListener(eventName, listener, false);
      else if (obj.attachEvent)
        obj.attachEvent("on" + eventName, listener);
    }

    /**
     * Cross browser way of removing event listeners.  Used internally. */
    jsTracer.prototype.removeEventListener = function(obj, eventName, listener)
    {
      if (obj.removeEventListener)
        obj.removeEventListener(eventName, listener, false);
      else if (obj.detachEvent)
        obj.detachEvent("on" + eventName, listener);
    }

		/**
		 * This is the filter that controls which messages are visible in the trace window.
		 * @param {jsTracer.MessageType} messageType The type of messages to make visible. */
		jsTracer.prototype.changeView = function(messageType)
		{
		  var css = _master.getTracerStyleSheet();
		  var rules = css.cssRules || css.rules;
		  var info, warning, error;


		  for (index in rules)
		  {
		    var rule = rules[index];
		    if (info && warning && error) break;
		    switch (rule.selectorText)
		    {
		      case ".info":
		        info = rule;
		        break;
		      case ".warning":
		        warning = rule;
		        break;
		      case ".error":
		        error = rule;
		        break;
		    }
		  }

			switch(messageType)
			{
				case MessageType.INFO:
					info.style.display = "block";
					error.style.display = "none";
					warning.style.display = "none";
					break;
				case MessageType.ERROR:
					info.style.display = "none";
					error.style.display = "block";
					warning.style.display = "none";
					break;
				case MessageType.WARNING:
					info.style.display = "none";
					error.style.display = "none";
					warning.style.display = "block";
					break;
				default:
					info.style.display = "block";
					error.style.display = "block";
					warning.style.display = "block";
					break;
			}
		}

		/**
		 * Highlights a message in the trace viewer.
		 * @param {Element} message The element representing the message.
		 * @param {String} color The color to highlight the message with. */
		jsTracer.prototype.highlightMessage = function(message, color)
		{
			if (message && color)
			{
				message.id = "messageHighlighted";
				message.style.border = "solid 3px " + color;
				message.highlightColor = color;
				message.highlighted = true;
			}
		}

		/**
		 * Removes highlighting from a message.
		 * @param {Element} message The message to remove highlighting from. */
		jsTracer.prototype.removeHighlight = function(message)
		{
      message.style.border = "none";
      message.style.borderBottom = "solid 1px #D0D0D2";
  		message.id = "message";
  		message.highlighted = false;
		}

		/**
		 * Handler for the click event on messages
		 * @param {Event} event The click event object. */
		jsTracer.prototype.messageClicked = function(event)
		{
		  event = event || window.event;
			var element = event.target || event.srcElement;

			if (element.highlighted)
			{
  		  jstracer.removeHighlight(element);
  		}
  		else
      {
  		  var color = element.highlightColor || "blue";
  		  jstracer.highlightMessage(element, color);
  		}
		}

		/**
		 * Shows the context menu.  This method is wired up as a click event listener.
		 * @param {Event} event The triggering event object. */
		jsTracer.prototype.showContextMenu = function(event)
		{
		  var doc = _master.jsTracerFrame.contentWindow.document;
		  event = event || window.event;
		  var element = event.target || event.srcElement;

		  if (event.preventDefault) event.preventDefault();

		  if (_master.hideContextMenuTimer)
		  {
		    _master.getWindow().clearTimeout(_master.hideContextMenuTimer);
		    _master.hideContextMenuTimer = null;
		    return false;
		  }

		  if (!_master.contextMenu || !_master.contextMenu.visible)
		  {
  			_master.contextElement = element;

  		  if (!_master.contextMenu)
  		  {
  		    var contextMenu = doc.createElement("div");
  		    contextMenu.id = "contextMenu";
  		    _master.addEventListener(contextMenu, "mouseover", jstracer.showContextMenu);
  		    _master.addEventListener(contextMenu, "mouseout", jstracer.hideContextMenu);

  		    var colors = ["Red", "Blue", "Yellow"];
  		    for (var i = 0; i < colors.length; i++)
  		    {
  		      var color = colors[i];
  		      var item = doc.createElement("a");
  		      item.setAttribute("color", color);
  		      item.innerHTML = "Highlight <span style='color:" + color + "' color='" + color + "'>" + color + "</span>";
  		      _master.addEventListener(item, "click", jstracer.hideContextMenuImmediate);
  		      _master.addEventListener(item, "click", jstracer.highlightMessageClicked);
  		      _master.addEventListener(item, "mouseover", jstracer.showContextMenu);
  		      contextMenu.appendChild(item);
  		    }

  		    contextMenu.appendChild(doc.createElement("hr"));

  		    var item = doc.createElement("a");
          item.innerHTML = "Remove Highlight";
          _master.addEventListener(item, "click", jstracer.hideContextMenuImmediate);
          _master.addEventListener(item, "click", jstracer.removeHighlightClicked);
          _master.addEventListener(item, "mouseover", jstracer.showContextMenu);
          contextMenu.appendChild(item);

					if (element.stack && element.stack != "null" && element.stack != "undefined")
          {
            contextMenu.appendChild(doc.createElement("hr"));
    		    item = doc.createElement("a");
    		    item.innerHTML = "View Stack Trace";
    		    _master.addEventListener(item, "click", jstracer.hideContextMenuImmediate);
    		    _master.addEventListener(item, "click", jstracer.showStackTrace);
    	      _master.addEventListener(item, "mouseover", jstracer.showContextMenu);
    	      contextMenu.appendChild(item);
  	      }

          doc.body.appendChild(contextMenu);
          _master.contextMenu = contextMenu;
  		  }

				_master.contextMenu.style.visibility = "hidden";
  		  _master.contextMenu.style.display = "block";
  		  _master.contextMenu.visible = true;

  	    var screenTop = event.screenY - event.clientY;
  		  var screenLeft = event.screenX - event.clientX;
  		  var height = _master.contextMenu.offsetHeight;
  		  var width = _master.contextMenu.offsetWidth;

  		  var top = (event.screenY - screenTop) - 5;
  		  var left = (event.screenX - screenLeft) - 5;

  		  var topDiff = (top + height) - doc.body.clientHeight;
  		  var leftDiff = (left + width) - doc.body.clientWidth;
  		  if (top < 5) top = 5;
  		  else if (topDiff >= 0) top = top - (topDiff + 5);
  		  if (left < 5) left = 5;
  		  else if (leftDiff >= 0) left = left - (leftDiff + 5);

  		  _master.contextMenu.style.top = top + doc.body.scrollTop;
  		  _master.contextMenu.style.left = left + doc.body.scrollLeft;

        jstracer.setViewerOpacity(4);
				_master.contextMenu.style.visibility = "visible";
		  }

		  return false;
		}

    /**
     * Sets the opacity level of the view window.
     * @param {Integer} opacity The opacity level.  This value should be in single digits from 0-9.
     *   A value of 10 = 100% opacity while other values such as 3 = 30% opacity. */
    jsTracer.prototype.setViewerOpacity = function(opacity)
    {
      var doc = _master.jsTracerFrame.contentWindow.document;
		  var header = jstracer.getHeader();
		  var messages = jstracer.getMessageContainer()
      if (opacity != 10)
      {
        if (window.isMoz)
        {
          header.style.opacity = "." + opacity;
          messages.style.opacity = "." + opacity;
        }
        else
        {
          header.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + opacity + "0)";
          messages.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + opacity + "0)";
        }
      }
      else
      {
        header.style.opacity = "";
        messages.style.opacity = "";
        messages.style.filter = "";
        messages.style.filter = "";
      }
    }

		jsTracer.prototype.removeContextMenu = function()
		{
			var doc = _master.jsTracerFrame.contentWindow.document;
			var menu = doc.getElementById("contextMenu");
			if (menu) doc.body.removeChild(menu);
			_master.contextMenu = null;
		}

    /**
     * Hides the context menu.
     * This method is intended to be used as an event handler; however, this is not a requirement.
     * @param {Event} event [optional] The triggering event. */
    jsTracer.prototype.hideContextMenuImmediate = function(event)
    {
      var doc = _master.jsTracerFrame.contentWindow.document;
			_master.removeContextMenu();
			_master.hideContextMenuTimer = null;
      jstracer.setViewerOpacity(10);
    }

		/**
		 * Hides the context menu after a brief pause.
		 * This method is intended to be used as an event handler; however, this is not a requirement.
     * @param {Event} event [optional] The triggering event. */
		jsTracer.prototype.hideContextMenu = function(event)
		{
      _master.hideContextMenuTimer = _master.getWindow().setTimeout("jstracer.hideContextMenuImmediate();", 300);
		}

    /**
     * Event handler wired to the click event that highlights messages in the trace viewer.
     * @param {Event} event The triggering event. */
		jsTracer.prototype.highlightMessageClicked = function(event)
		{
		  event = event || window.event;
      var element = event.target || event.srcElement;
      _master.highlightMessage(_master.contextElement, element.getAttribute("color"));
    }

    /**
     * Event handler wired to the click that removes highlights from messages.
     * @param {Event} event The triggering event. */
    jsTracer.prototype.removeHighlightClicked = function(event)
		{
		  event = event || window.event;
      var element = event.target || event.srcElement;
      _master.removeHighlight(_master.contextElement);
    }

    /**
     * Returns the window that owns the jsTracer object.
     * This is required as jsTracer uses frames and an instance exists on each frame,
     * so we need the ability to find the window for the current tracer context.
     * @type Window */
    jsTracer.prototype.getWindow = function()
    {
      return window;
    }

    /**
     * Pops up a window that shows the stack trace for the current trace message.
     * This function is intended to be an event listener, and is currently wired to the
     * click event of items in the context menu.
     * @param {Event} event The triggering event. */
    jsTracer.prototype.showStackTrace = function(event)
    {
      event = event || window.event;
			var element = event.target || event.srcElement;

			if (_master.contextElement && _master.contextElement.stack)
			{
			  var stack = unescape(_master.contextElement.stack).split("##jsTracer##");
        var stackWindow = window.open("about:blank", "", "height=500,width=700,scrollbars=1,resizable=1,status=0");
			  var doc = stackWindow.document;

			  doc.open();
			  doc.write("<html><head><title>" + _master.contextElement.innerHTML + "</title>" +
			            "<style type='text/css'>" +
			            "body { margin:0px; }" +
			            "#source { font-family:verdana,sans-serif; font-size:12px; padding:15px; background-color:#ECECEC; border-bottom:solid 1px #9D9DA1; }" +
			            //"#stackViewer { height:100%; width:100%; overflow:auto; }" +
                  "#stackViewer * { font-size:11px; }" +
                  "#stackViewer .codeBlock { margin-top:10px; margin-left:10px; font-family:courier; white-space:nowrap; }" +
                  "#stackViewer .codeBlock .func { margin-left:10px; margin-top:10px; }" +
                  "#stackViewer .codeBlock .line { height:1px; font-size:1px; line-height:1px; color:#E6E6E6; background-color:#E6E6E6; margin:0px; }" +
			            "</style>" +
			            "</head><body>" +
			            "<div id='source'>" + _master.contextElement.innerHTML + "</div>" +
			            "</body></html>");
			  doc.close();

			  var stackViewer = doc.createElement("div");
        stackViewer.id = "stackViewer";
			  stackViewer.innerHTML = "";
			  var funcContainer = stackViewer;
			  var stackCounter = stack.length;

  			var len = stack.length;
  			for (var i = 0; i < len; i++)
  			{
  			  var func = _master._getFunctionHTML(stack[i]);
  			  var codeBlock = doc.createElement("div");
  			  codeBlock.className = "codeBlock";
  			  var color = jstracer._getRandomRGB();
  			  codeBlock.style.borderTop = "solid 1px " + color;
  			  codeBlock.style.borderLeft = "solid 1px " + color;
  			  if (i == 0) codeBlock.style.border = "none";

  			  codeBlock.innerHTML += "<div style='background-color:" + color + ";padding-left:5px;'>" + stackCounter + ":</div><div class='func'>" + func + "</div>";
  			  funcContainer.appendChild(codeBlock);
  			  funcContainer = codeBlock;
    			stackCounter--;
  			}

  			doc.body.appendChild(stackViewer);
			}
    }

    /**
     * Returns a random RGB color string for use in CSS.
     * This is used by the stack view to delineate functions in the stack.
     * @private
     * @type String */
    jsTracer.prototype._getRandomRGB = function()
    {
      var min = 100;
      var r = Math.floor(Math.random() * (256 - min)) + min;
      var g = Math.floor(Math.random() * (256 - min)) + min;
      var b = Math.floor(Math.random() * (256 - min)) + min;
      return "rgb(" + r + "," + g + "," + b + ")";
    }

    /**
     * Builds an HTML string for function definitions.
     * Used by the stack viewer.
     * @private
     * @param {Function} func The function definition to get an HTML string for.
     * @type String */
    jsTracer.prototype._getFunctionHTML = function(func)
    {
      var funcString = escape(func);
		  var funcHTML = funcString.replace(/%20/g, "&nbsp;");
      funcHTML = funcHTML.replace(/%0A/g, "<div class='line'>&nbsp;</div>");
      funcHTML = funcHTML.replace(/%09/g, "&nbsp;&nbsp;");
      funcHTML = unescape(funcHTML);

		  /*
		  var strings = funcHTML.match(/".+"|'.+'/g);

		  for (var i in strings)
		  {
		    funcHTML = funcHTML.replace(strings[i], "<span style=\"color:olive;\">" + strings[i] + "</span>");
		  }
		  */

		  var keywords = ["function", "var", "this"];
		  for (var i in keywords)
		  {
		    funcHTML = funcHTML.replace(keywords[i], "<span style='color:blue;font-weight:bold'>" + keywords[i] + "</span>");
		  }

		  /*if (func != trace)
		  {
		    var start = funcHTML.search(/trace\(|jstracer\.write\(/);
        if (start > 0)
        {
		      var traceStatement = funcHTML.substring(start, funcHTML.indexOf(")", start) + 2);
          funcHTML = funcHTML.replace(traceStatement, "<span style='background-color:#FFB3B3;'>" + traceStatement + "</span>");
		    }
		  }*/

      return funcHTML;
    }

    /**
     * Writes a message to the trace log.
     * @param {String} message The message to write.
     * @param {jsTracer.MessageType} messageType The type of message to write.
     * @param {String} css The custom CSS you wish to have applied to your message. */
    jsTracer.prototype.write = function(message, messageType, css)
    {
			var stack = null;
      if (_master._stackTraceEnabled)
      {
        // Get stack trace.
        stack = [];
    	  var func = this.write.caller;
    	  while(func)
    	  {
					stack.push(func);
    	    func = func.caller;
    	  }

				stack = escape(stack.join("##jsTracer##"));
  	  }

  	  messageType = messageType || MessageType.INFO;
  	  css = css == null ? "" : css;
  	  message = escape(message);

			if (_master.initialized)
				setTimeout("jstracer._write('" + message + "'," + messageType + ",'" + css + "','" + stack + "');", 10);
			else
				_master._queue.push([message, messageType, css, stack]);
    }

		/**
		 * This is kind of a go between write function.  Its sole purpose is to ensure
     * that we pick up the queued messages first, if there are any.
     * @private
		 * @param {String} message The message to write.
		 * @param {jsTracer.MessageType} messageType [optional] The type of message to write.
		 * @param {String} css [optional] Any custom CSS that should be applied to the message.
		 * @param {Array} stack [optional] The stack of function calls. */
		jsTracer.prototype._write = function(message, messageType, css, stack)
		{
			if (_master.enabled)
			{
				if (_master._queue)
				{
					var n = null;
					while (_master._queue.length)
					{
						var item = _master._queue.shift();
						_master._writeReal(item[0], item[1], item[2], item[3]);
					}
					_master._queue = null;
				}

				_master._writeReal(message, messageType, css, stack);
			}
		}

		/**
		 * Writes a message to the trace log.
		 * @private
		 * @param {String} message The message to write.
		 * @param {jsTracer.MessageType} messageType [optional] The type of message to write.
		 * @param {String} css [optional] Any custom CSS that should be applied to the message.
		 * @param {Array} stack [optional] The stack of function calls. */
		jsTracer.prototype._writeReal = function(message, messageType, css, stack)
		{
			message = unescape(message) + "";
			_master.count++;

			message = _master.count + ": " + _master.prepMessage(message);
			var el = _master.jsTracerFrame.contentWindow.document.createElement("div");
			el.innerHTML = message;
			el.stack = stack;
			_master.addEventListener(el, "click", this.messageClicked);
			_master.addEventListener(el, "contextmenu", this.showContextMenu);

			switch(messageType)
			{
				case MessageType.WARNING:
					el.className = "warning";
					break;
				case MessageType.ERROR:
					el.className = "error";
					break;
				default:
					el.className = "info";
					break;
			}

			if (css)
			{
				//el.setAttribute("style", msgCss);
				var rules = css.split(";");
				var len = rules.length;
				for (var i = 0; i < len; i++)
				{
					try
					{
						var rule = rules[i].split(":");
						var selector = rule[0];
						var value = rule[1];
						if (rule && rule.length == 2)
						{
							if (el.style.setProperty)
								el.style.setProperty(selector, value, "");
							else
							{
								var fix = selector.split("-");
								var scriptSelector = fix[0];

								if (fix.length > 1)
								{
									for (var x = 1; x < fix.length; fix++)
										scriptSelector = scriptSelector + fix[x].substring(0, 1).toUpperCase() + fix[x].substring(1);
								}

								el.style[scriptSelector] = value;
							}
						}
					}
					catch(ex)
					{
						_master.write("jsTracer: " + ex.message, MessageType.ERROR);
					}
				}
			}

			var messageContainer = this.getMessageContainer();
			messageContainer.insertBefore(el, messageContainer.firstChild);
		}

		/**
		 * Clears the log and the trace window if tracing is turned on. */
		jsTracer.prototype.clear = function()
		{
			_master.count = 0;
			if (_master.length > 0)
				_master.splice(_master[0], _master.length);

			var messageContainer = this.getMessageContainer();
			messageContainer.innerHTML = "";
			messageContainer.appendChild(messageContainer.ownerDocument.createTextNode(""));
		}

		/**
		 * Closes the trace window.  Note that the frameset inserted by jsTracer remains.
		 * This is wired as an event listener to the click event of the close button
		 * @param {Event} event The triggering event. */
	  jsTracer.prototype.close = function(event)
	  {
	     _master.enabled = false;
	     _master.frameset.removeChild(_master.jsTracerFrame);
	     _master.frameset.cols = "*";
	  }

		/**
		 * Changes the message filter.
		 * This is wired to the onchange event of the message filter dropdown.
		 * @param {Event} event The triggering event. */
		jsTracer.prototype.filterChanged = function(event)
		{
		  event = event || window.event;
		  var target = event.target || event.srcElement;
		  var messageType = Number(target.options[target.selectedIndex].value);
		  _master.changeView(messageType);
		}

		/**
		 * Toggles the enable/disable feature.
     * This is wired to the click event of the enable/disable buton.
     * @param {Event} event The triggering event. */
		jsTracer.prototype.toggleEnable = function(event)
		{
			vent = event || window.event;
		  var target = event.target || event.srcElement;

			if (_master.enabled)
			{
				target.value = "Enable";
				_master.enabled = false;
			}
			else
			{
				target.value = "Disable";
				_master.enabled = true;
			}
		}

		/**
		 * Prepares a message for tracing.
		 * Basically this encodes source HTML for viewing as "code" in the trace window.
		 * @param {String} message The messsage to prepare for tracing. */
		jsTracer.prototype.prepMessage = function(message)
		{
  		message = message.replace(/</g, "&lt;");
  		message = message.replace(/>/g, "&gt;");
		  return message;
		}

		/**
		 * Gets the top most tracer object, the one that belongs to the top frame inserted by jsTracer.
		 * @type jsTracer */
		jsTracer.prototype.getTopTracer = function()
		{
		  var tracer = this;
		  if (window != parent)
		    tracer = parent.jstracer.getTopTracer();
		  return tracer;
		}

		/**
		 * Returns the CSS style sheet used to style the trace window.
		 * @type CSSStyleSheet */
		jsTracer.prototype.getTracerStyleSheet = function()
		{
		  var sheet = _master.jsTracerFrame.contentWindow.document.styleSheets[0];
		  return sheet;
		}

		/**
		 * Gets the header element in the trace window.
		 * @type Element */
		jsTracer.prototype.getHeader = function()
		{
		  var messageContainer = _master.jsTracerFrame.contentWindow.document.getElementById("header");
		  return messageContainer;
		}

		/**
		 * Gets the message container element in the trace window.
		 * @type Element */
		jsTracer.prototype.getMessageContainer = function()
		{
		  var messageContainer = _master.jsTracerFrame.contentWindow.document.getElementById("messageContainer");
		  return messageContainer;
		}

		/**
		 * Initializes jsTracer.
		 * Creates a frameset and replaces the current body with a frameset.
		 * The frameset consists of the trace frame on the left and the original window on the right. */
		jsTracer.prototype.init = function()
    {
      if (!this.initialized)
      {
        if (window == parent)
        {
					var checked = this._stackTraceEnabled ? " checked" : "";
          this.frameset = document.createElement("frameset");
          this.frameset.cols = "300,*";
          this.jsTracerFrame = document.createElement("frame");
          this.jsTracerFrame.name = "jsTracerFrame";
          this.jsTracerFrame.id = "jsTracerFrame";
          this.jsTracerFrame.scrolling = "yes";
          this.frameset.appendChild(this.jsTracerFrame);
          this.contentFrame = document.createElement("frame");
          this.contentFrame.name = "contentFrame";
          this.contentFrame.id = "contentFrame";
          this.frameset.appendChild(this.contentFrame);
          document.documentElement.replaceChild(this.frameset, document.body);
          this.contentFrame.contentWindow.location = location;

          var tracerHtml = "<html>" +
                              "<head>" +
                                "<style type='text/css'>" +
                                "* { font-family:verdana,sans-serif; font-size:11px; }" +
                                "body { margin:0px; }" +
                                "select { margin-right:2px; }" +
                                "#controls, #controls * { font-size:10px; }" +
																"a { text-decoration:none; }" +
                                ".subcopy { font-size:60%; font-weight:normal; }" +
                                ".error { color:red; padding:5px; border-bottom:solid 1px #D0D0D2; cursor:pointer; }" +
                                ".warning { color:#D16900; padding:5px; border-bottom:solid 1px #D0D0D2; cursor:pointer; }" +
                                ".info { color:black; padding:5px; border-bottom:solid 1px #D0D0D2; cursor:pointer; }" +
                                "#header { white-space:nowrap; border-bottom:solid 1px #9D9DA1; background-color:#ECECEC; padding:5px; padding-top:2px; }" +
																".logo { margin:0px 0px 2px 5px; }" +
                                ".logo a, .logo a * { font-family:impact, tahoma, sans-serif; font-style:italic; font-size:160%; font-weight:bold; color:#0070E0; }" +
                                ".logo a .js { color:black; font-size:110%; }" +
																".logo .tagline { font-size:9px; font-style:italic; color:#A6A6A6; margin-left:5px; }" +
																".g { float:right; margin:0px; padding:0px; margin-top:5px; margin-bottom:5px; }" +
																"#controls { clear:both; padding:3px; background-color:#E0DFE3; border:solid 1px #99A0A3; text-align:center; }" +
																"#controls table { margin-left:auto; margin-right:auto; }" +
																"#controls a { color:#000; }" +
																"#controls #buttons { padding:3px; margin-bottom:4px; background-color:#D1D1D7; border:solid 1px #99A0A3; }" +
                        				"#contextMenu { padding:10px; padding-top:5px; width:190px; padding-bottom:5px; border:solid 1px #666666; position:absolute; background-color:white; z-index:999; }" +
                                "#contextMenu * { font-size:11px; }" +
                        				"#contextMenu a { display:block; cursor:pointer; color:black; margin-bottom:5px; }" +
                        				"#contextMenu a:hover { text-decoration:underline; }" +
                        				"#contextMenu hr { height:1px; display:block; border:none; border-top:solid 1px #9D9DA1; margin-top:5px; margin-bottom:5px; width:100%; color:#9D9DA1; }" +
                        				//"#mask { position:absolute; top:0px; left:0px; height:100%; width:100%; background-color:black; opacity:.20; filter:Alpha(opacity=20); z-index:99; }" +
                                "</style>" +
                               "</head>" +
                               "<body>" +
                                  "<div id='header'>" +
                                    "<div class='logo'><a href='http://jstracer.sourceforge.net/' target='_top'><span class='js'>js</span>Tracer</a> <span class='tagline'>by Nathan Hopkins</span></div>" +
																		"<div id='controls'>" +
																			"<div id='buttons'>" +
																				"<input type='button' value='Disable' accesskey='e' onclick='parent.jstracer.toggleEnable(event);' />" +
																				"<input type='button' value='Clear' accesskey='c' onclick='parent.jstracer.clear(event);' />" +
																			  "<input type='button' value='Close' accesskey='x' onclick='parent.jstracer.close(event);' />" +
																			"</div>" +
                                      "<table border='0' cellpadding='0' cellspacing='0'><tr><td>Filter: <select id='filter' onchange='top.jstracer.filterChanged(event);'>" +
                                        "<option value='-1'>All</option>" +
                                        "<option value='1'>Info</option>" +
                                        "<option value='2'>Warnings</option>" +
                                        "<option value='3'>Errors</option>" +
                                      "</select></td><td>" +
																			"<table border='0' cellpadding='0' cellspacing='0'><tr><td><input id='stack' onclick='parent.jstracer.toggleStackTrace(this);' type='checkbox' " + checked + " /></td><td><a href='javascript:document.getElementById(\"stack\").click();'>Stack Trace</a></td></tr></table></td></tr></table>" +
                                     "</div>" +
                                   "</div>" +
                                  "<div id='messageContainer'><b></b></div>" +
                                "</body>" +
                              "</html>";

          var doc = this.jsTracerFrame.contentWindow.document;
          doc.open();
          doc.write(tracerHtml);
          doc.close();
        }

        this.initialized = true;
      }
    }

    /**
     * Indicates if the jsTracer object has been prototyped or defined.
     * @type Boolean */
		jsTracer.prototype.defined = true;
	}

	/**
	 * Supporting GUI function for checking the stack option checkbox.
   * @private */
	jsTracer.prototype._updateStackTraceOption = function(checked)
	{
		if (_master && _master.jsTracerFrame && _master.jsTracerFrame.contentWindow)
		{
			var doc = _master.jsTracerFrame.contentWindow.document;
			var el = doc.getElementById("stack");
			el.checked = checked;
		}
	}

	/**
	 * Enables stack trace collection.  This feature is disabled by default,
	 * so you must explicitly call this method to turn on stack collection. */
	jsTracer.prototype.enableStackTrace = function()
	{
	  this._stackTraceEnabled = true;
	  if (this != _master)
	    _master.enableStackTrace();
		this._updateStackTraceOption(true);
	}

	/**
	 * Disables stack trace collection. */
	jsTracer.prototype.disableStackTrace = function()
	{
	  this._stackTraceEnabled = false;
	  if (this != _master)
	    _master.disableStackTrace();
			this._updateStackTraceOption(false);
	}

	/**
	 * Toggles the stack trace option.
   * This is really more of an internal GUI supporting function.
   * @param {Element} el The checkbox element. */
	jsTracer.prototype.toggleStackTrace = function(el)
	{
		if (el)
		{
			if (el.checked)
				this.enableStackTrace();
			else
				this.disableStackTrace();
		}

		this.removeContextMenu();
	}

	// public properties -------------------------------------------------
	/**
	 * The number of messages written.
	 * @type Integer. */
	this.count = 0;

	/**
	 * The maximum number of messages to keep in the tracer array.
	 * @type Integer */
	this.maxSize = 100;

	/**
	 * Indicates if jsTracer is enabled.
	 * This is false by default and must be explicitly set to true before tracing will work.
	 * @type Boolean */
	this.enabled = true;

	// private properties ------------------------------------------------

	/**
	 * The master or top most jsTracer object.
	 * @private
	 * @type jsTracer */
	var _master = this.getTopTracer();

	/**
	 * Indicates if stack collection is enabled.
	 * @private
	 * @type Boolean */
	this._stackTraceEnabled = false;

	/**
	 * An array of messages that have been queued for tracing prior to
   * jsTracer fully initializing (which happens on load).  This allows
   * you to trace code that executes prior to page load.
   * @private
   * @type Array */
	this._queue = [];
}
//jsTracer.prototype = new Array();

var jstracer = new jsTracer();
jstracer.addEventListener(window, "load", function(){window.jstracer.init();});

/**
 * jsTracer object added to the window object for convenience. */
window.jstracer = jstracer;

/**
 * Enum listing the supported message types.
 * I left this in for legacy support.  The prefered method is to use the
 * MessageType enum property of the jsTracer object. */
var MessageType = jstracer.MessageType;
