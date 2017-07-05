# SimpleQuery
[![Build Status](https://travis-ci.org/dbrekalo/simplequery.svg?branch=master)](https://travis-ci.org/dbrekalo/simplequery)
[![Coverage Status](https://coveralls.io/repos/github/dbrekalo/simplequery/badge.svg?branch=master)](https://coveralls.io/github/dbrekalo/simplequery?branch=master)
[![NPM Status](https://img.shields.io/npm/v/simple-query.svg)](https://www.npmjs.com/package/simple-query)

Lightweight implementation of jQuery api subset.
Designed as a thin wrapper around native browser apis. SimpleQuery is a small and fast library that you already know how to use.

[Visit documentation site](http://dbrekalo.github.io/simplequery/).

SimpleQuery core functionality will cost you less than 1KB. Import or require modules as you need them.
Need to manipulate element classes? Require "classes" module and toggle classes with jQuery api you are probably already familiar with.

Keep in mind that SimpleQuery does not do all that jQuery does. By design this library is a thin wrapper of browser native apis.
Because of that selecting elements will work only as good as native .querySelectorAll() does - as there is no custom selector engine implementation.
What works with SimpleQuery will work with jQuery - other way may not always be true. At any time you can switch to jQuery and keep your application running.

This library is best used for applications which require small javascript footprint and have a strict performance budget.
SimpleQuery is running on traffic heavy web application where jQuery is loaded as polyfill only when browser support is not good enough.

## Examples
Import library for usage
```js
var $ = require('simple-query');
```
Import modules needed for work you want to do:
```js
// require classes, attributes and ajax functionality
require('simple-query/src/classes');
require('simple-query/src/attributes');
require('simple-query/src/ajax');
```

Profit:
```js
// Manipulate classes
$('p.text').addClass('foo').toggleClass('bar');

// Manipulate Attributes
$('p.text').each(function() {
    console.log($(this).attr('title'));
});

// Get html from server and manipulate html
$.get('/test-html').done(function(html) {
    $('.content').html(html);
});
```
---

[Full set of examples is available in tests codebase](https://github.com/dbrekalo/simplequery/tree/master/tests)
where you see what can and cannot be done with SimpleQuery api.

## Modules
SimpleQuery functionality can be extended with following modules:
* **Ajax**: get and post data from server
* **Attribute**: get and set element attributes
* **Classes**: add, remove and toggle element classes
* **CSS**: get and set element style values
* **Data**: manipulate with data attributes of elements
* **Deep extend**: merge objects with nested structure
* **Deferreds**: use chain-able utility objects
* **Dimensions**: get element width, height and other dimensions
* **Events**: for adding simple element event listeners
* **Events advanced**: complex event listeners with namespaces and one time events
* **Manipulation**: manipulate with elements content and layout
* **Traversing**: find elements via selectors and element relations
* **Utils**: collection of useful helpers

## Installation
SimpleQuery is packaged as CommonJS module available via npm.

```bash
npm install simple-query --save
```