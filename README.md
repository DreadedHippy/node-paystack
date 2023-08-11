# @aizon/node-paystack 💫
##  [![npm version](https://badge.fury.io/js/@aizon%2Fnode-paystack.svg)](https://badge.fury.io/js/@aizon%2Fnode-paystack)  ![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/DreadedHippy/node-paystack) ![Workflow status](https://github.com/DreadedHippy/node-paystack/actions/workflows/npm-publish.yml/badge.svg) ![Repo Views](https://vbr.wocr.tk/badge?page_id=DreadedHippy.node-paystack&text=views&color=4EC820&logo=Github)

This is a simple Paystack API wrapper for Node.js designed to be easy to use. Use this npm package in your Node.js backend servers to seamlessly integrate paystack payments. View all supported routes [here](https://github.com/DreadedHippy/node-paystack#routes)

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
  let verification = await paystack.transaction.verify(reference)

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
    paystack.transaction.verify(reference).then( result => {  
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

  let verification = await paystack.transaction.verify(reference)

  let isSuccessful = verification.status;
  if(isSuccessful){
    console.log("Yay, transaction successful")
  }
}

makePayment();
```

## Routes:
Below are all the paystack routes supported by this package hyperlinked to their section on the official [**Paystack API documentation**](https://paystack.com/docs/api/):
- [applePay](https://paystack.com/docs/api/apple-pay/)
  - [listDomain](https://paystack.com/docs/api/apple-pay/#list-domains)
  - [registerDomain](https://paystack.com/docs/api/apple-pay/#register-domain)
  - [unregisterDomain](https://paystack.com/docs/api/apple-pay/#unregister-domain)
- [bulkCharge](https://paystack.com/docs/api/bulk-charge/)
  - [fetch](https://paystack.com/docs/api/bulk-charge/#fetch-batch)
  - [fetchCharges](https://paystack.com/docs/api/bulk-charge/#fetch-charge)
  - [initiate](https://paystack.com/docs/api/bulk-charge/#initiate)
  - [list](https://paystack.com/docs/api/bulk-charge/#list)
  - [pause](https://paystack.com/docs/api/bulk-charge/#pause)
  - [resume](https://paystack.com/docs/api/bulk-charge/#resume)
- [charge](https://paystack.com/docs/api/charge/)
  - [checkPending](https://paystack.com/docs/api/charge/#check)
  - [create](https://paystack.com/docs/api/charge/#create)
  - [submitAddress](https://paystack.com/docs/api/charge/#submit-address)
  - [submitBirthday](https://paystack.com/docs/api/charge/#submit-birthday)
  - [submitOTP](https://paystack.com/docs/api/charge/#submit-otp)
  - [submitPhone](https://paystack.com/docs/api/charge/#submit-phone)
  - [submitPin](https://paystack.com/docs/api/charge/#submit-pin)
- [customer](https://paystack.com/docs/api/customer/)
  - [create](https://paystack.com/docs/api/customer/#create)
  - [deactivateAuthorization](https://paystack.com/docs/api/customer/#deactivate-authorization)
  - [fetch](https://paystack.com/docs/api/customer/#fetch)
  - [list](https://paystack.com/docs/api/customer/#list)
  - [setRiskAction](https://paystack.com/docs/api/customer/#whitelist-blacklist)
  - [update](https://paystack.com/docs/api/customer/#update)
  - [validate](https://paystack.com/docs/api/customer/#validate)
- [dedicatedAccount](https://paystack.com/docs/api/dedicated-virtual-account/)
  - [assign](https://paystack.com/docs/api/dedicated-virtual-account/#assign)
  - [create](https://paystack.com/docs/api/dedicated-virtual-account/#create)
  - [deactivate](https://paystack.com/docs/api/dedicated-virtual-account/#deactivate)
  - [fetch](https://paystack.com/docs/api/dedicated-virtual-account/#fetch)
  - [list](https://paystack.com/docs/api/dedicated-virtual-account/#list)
  - [listProviders](https://paystack.com/docs/api/dedicated-virtual-account/#providers)
  - [removeSplit](https://paystack.com/docs/api/dedicated-virtual-account/#remove-split)
  - [requery](https://paystack.com/docs/api/dedicated-virtual-account/#requery)
  - [splitAccountTransaction](https://paystack.com/docs/api/dedicated-virtual-account/#add-split)
- [dispute](https://paystack.com/docs/api/dispute/)
  - [addEvidence](https://paystack.com/docs/api/dispute/#evidence)
  - [export](https://paystack.com/docs/api/dispute/#export)
  - [fetch](https://paystack.com/docs/api/dispute/#fetch)
  - [getUploadURL](https://paystack.com/docs/api/dispute/#upload-url)
  - [list](https://paystack.com/docs/api/dispute/#list)
  - [listTransactionDisputes](https://paystack.com/docs/api/dispute/#transaction)
  - [resolve](https://paystack.com/docs/api/dispute/#resolve)
  - [update](https://paystack.com/docs/api/dispute/#update)
- [integration](https://paystack.com/docs/api/integration/)
  - [fetchTimeout](https://paystack.com/docs/api/integration/#fetch-timeout)
  - [updateTimeout](https://paystack.com/docs/api/integration/#update-timeout)
- [miscellaneous](https://paystack.com/docs/api/miscellaneous/)
  - [listBanks](https://paystack.com/docs/api/miscellaneous/#bank)
  - [listCountries](https://paystack.com/docs/api/miscellaneous/#country)
  - [listStates](https://paystack.com/docs/api/miscellaneous/#avs-states)
- [paymentPage](https://paystack.com/docs/api/page/)
  - [addProducts](https://paystack.com/docs/api/page/#add-products)
  - [checkSlugAvailability](https://paystack.com/docs/api/page/#check-slug)
  - [create](https://paystack.com/docs/api/page/#create)
  - [fetch](https://paystack.com/docs/api/page/#fetch)
  - [list](https://paystack.com/docs/api/page/#list)
  - [update](https://paystack.com/docs/api/page/#update)
- [paymentRequest](https://paystack.com/docs/api/payment-request/)
  - [archive](https://paystack.com/docs/api/payment-request/#archive)
  - [create](https://paystack.com/docs/api/payment-request/#create)
  - [fetch](https://paystack.com/docs/api/payment-request/#fetch)
  - [finalize](https://paystack.com/docs/api/payment-request/#finalize)
  - [list](https://paystack.com/docs/api/payment-request/#list)
  - [notify](https://paystack.com/docs/api/payment-request/#send-notification)
  - [total](https://paystack.com/docs/api/payment-request/#total)
  - [update](https://paystack.com/docs/api/payment-request/#update)
  - [verify](https://paystack.com/docs/api/payment-request/#verify)
- [plan](https://paystack.com/docs/api/plan/)
  - [create](https://paystack.com/docs/api/plan/#create)
  - [fetch](https://paystack.com/docs/api/plan/#fetch)
  - [list](https://paystack.com/docs/api/plan/#list)
  - [update](https://paystack.com/docs/api/plan/#update)
- [product](https://paystack.com/docs/api/product/)
  - [create](https://paystack.com/docs/api/product/#create)
  - [fetch](https://paystack.com/docs/api/product/#fetch)
  - [list](https://paystack.com/docs/api/product/#list)
  - [update](https://paystack.com/docs/api/product/#update)
- [refund](https://paystack.com/docs/api/refund/)
  - [create](https://paystack.com/docs/api/refund/#create)
  - [fetch](https://paystack.com/docs/api/refund/#fetch)
  - [list](https://paystack.com/docs/api/refund/#list)
- [settlement](https://paystack.com/docs/api/settlement/)
  - [list](https://paystack.com/docs/api/settlement/#list)
  - [listTransactions](https://paystack.com/docs/api/settlement/#transactions)
- [split](https://paystack.com/docs/api/split/)
  - [create](https://paystack.com/docs/api/split/#create)
  - [fetch](https://paystack.com/docs/api/split/#fetch)
  - [list](https://paystack.com/docs/api/split/#list)
  - [removeSubaccount](https://paystack.com/docs/api/split/#remove-subaccount)
  - [update](https://paystack.com/docs/api/split/#update)
  - [upsertSubaccount](https://paystack.com/docs/api/split/#add-subaccount)
- [subaccount](https://paystack.com/docs/api/subaccount/)
  - [create](https://paystack.com/docs/api/subaccount/#create)
  - [fetch](https://paystack.com/docs/api/subaccount/#fetch)
  - [list](https://paystack.com/docs/api/subaccount/#list)
  - [update](https://paystack.com/docs/api/subaccount/#update)
- [subscription](https://paystack.com/docs/api/subscription/)
  - [create](https://paystack.com/docs/api/subscription/#create)
  - [disable](https://paystack.com/docs/api/subscription/#disable)
  - [enable](https://paystack.com/docs/api/subscription/#enable)
  - [fetch](https://paystack.com/docs/api/subscription/#fetch)
  - [generateUpdateLink](https://paystack.com/docs/api/subscription/#manage-link)
  - [list](https://paystack.com/docs/api/subscription/#list)
  - [sendUpdateLink](https://paystack.com/docs/api/subscription/#manage-email)
- [terminal](https://paystack.com/docs/api/terminal/)
  - [commission](https://paystack.com/docs/api/terminal/#commission)
  - [decommission](https://paystack.com/docs/api/terminal/#decommission)
  - [fetch](https://paystack.com/docs/api/terminal/#fetch)
  - [fetchEventStatu](https://paystack.com/docs/api/terminal/#fetch-event-status)
  - [fetchTerminalStatus](https://paystack.com/docs/api/terminal/#fetch-terminal-status)
  - [list](https://paystack.com/docs/api/terminal/#list)
  - [sendEvent](https://paystack.com/docs/api/terminal/#send-event)
  - [update](https://paystack.com/docs/api/terminal/#update)
- [transaction](https://paystack.com/docs/api/transaction/)
  - [chargeAuthorization](https://paystack.com/docs/api/transaction/#charge-authorization)
  - [export](https://paystack.com/docs/api/transaction/#export)
  - [fetch](https://paystack.com/docs/api/transaction/#fetch)
  - [initialize](https://paystack.com/docs/api/transaction/#initialize)
  - [list](https://paystack.com/docs/api/transaction/#list)
  - [partialDebit](https://paystack.com/docs/api/transaction/#partial-debit)
  - [timeline](https://paystack.com/docs/api/transaction/#view-timeline)
  - [totals](https://paystack.com/docs/api/transaction/#totals)
  - [verify](https://paystack.com/docs/api/transaction/#verify)
- [transfer](https://paystack.com/docs/api/transfer/)
  - [bulkInitiate](https://paystack.com/docs/api/transfer/#bulk)
  - [fetch](https://paystack.com/docs/api/transfer/#fetch)
  - [finalize](https://paystack.com/docs/api/transfer/#finalize)
  - [initiate](https://paystack.com/docs/api/transfer/#initiate)
  - [list](https://paystack.com/docs/api/transfer/#list)
  - [verify](https://paystack.com/docs/api/transfer/#verify)
- [transferRecipient](https://paystack.com/docs/api/transfer-recipient/)
  - [bulkCreate](https://paystack.com/docs/api/transfer-recipient/#bulk)
  - [create](https://paystack.com/docs/api/transfer-recipient/#create)
  - [delete](https://paystack.com/docs/api/transfer-recipient/#delete)
  - [fetch](https://paystack.com/docs/api/transfer-recipient/#fetch)
  - [list](https://paystack.com/docs/api/transfer-recipient/#list)
  - [update](https://paystack.com/docs/api/transfer-recipient/#update)
- [transfersControl](https://paystack.com/docs/api/transfer-control/)
  - [checkBalance](https://paystack.com/docs/api/transfer-control/#balance)
  - [disableOTP](https://paystack.com/docs/api/transfer-control/#disable-otp)
  - [enableOTP](https://paystack.com/docs/api/transfer-control/#enable-otp)
  - [fetchBalanceLedger](https://paystack.com/docs/api/transfer-control/#balance-ledger)
  - [finalizeDisableOTP](https://paystack.com/docs/api/transfer-control/#finalize-disable-otp)
  - [resendOTP](https://paystack.com/docs/api/transfer-control/#resend-otp)
- [verification](https://paystack.com/docs/api/verification/)
  - [resolveAccount](https://paystack.com/docs/api/verification/#resolve-account)
  - [resolveCardBin](https://paystack.com/docs/api/verification/#resolve-card)
  - [validateAccount](https://paystack.com/docs/api/verification/#validate-account)
  




