var View = function(el, models)
{
  this.el = el;
  this.models = models;
  this.template = function(model) { 
    var tmp = document.createElement("div");
    tmp.innerHTML = `<h1>${model.name}</h1>${model.content}`;
    return tmp;
  };
  this.render = function(view)
  {
	  this.models.forEach(function(model) {
	    this.el.appendChild(this.template(model));
	  }.bind(this));
    view.render(view.el, view.model);
 }
}

var View2 = function(el, models)
{
  this.el = el;
  this.models = models;
  this.template = function(model) { 
    var tmp = document.createElement("div");
    tmp.innerHTML = `<h2>waka ${model.name} ja waka</h1>${model.content}goo goo ga joob`;
    return tmp;
  };
  this.render = function(view)
  {
	  this.models.forEach(function(model) {
	    this.el.appendChild(this.template(model));
	  }.bind(this));
    view.render(view.el, view.model);
  }
}

var m = [{name: "Henry", content: "Some content"}, {name: "GI Joe", content: "Someother content"}];
var z = new View(document.body, m);
var z2 = new View2(document.body, m);
//z.render(z2);
//z2.render(z);
z()

/*
Exception: TypeError: z is not a function
@Scratchpad/20:1:1
*/

/*
Exception: TypeError: view.render is not a function
View2/this.render@Scratchpad/20:33:5
View/this.render@Scratchpad/20:15:5
@Scratchpad/20:40:1
*/
/*
Exception: TypeError: view.render is not a function
View/this.render@Scratchpad/20:15:5
View2/this.render@Scratchpad/20:33:5
@Scratchpad/20:41:1
*/