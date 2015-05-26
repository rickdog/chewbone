/*
Yes, ancestry.js is yet another microframework.
https://github.com/jasonwyatt/ancestry.js

Why? Because I was unsatisfied by how most people handle inheritance in JavaScript. 
Usually, people try to pass off a single Object.create() as a viable solution to inheritance. 
Unfortunately this tends to fail when you want multiple inheritance, or the ability to call a "superconstructor" within your class.
ancestry.js gives you these features, and only these features:

    Ancestry.inherit(ChildClass, [ParentClass1, ParentClass2, ...], prototypeObject) - Helper function for making childClass inherit from the ParentClass1, ParentClass2, ... classes. 
    Additionally, if you want your class to only inherit from one super class, you can leave off the array brackets.
    
    Ancestry.instanceOf(childObject, ParentCandidateClass) - A type-checking function which is capable of searching up a multiple inheritance tree.
    
    The ability to call MyClass.superconstructor.call(this, ...) if you need to initialize your super class.

Multiple inheritance has its caveats though; one of which is a kind of confusion as to which super class should take precedence. In ancestry.js, I want you to specify superclasses in increasing order of importance. This means that MyClass.superconstructor refers to the last class listed in the parent class array.
*/

(function () {
  var Ancestry = {
    _isArray: function (obj) {
      return Object.prototype.toString.call(obj) == '[object Array]';
    },
    _extend: function (destination, source) {
      var i,
      len;
      for (i in source) {
        if (source.hasOwnProperty(i)) {
          destination[i] = source[i];
        }
      }
      return destination;
    },
    /**
         * Causes ChildClass to inherit all of the methods from 
         * parentClasses, then mixes in the prototype object.
         */
    inherit: function (ChildClass, parentClasses, proto) {
      if (!Ancestry._isArray(parentClasses)) {
        parentClasses = [
          parentClasses
        ];
      }
      var i = 0,
      len = parentClasses.length,
      resultPrototype = {
      };
      for (; i < len; i++) {
        Ancestry._extend(resultPrototype, parentClasses[i].prototype);
      }
      Ancestry._extend(resultPrototype, proto);
      resultPrototype.superclasses = parentClasses;
      // the super constructor is the constructor of the last element in parentClasses.
      ChildClass.superconstructor = parentClasses[parentClasses.length - 1];
      ChildClass.superclasses = parentClasses;
      ChildClass.prototype = resultPrototype;
    },
    /**
         * Determines whether or not the child class is a child of 
         * the parentCandidate.
         */
    instanceOf: function (child, parentCandidate) {
      var superclasses = Ancestry._extend([], child.superclasses),
      superclass,
      children,
      i,
      len;
      if (parentCandidate === Object) {
        return true;
      }
      if (typeof superclasses === 'undefined') {
        return false;
      }
      if (!Ancestry._isArray(superclasses)) {
        superclasses = [
          superclasses
        ];
      }
      do {
        superclass = superclasses.shift();
        if (superclass === parentCandidate) {
          return true;
        }
        parents = superclass.superclasses;
        if (typeof parents !== 'undefined') {
          if (!Ancestry._isArray(parents)) {
            parents = [
              parents
            ]
          }
          superclasses = superclasses.concat(parents);
        }
      } while (superclasses.length > 0);
      return false;
    }
  };
  if (typeof define !== 'undefined') {
    // require/AMD exists.
    define([], Ancestry);
  } else if (typeof require !== 'undefined') {
    // commonjs
    Ancestry._extend(exports, Ancestry);
  } else {
    // put in window scope
    window.Ancestry = Ancestry;
  }
}) ();
/// end Ancestry
/////////////////////////////////////////////////////////////////////////

/**
 * EXAMPLE
 * Grandparent Class. Everybody in Arrested Development is a
 * person.
 */
function Person(firstName, lastName) {
  this._age = 0;
  this._firstName = firstName;
  this._lastName = lastName;
}
Person.prototype = {
  getName: function () {
    return this._firstName + ' ' + this._lastName;
  },
  getAge: function () {
    return this._age;
  },
  setAge: function (age) {
    this._age = age;
  }
};

/**
 * Parent class.  All non-inlaw Bluth family members inherit 
 * the Bluth name and attributes.
 */
function Bluth(firstName) {
  Bluth.superconstructor.call(this, firstName, 'Bluth');
}
Ancestry.inherit(Bluth, Person, {
  getCatchPhrase: function () {
    return 'When does the movie come out?';
  },
  render: function () {
    return '<blockquote>' +
    this.getCatchPhrase() +
    ' <cite>' + this.getName() + ' (age: ' + this.getAge() + ')</cite>' +
    '</blockquote>';
  }
});

/**
 * Parent class.  Funke family married into the family.
 */
function Funke(firstName, wearsJorts) {
  Funke.superconstructor.call(this, firstName, 'Funke');
  this._wearsJorts = wearsJorts;
}
Ancestry.inherit(Funke, Person, {
  wearsJorts: function () {
    return this._wearsJorts;
  },
  render: function () {
    return '<blockquote class="' + (this.wearsJorts() ? 'jorts' : '') + '">' +
    '<cite>' + this.getName() + ' (age: ' + this.getAge() + ')</cite>' +
    '</blockquote>';
  }
});

/**
 * Child Classes
 */
function GeorgeBluth() {
  GeorgeBluth.superconstructor.call(this, 'George');
  this.setAge(64);
}
Ancestry.inherit(GeorgeBluth, Bluth, {
  getCatchPhrase: function () {
    return 'There\'s always money in the bananna stand.';
  }
});
function MichaelBluth() {
  MichaelBluth.superconstructor.call(this, 'Michael');
  this.setAge(41);
}
Ancestry.inherit(MichaelBluth, Bluth, {
  getCatchPhrase: function () {
    return 'What have we always said is the most important thing? Family.';
  }
});
function TobiasFunke() {
  TobiasFunke.superconstructor.call(this, 'Tobias', true);
  this.setAge(45);
}
Ancestry.inherit(TobiasFunke, Funke, {
});
function LindsayFunke() {
  LindsayFunke.superconstructor.call(this, 'Lindsay', false);
  this.setAge(41);
}
Ancestry.inherit(LindsayFunke, [
  Bluth,
  Funke
], {
  getCatchPhrase: function () {
    return 'No, how would you like it? Actually, that\'s not a bad idea. I should turn the tables on men and see how they like being objectified. Men with low self-esteem. Get their clothes off.';
  }
});


$(function () {
  var george = new GeorgeBluth(),
  michael = new MichaelBluth(),
  georgeMichael = new Bluth('George Michael'),
  tobias = new TobiasFunke(),
  lindsay = new LindsayFunke();
  georgeMichael.setAge(14);
  $(george.render()) .appendTo('body');
  $(michael.render()) .appendTo('body');
  $(georgeMichael.render()) .appendTo('body');
  $(tobias.render()) .appendTo('body');
  $(lindsay.render()) .appendTo('body');
  // monkey patch Bluth rendering over Lindsay's inherited Funke rendering:
  lindsay.render = Bluth.prototype.render;
  $(lindsay.render()) .appendTo('body');
  $('<p>George is instance of Bluth: ' + Ancestry.instanceOf(george, Bluth) + '</p>') .appendTo('body');
  $('<p>George is instance of Person: ' + Ancestry.instanceOf(george, Person) + '</p>') .appendTo('body');
  $('<p>George is instance of Object: ' + Ancestry.instanceOf(george, Object) + '</p>') .appendTo('body');
  $('<p>Lindsay is instance of Bluth: ' + Ancestry.instanceOf(lindsay, Bluth) + '</p>') .appendTo('body');
  $('<p>Lindsay is instance of Funke: ' + Ancestry.instanceOf(lindsay, Funke) + '</p>') .appendTo('body');
  $('<p>Lindsay does not wear jorts: ' + (!lindsay.wearsJorts()) + '</p>') .appendTo('body');
});
