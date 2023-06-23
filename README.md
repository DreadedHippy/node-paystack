# NodeJS Paystack API Wrapper by Aizon
This is a simple Paystack API wrapper for Node.js designed to be easy to use.

## Features
- Full support for all Paystack API routes as at 2023/06/23
- VSCode intellisense support for most routes
- Much more coming soon

## Getting started
### Installation
To install, simply run the command `npm i @aizon/node-paystack`

### Usage
```js
// Import or require the library
const node_paystack = require("@aizon/node-paystack")("<api-key>")

//or alternatively

const node_paystack = require("@aizon/node-paystack")
const paystack = node_paystack("<api-key">)
```
You can also pass configuration parameters, which can be useful for debugging. Like so:
```js
const node_paystack = require("@aizon/node-paystack")("<api-key>", {showRaw: true})
// By default, the axios reponse is transformed to display just the data from the server.
// `showRaw` config option displays the raw, unaltered axios response


const node_paystack = require("@aizon/node-paystack")("<api-key>", {hideHttpErrorStatus: true})
// By default, when an error is received from the server, its HTTP status is displayed.
// `hideHttpErrorStatus` config option, hides this, and displays just the server's response

// All config options are false by default
```

### Making API calls
You can begin making API calls by emulating the following, this returns promisified responses from the server.
```js
// Method 1
paystack.customer.list()
.then(result => console.log(result))
.catch(error => console.log(error));

// Method 2
const result = await paystack.customer.list()
console.log(result);
```
