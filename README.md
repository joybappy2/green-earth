
#### 1) What is the difference between var, let, and const?
**Answer**
`var` var is function scoped. var is not used in modern js because var can be redeclared, reassigned or can be cause of unwanted error. 

`let` let is block scoped. It only accessible inside a block{}. let can't be redeclared but let can be reassigned. let is used in modern js.

`const` is also block scoped. It can't be redeclared or reassigned and can't access out side block{}



#### 2) What is the difference between map(), forEach(), and filter()? 
**Answer**
`map()` is an array method. Ii loop through array items each time it gives a single item and we can perform task on each item and then it returns a new array after doing each task on items.

`forEach()` is also an array method. it also used to do task on each item. but it doesn't retrun anything witout undefined. 

`filter()` is also array method . It is used to get item based on condition. It returns an array of the filtered items. 



#### 3) What are arrow functions in ES6?
**Answer**
`arrow function` is the modern way to write function in js. It doesn't need to write function keyword. arrow function is short and clean by syntax. It doesn't require () for single parameter and for single line it doesn't need {}. It can be declared like a varibale. 
e.g. `const message = ()=> console.log('hello')



#### 4) How does destructuring assignment work in ES6?
**Answer**
`destructring` is used to store array or object data in variables. For array destructring we use [] and for object destructring {}
e.g. 
const numbers = [1,2,3]
const [first, second, third] = numbers
in the above from numbers array 1 will be stored in first and 2 in second and 3 in third. later we can use first second and third as variable.

for object the rule is same but {} is used.



#### 5) Explain template literals in ES6. How are they different from string concatenation?
**Answer**
`template literals` is used to make dynamic string. We use backtic instead of quotation. inside backtic we can write variables using ${}. Also inside ${} writing expression is valid. 
We need to use (',') inside concatenation but in template literals no need to use comma. We can write any charecter inside literals.
