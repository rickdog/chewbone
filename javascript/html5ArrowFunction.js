// http://www.uxebu.com/blog/2015/05/the-es6-arrow-function-a-usage-story/
// http://es6katas.org/

[1,2,3].map(function (val) { return [{"squared":val * val,"plus1":val+1}]})
//
[1,2,3].map(val => [{"squared":val * val,"plus1":val+1}])

// Replacing all `self` and most `bind()`
// ES5
var self = this;
doAsync(function(result) { self.onDone(result); })
// ES6
doAsync((result) => {this.onDone(result)})
// also valid without parens, for one parameter
doAsync(result => {this.onDone(result)})
 
// ES5
arr.map((function(){return this.process()}).bind(this))
// ES6
arr.map(() => this.process())


    [a, b, c] = ['abc']; // a='abc', b=undefined, c=undefined
    [a, b, c] = [...'abc']; // a='a', b='b', c='c'
    [a, b,c] = ['a', ...'12']; / a='1', b='1', c='2'
    [...rest] = ['1234', ...'5'];  / rest[0]='1234', rest[1]="5"

    const fn = (...rest) => { // rest=[1,2]
      console.log(rest);
    };
    fn(1, 2);

    const fn = (rest) => { // rest=1
      console.log(rest);
    };
    fn(1, 2);

    theEnd = [3, 4];
    allInOne = [1, 2, [theEnd]];
    console.log(allInOne)// = [ 1, 2, [[3, 4]] ]
    
    theEnd = [3, 4];
    allInOne = [1, 2, ...[theEnd]];
    console.log(allInOne) // = [ 1, 2, [3, 4] ]
    
    let [x, y] = ['ax', 'why'];
    [y, x] = [x, y];
    
    all = ['ax', 'why', 'zet'];
    [,,z] = all;   // z='zet'
    
    user = [['Some', 'One'], 23];
    [[firstName, surname], age] = user;  // firstName="some", surname="one""}, age=23
    [firstName, surname, age] = user;  // firstName={"some","one"}, surname=23, age=undefined
    expected = 'Some One = 23 years';
    `${firstName} ${surname} = ${age} years`  // "Some,One 23 = undefined years"
    
    
    for (var [a, b] of [[0, 1, 2]]) {}
    [a, b]  // a=0, b=1
    
    for (var [, a, b] of [[0, 1, 2]]) {}
    [a, b]  // a=1, b=2

    
    