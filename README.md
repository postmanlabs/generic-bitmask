# Bitmask

[![Greenkeeper badge](https://badges.greenkeeper.io/postmanlabs/generic-bitmask.svg)](https://greenkeeper.io/)

This module enables easy manipulation and usage of bitmasking technique in JavaScript.

## What is bitmask?

A bit mask is a binary number or a bitmap where the desired bit(s) are one and the remaining 0. By performing a bitwise 
AND operation of a value with a bitmask, one can test for certain bits being on.

Using a bitmask, it is very easy to store the boolean status of multiple flags in a single variable (of higher base.) A
very common use case is to store "permission" value for an object. For example, whether an entity has read or write
permission to an object can be determined easily by storing two flags "read" and "write" within a single variable.

More details on this detailed [Wikipedia article on Bitmasking](https://en.wikipedia.org/wiki/Mask_(computing)).

## Installation

Installation can be done using npm for using in NodeJS applications.

```terminal
npm install generic-bitmask --save-dev;
```

## Usage

```javascript
var Bitmask = require('generic-bitmask').Mask;

// create a new instance of bitmask
var mask = new Bitmask();

// Set the mask flags for the mask
mask.add(3); // sets 3rd bit to positive
mask.add(5); // sets 5th bit to positive

// check which bit is set to true
console.log(mask.test(3)); // logs true;
console.log(mask.test(4)); // logs false;

// remove a bit that has been set as true
mask.remove(5);
console.log(mask.test(5)); // logs false;

// Get the raw state of the mask in decimal value
console.log(mask.get()); // logs 8;

// Set the raw state of the mask. Useful to load saved mask state
mask.set(40); // sets 3 and 5 to true;
console.log(mask.test(3)); // logs true;
console.log(mask.test(4)); // logs false;
console.log(mask.test(5)); // logs true;
console.log(mask.test([3, 5])); // logs true;
```

### Using the mask descriptor

```javascript
var Bitmask = require('generic-bitmask').Mask,
	Descriptor = require('generic-bitmask').Descriptor;

// create a new instance of bitmask
var mask = new Bitmask(),
	descriptors = new Descriptor({
		read: 1,
		write: 2
	});

// Set the mask flags for the mask
descriptor.add('read', mask);
descriptor.validate('read', mask); // returns true
descriptor.extract(mask); // returns ['read']
descriptor.remove('read', mask);

// Check if bit names are set
descriptor.defined('read') // returns true
```