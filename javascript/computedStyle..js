/*
Lists the computed styles of an element and of its ancestors. - squarefree.com
Features:
    * Only shows properties where each element differs from its parent.
    * For the root, only shows styles that differ from the root of a blank HTML document.
    * Collapses "side" properties when all four sides are the same. For example, if all margins are equal, you'll see "margin-*" instead of "margin-top", "margin-left", etc.
    * Some important properties, such as "display" and "position", are red.
    * Some properties that can usually be ignored, such as "top" and "width", are green.
    * Overrides link clicks, so you can use it on A elements.
    * Same status bar info as the "ancestors" bookmarklet.
    * Crosshair cursor.
 */
 
 
 
(function()
{
    function A(n,g)
    {
        var p=n.parentNode,t=n.tagName;
        if(!p)return "";
        if(!t)
            return A(p,g);
        var T=t.toUpperCase(),b=(T!="TABLE"&&T!="TBODY"&&T!="THEAD"&&T!="TR"),c=n.className,i=n.id;
        return A(p,' > ')+(b?T:T.toLowerCase())+(c?"."+c:"")+(i?"#"+i:"")+(b?g:' ');
    }
    document.onmouseover = function(e)
    {
        e=e?e:event;
        var s,g=e.target;
        g=g?g:e.srcElement;
        try
        {
            s=A(g,'')+" (click for computed styles)";
        }
        catch(err)
        {
            s=err.message;
        }
        console.log(s);
        return true;
    };
    console.log(A(document.documentElement,''));
    var newSS,styles='* { cursor: crosshair; }';
    newSS=document.createElement('link');
    newSS.rel='stylesheet';
    newSS.type='text/css';
    newSS.href='data:text/css,'+escape(styles);
    document.getElementsByTagName("head")[0].appendChild(newSS);
    document.onclick=function(e)
    {
        e=e?e:event;
        var s,g=e.target;
        g=g?g:e.srcElement;
        var x=window.open('','computedStyles');
        var d=x.document;
        x.onunload=function()
        {
            document.onclick=null;
            document.onmouseover=null;
            window.status=null;
            newSS.href='data:text/css,';
        };
        function sp(n,t,col)
        {
            var r=d.createElement(n);
            r.appendChild(d.createTextNode(t));
            if(col)
                r.style.color=col;
            return r;
        }
        var typeIndex={'top':1,'bottom':1,'height':1,'width':1,'left':1,'right':1,'position':0,'display':0,'-moz-appearance':0,'-moz-box-sizing':0};
        var colors=["red","green","black"];
        function undirect(v)
        {
            return v.replace(/\-(left|top|bottom|right)/,"-*");
        }
        function diff(n,p)
        {
            pcs=p.ownerDocument.defaultView.getComputedStyle(p,"");
            ncs=n.ownerDocument.defaultView.getComputedStyle(n,"");
            var A=[];
            var B={};
            var C={};
            for(var i=0;i<ncs.length;++i)
            {
                var e=ncs.item(i),v=ncs.getPropertyValue(e),pv=pcs.getPropertyValue(e);
                if(v!=pv)
                {
                    var u=undirect(e);
                    if(u.indexOf("-*")!=-1)
                    {
                        if(!B[u])
                            B[u]=[0,v];
                        if(B[u][1]==v)
                            ++(B[u][0]);
                    }
                    A.push([typeIndex[e]!=null?typeIndex[e]:2,e,v]);
                }
            }
            A=A.sort();
            for(var u in B)
                if(B[u][0]==4)
                    C[u]=true;
            for(var i in A)
            {
                var t=A[i],e=t[1],v=t[2],u=undirect(e);
                if(C[u])
                {
                    if(t[1].indexOf("-left")!=-1)
                        d.body.appendChild(sp("div",u+": "+v+";",colors[t[0]]));
                }
                else 
                    d.body.appendChild(sp("div",e+": "+v+";",colors[t[0]]));
            }
        }
        function info(n)
        {
            if(!n)
                return;
            if(n.tagName)
            {
                d.body.appendChild(sp("h4",A(n,'')));
                d.body.appendChild(sp("span",'{'));
                diff(n,n.parentNode.nodeType!='9'?n.parentNode:d.documentElement);
                d.body.appendChild(sp("span",'}'));
           }
            info(n.parentNode);
        }
        d.body.appendChild(sp("p","// This shows how the computed style of each node differs from the computed style of its parent. The root element, which has no parent, is instead compared against the root of a blank HTML document."));
        info(g);
        x.focus();
        e.preventDefault();
    }
})()
 
/*
 javascript:(function(){function%20A(n,g){var%20p=n.parentNode,t=n.tagName;if(!p)return%20%22%22;if(!t)return%20A(p,g);var%20T=t.toUpperCase(),b=(T!=%22TABLE%22&&T!=%22TBODY%22&&T!=%22THEAD%22&&T!=%22TR%22),c=n.className,i=n.id;return%20A(p,'%20>%20')+(b?T:T.toLowerCase())+(c?%22.%22+c:%22%22)+(i?%22#%22+i:%22%22)+(b?g:'%20');}document.onmouseover=function(e){e=e?e:event;var%20s,g=e.target;g=g?g:e.srcElement;try{s=A(g,'')+%22%20(click%20for%20computed%20styles)%22;}catch(err){s=err.message;}window.status=s;return%20true;};window.status=A(document.documentElement,'');var%20newSS,styles='*%20{%20cursor:%20crosshair;%20}';newSS=document.createElement('link');newSS.rel='stylesheet';newSS.type='text/css';newSS.href='data:text/css,'+escape(styles);document.getElementsByTagName(%22head%22)[0].appendChild(newSS);document.onclick=function(e){e=e?e:event;var%20s,g=e.target;g=g?g:e.srcElement;var%20x=window.open('','computedStyles');x.document.open();x.document.close();var%20d=x.document;x.onunload=function(){document.onclick=null;document.onmouseover=null;window.status=null;newSS.href='data:text/css,';};function%20sp(n,t,col){var%20r=d.createElement(n);r.appendChild(d.createTextNode(t));if(col)r.style.color=col;return%20r;}var%20typeIndex={'top':1,'bottom':1,'height':1,'width':1,'left':1,'right':1,'position':0,'display':0,'-moz-appearance':0,'-moz-box-sizing':0};var%20colors=[%22red%22,%22green%22,%22black%22];function%20undirect(v){return%20v.replace(/\-(left|top|bottom|right)/,%22-*%22);}function%20diff(n,p){pcs=p.ownerDocument.defaultView.getComputedStyle(p,%22%22);ncs=n.ownerDocument.defaultView.getComputedStyle(n,%22%22);var%20A=[];var%20B={};var%20C={};for(var%20i=0;i<ncs.length;++i){var%20e=ncs.item(i),v=ncs.getPropertyValue(e),pv=pcs.getPropertyValue(e);if(v!=pv){var%20u=undirect(e);if(u.indexOf(%22-*%22)!=-1){if(!B[u])B[u]=[0,v];if(B[u][1]==v)++(B[u][0]);}A.push([typeIndex[e]!=null?typeIndex[e]:2,e,v]);}}A=A.sort();for(var%20u%20in%20B)if(B[u][0]==4)C[u]=true;for(var%20i%20in%20A){var%20t=A[i],e=t[1],v=t[2],u=undirect(e);if(C[u]){if(t[1].indexOf(%22-left%22)!=-1)d.body.appendChild(sp(%22div%22,u+%22:%20%22+v,colors[t[0]]));}else%20d.body.appendChild(sp(%22div%22,e+%22:%20%22+v,colors[t[0]]));}}function%20info(n){if(!n)return;if(n.tagName){d.body.appendChild(sp(%22h4%22,A(n,'')));diff(n,n.parentNode.nodeType!='9'?n.parentNode:d.documentElement);}info(n.parentNode);}d.body.appendChild(sp(%22p%22,%22This%20shows%20how%20the%20computed%20style%20of%20each%20node%20differs%20from%20the%20computed%20style%20of%20its%20parent.%20The%20root%20element,%20which%20has%20no%20parent,%20is%20instead%20compared%20against%20the%20root%20of%20a%20blank%20HTML%20document.%22));info(g);x.focus();e.preventDefault();}})()
*/
