# Promise tryall

[![Build Status](https://travis-ci.org/samgiles/tryall.svg?branch=master)](https://travis-ci.org/samgiles/tryall)

A Promise function that will try to resolve all of the Promises passed to it,
if any succeed, the promise will get resolved and will not error, if they ALL fail then the
promise is rejected.

This is useful for trying to do many concurrent operations at the same time
and collecting the results afterwards in a higher level abstraction.  See the
example.

## Bring your own `Promise`s

This module expects `Promise` to be defined on the global scope. Use something
like `es6-promise` to polyfill if it doesn not exist.

## Example

```JS
var tryall = require('tryall');

tryall([
	fetch("http://servicea.com"),
	fetch("http://serviceb.com"),
	fetch("http://servicec.com")
]).then(function(result) {
	if (result[0] !== undefined) {
		// Update some stuff relating to servicea.com
	}

	if (result[1] !== undefined) {
		// Update some stuff relating to serviceb.com
	}

	if (result[2] !== undefined) {
		// Update some stuff relating to servicec.com
	}

	return result;
}).catch(error) {
	// They ALL failed :(
	console.log("servicea.com failed because", error[0]);
	console.log("serviceb.com failed because", error[1]);
	console.log("servicec.com failed because", error[2]);
})
```

# License

MIT, (c) Samuel Giles 2015
