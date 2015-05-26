/*
http://lhorie.github.io/mithril/getting-started.html
 */

/// Model

// Modules are merely structures that represent a viewable "page" or a part of a page. 
// In Mithril, a module is an object that contains two functions: controller and view.

//an empty Mithril module
var myModule = {
    controller: function() {},
    view: function() {}
}

// Typically, model entities are reusable and live outside of modules (e.g. var User = ...). 
// In our example, since the whole application lives in one module, 
// we're going to use the module as a namespace for our model entities.

var todo = {};

//for simplicity, we use this module to namespace the model classes

//the Todo class has two properties
todo.Todo = function(data) {  // regular javascript
    this.description = m.prop(data.description);
    this.done = m.prop(false);
};

//the TodoList class is a list of Todo's (regular javascript)
todo.TodoList = Array;

// m.prop is simply a factory for a getter-setter function. Getter-setters work like this:

//define a getter-setter with initial value `John`
var a_name = m.prop("John");

//read the value
var a = a_name(); //a == "John"

//set the value to `Mary`
a_name("Mary"); //Mary

//read the value
var b = a_name(); //b == "Mary"

// Note that the Todo and TodoList classes we defined above are plain vanilla Javascript constructors.
// They can be initialized and used like this:

var myTask = new todo.Todo({description: "Write code"});

//read the description
myTask.description(); //Write code

//is it done?
var isDone = myTask.done(); //isDone == false

//mark as done
myTask.done(true); //true

//now it's done
isDone = myTask.done(); //isDone == true

// The TodoList class is simply an alias of the native Array class.

var list = new todo.TodoList();
list.length; //0


//// View-Model
// A view-model is a model level entity that stores UI state

//define the view-model
todo.vm = {
    init: function() {
        //a running list of todos
        todo.vm.list = new todo.TodoList();

        //a slot to store the name of a new todo before it is created
        todo.vm.description = m.prop('');

        //adds a todo to the list, and clears the description field for user convenience
        todo.vm.add = function(description) {
            if (description()) {
                todo.vm.list.push(new todo.Todo({description: description()}));
                todo.vm.description("");
            }
        };
    }
};

todo.vm.init();

//try adding a to-do
todo.vm.add(todo.vm.description);
todo.vm.list.length; //0, because you can't add a to-do with an empty description

//add it properly
todo.vm.description("Write code");
todo.vm.add(todo.vm.description);
todo.vm.list.length; //1


//// Controller

// In classic MVC, the role of the controller is to dispatch actions from the view to the model layer.
// Mithril controllers can be stripped down to a bare minimum, so that they only perform a single essential 
// role: to expose a scoped set of model-level functionality. As you may recall, models are responsible for encapsulating business logic, 
// and view-models encapsulate logic that pertains specifically to UI state, so there's really nothing else for a controller to abstract away, 
// and all it needs to do is expose a slice of the model layer that pertains to the UI that is currently in view.
// In other words, all our controller needs to do is this:

todo.controller = function() {
    todo.vm.init()
}


//// View

// The next step is to write a view so users can interact with the application

todo.view = function() {
    return m("html", [
        m("body", [
            m("input"),
            m("button", "Add"),
            m("table", [
                m("tr", [
                    m("td", [
                        m("input[type=checkbox]"),
                    ]),
                    m("td", "task description"),
                ])
            ])
        ])
    ]);
};
        
// The utility method m() creates virtual DOM elements. As you can see, you can use CSS selectors to specify attributes. 
// You can also use the . syntax to add CSS classes and the # to add an id.
// For the purposes of testing out our code so far, the view can be rendered using the m.render method:

// m.render(document, todo.view());

// or can save into detached element for insertion later:
d = document.createElement("DIV")
m.render(d, todo.view());
document.body.appendChild(d);
        
// Note that m.render is a very low level method in Mithril that draws only once and doesn't attempt to run the
// auto-redrawing system. In order to enable auto-redrawing, the todo module must be initialized by either 
// calling m.module or by creating a route definition with m.route. Also note that, unlike observable-based
// frameworks like Knockout.js, setting a value in a m.prop getter-setter does NOT trigger redrawing
// side-effects in Mithril.

/// Data Bindings

// Let's implement a data binding on the text input. Data bindings connect a DOM element
// to a Javascript variable so that updating one updates the other.

m("input", {value: todo.vm.description()})   // bind description model value to an input

// This binds the description getter-setter to the text input. Updating the value of the description
// in the model updates the DOM input when Mithril redraws.
// Mithril keeps a virtual representation of the DOM in cache, scans for changes, and then only modifies
// the absolute minimum required to apply the change to the DOM. In practice,
// this results in surprisingly fast re-rendering.
// In the case above, Mithril only touches the value attribute of the input.
 
todo.vm.init();
d = document.createElement("DIV")
todo.vm.description(); // empty string
m.render(d, todo.view()); // input is blank

document.body.appendChild(d);
todo.vm.description("WritexSx code"); //set the description in the controller
m.render(d, todo.view()); // input now says "Write code"

// bindings can also be bi-directional: that is, they can be coded in such a way that,
// in addition to setting the DOM value, it's also possible to read it as a user types,
// and then update the description getter-setter in the view-model.
// Here's the most basic way of implementing the view-to-model part of the binding:

m("input", {onchange: m.withAttr("value", todo.vm.description), value: todo.vm.description()})

        .
        .
        .
        .
        .
        

///// Summary

// Here's the application code in its entirety:

//this application only has one module: todo
var todo = {};

//for simplicity, we use this module to namespace the model classes

//the Todo class has two properties
todo.Todo = function(data) {
    this.description = m.prop(data.description);
    this.done = m.prop(false);
};

//the TodoList class is a list of Todo's
todo.TodoList = Array;

//the view-model tracks a running list of todos,
//stores a description for new todos before they are created
//and takes care of the logic surrounding when adding is permitted
//and clearing the input after adding a todo to the list
todo.vm = (function() {
    var vm = {}
    vm.init = function() {
        //a running list of todos
        vm.list = new todo.TodoList();

        //a slot to store the name of a new todo before it is created
        vm.description = m.prop("");

        //adds a todo to the list, and clears the description field for user convenience
        vm.add = function() {
            if (vm.description()) {
                vm.list.push(new todo.Todo({description: vm.description()}));
                vm.description("");
            }
        };
    }
    return vm
}())

//the controller defines what part of the model is relevant for the current page
//in our case, there's only one view-model that handles everything
todo.controller = function() {
    todo.vm.init()
}

//here's the view
todo.view = function() {
    return m("html", [
        m("body", [
            m("input", {onchange: m.withAttr("value", todo.vm.description), value: todo.vm.description()}),
            m("button", {onclick: todo.vm.add}, "Add"),
            m("table", [
                todo.vm.list.map(function(task, index) {
                    return m("tr", [
                        m("td", [
                            m("input[type=checkbox]", {onclick: m.withAttr("checked", task.done), checked: task.done()})
                        ]),
                        m("td", {style: {textDecoration: task.done() ? "line-through" : "none"}}, task.description()),
                    ])
                })
            ])
        ])
    ]);
};

//initialize the application
//m.module(document, {controller: todo.controller, view: todo.view});
d = document.createElement("DIV")
document.body.appendChild(d);
m.module(d, {controller: todo.controller, view: todo.view});

