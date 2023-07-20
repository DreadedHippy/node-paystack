# @aizon/node-paystack 💫
##  [![npm version](https://badge.fury.io/js/@aizon%2Fnode-paystack.svg)](https://badge.fury.io/js/@aizon%2Fnode-paystack)  ![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/DreadedHippy/node-paystack) ![Workflow status](https://github.com/DreadedHippy/node-paystack/actions/workflows/npm-publish.yml/badge.svg) ![Repo Views](https://vbr.wocr.tk/badge?page_id=DreadedHippy.node-paystack&text=views&color=4EC820&logo=Github)

This is a simple Paystack API wrapper for Node.js designed to be easy to use. Use this npm package in your Node.js backend servers to seamlessly integrate paystack payments.

## Features
- Full support for all Paystack API routes as at 2023/06/23 🚀
- VSCode intellisense support for all routes 🚀
- Built with TypeScript for improved type safety 🚀

## Getting started
### Installation
To install, simply run the command `npm i @aizon/node-paystack` in your terminal

### Usage
***
### Quick tips
To use this package, you simply use any of the provided methods, e.g:
- `transaction.initialize()`: Initialize a transaction
- `customer.list()`: List customers
- `product.fetch()`: Fetch a product


All methods in this library will always return a [JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) response containing the following fields
- `status` (boolean, always present)
- `message` (string, always present)
- `data` (object, only present on a SUCCESSFUL response)
- `httpStatus` (objedt, only present on an UNSUCCESSFUL response

***
### Initializing and verifying transactions

Let's take a quick example to see the package in action
- Import the package:
```js
//Firstly import the installed library into your project

//CommonJS
const paystack = require("@aizon/node-paystack")("<api-key>")
//or alternatively
const node_paystack = require("@aizon/node-paystack")
const paystack = node_paystack("<api-key">)

//EJS
import node_paystack from "@aizon/node-paystack";
const paystack = node_paystack("<api-key>");

//TS
import node_paystack from "@aizon/node-paystack";
```

- (optional) Configure the package:

  Because this package uses `axios` under the hood, two(2) configuration options useful for debugging have been provided, which are:
  - showRaw (boolean)
  - hideHttpErrorStatus (boolean)

  *Note: all config options are set to false by default*

  You can use them like so:
```js
const node_paystack = require("@aizon/node-paystack")("<api-key>", {showRaw: true})
// By default, the axios reponse is transformed to display just the data from the server.
// `showRaw` config option displays the raw, unaltered axios response


const node_paystack = require("@aizon/node-paystack")("<api-key>", {hideHttpErrorStatus: true})
// By default, when an error is received from the server, its HTTP status is displayed.
// `hideHttpErrorStatus` config option, hides this, and displays just the server's response
```

- Make transaction:

  To complete transactions, you will first need to `initialize` a transaction, then `verify` the transaction using the `reference`returned
    1. With async/await
```js
async function makePayment() {

  // Initializing a transaction using the `transaction.initialize()` method and passing the transaction information
  let result = await paystack.transaction.initialize({
    email: "customer@email.com",
    amount: 100000 // Amount should be in kobo if currency is NGN, pesewas, if currency is GHS, and cents, if currency is ZAR
  })

  // Getting the transaction reference from the JSON data
  let reference = result.data.reference

  // Verifying the transaction using the `transaction.verify()` method and passing the `reference`
  let verification = await transaction.verify(reference)

  // The transaction is successful if the `status` of `verification` is true
  let isSuccessful = verification.status
  if(isSuccessful){
    console.log("Yay, transaction successful")
  }
}
```

  2. Without async/await
```js
paystack.transaction.initialize({
  email: "customer@email.com",
  amount: 100000
}).then( result => {
    let reference = result.data.reference;
    transaction.verify(reference).then( result => {  
      if(status == true) {
        console.log("Transaction verified")
      }      
  })  
})
```

- Full Code sample
```js
const paystack = require("@aizon/node-paystack")("<api-key>")

async function makePayment() {
  let result = await paystack.transaction.initialize({
    email: "customer@email.com",
    amount: 100000
  })
  let reference = result.data.reference;

  let verification = await transaction.verify(reference)

  let isSuccessful = verification.status;
  if(isSuccessful){
    console.log("Yay, transaction successful")
  }
}

makePayment();
```

## Routes:
Below are all the paystack routes supported by this package:
- applePay
  - listDomain
  - registerDomain
  - unregisterDomain
- bulkCharge
  - fetch
  - fetchCharges
  - initiate
  - list
  - pause
  - resume
- charge
  - checkPending
  - create
  - submitAddress
  - submitBirthday
  - submitOTP
  - submitPhone
  - submitPin
- customer
  - create
  - deactivateAuthorization
  - fetch
  - list
  - setRiskAction
  - update
  - validate
- dedicatedAccount
  - assign
  - create
  - deactivate
  - fetch
  - list
  - listProviders
  - removeSplit
  - requery
  - splitAccountTransaction
- dispute
  - addEvidence
  - export
  - fetch
  - getUploadURL
  - list
  - listTransactionDisputes
  - resolve
  - update
- integration
  - fetchTimeout
  - updateTimeout
- miscellaneous
  - listBanks
  - listCountries
  - listStates
- paymentPage
  - addProducts
  - checkSlugAvailability
  - create
  - fetch
  - list
  - update
- paymentRequest
  - archive
  - create
  - fetch
  - finalize
  - list
  - notify
  - total
  - update
  - verify
- plan
  - create
  - fetch
  - list
  - update
- product
  - create
  - fetch
  - list
  - update
- refund
  - create
  - fetch
  - list
- settlement
  - list
  - listTransactions
- split
  - create
  - fetch
  - list
  - removeSubaccount
  - update
  - upsertSubaccount
- subaccount
  - create
  - fetch
  - list
  - update
- subscription
  - create
  - enable
  - fetch
  - generateUpdateLink
  - list
  - sendUpdateLink
- terminal
  - create
  - decommission
  - fetch
  - fetchEventStatu
  - fetchTerminalStatus
  - list
  - sendEvent
  - update
- transaction
  - chargeAuthorization
  - export
  - fetch
  - initialize
  - list
  - partialDebit
  - timeline
  - totals
  - verify
- transfer
  - bulkInitialize
  - fetch
  - finalize
  - initiate
  - list
  - verify
- transferRecipient
  - bulkCreate
  - create
  - delete
  - fetch
  - list
  - update
- transfersControl
  - checkBalance
  - disableOTP
  - enableOTP
  - fetchBalanceLedger
  - finalizeDisableOTP
  - resendOTP
- verification
  - resolveAccount
  - resolveCardBin
  - validateAccount
  




