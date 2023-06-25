import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import {
  TransactionChargeAuthorizationRequestData,
  TransactionExportRequestParams,
  TransactionInitializeRequestData,
  TransactionListRequestParams,
  TransactionPartialDebitRequestData,
  TransactionTotalsRequestParams,
} from '../interfaces/transaction.request';

class Transaction {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'transaction';
  }

  private apiRequest = async (requestConfig: AxiosRequestConfig) => {
    try {
      const result = await this.paystackClient(requestConfig);
      return this.clientConfig.showRaw ? result : result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      // console.log(error)
      let errorData = error.response?.data || error.cause;
      error.response?.data === undefined
        ? (errorData = { error: 'Data not received', cause: error.cause })
        : this.clientConfig.hideHttpErrorStatus
        ? (errorData = errorData)
        : (errorData.httpStatus = { statusCode: error.response?.status, statusMessage: error.response?.statusText });
      return this.clientConfig.showRaw ? error : errorData; // The data in the response of the axios error
    }
  };

  /**
   * @description Initialize a transaction from your backend
   * @param {TransactionInitializeRequestData} data - The body of the API request
   * @example
   * Example usage of `initialize` method
   * ```js
   * transaction.initialize({
   *   "email": "customer@email.com",
   *   "amount": "20000"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Authorization URL created",
   *   "data": {
   *     "authorization_url": "https://checkout.paystack.com/0peioxfhpn",
   *     "access_code": "0peioxfhpn",
   *     "reference": "7PVGX8MEk85tgeEpVDtD"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  initialize = (data: TransactionInitializeRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `initialize` });
  };

  /**
   * @description Confirm the status of a transaction
   * @param {string} reference - The transaction reference used to initiate the transaction
   * @example
   * Example usage of `verify` method
   * ```js
   * transaction.verify("rd0bz6z2wu")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Verification successful",
   *   "data": {
   *     "id": 2009945086,
   *     "domain": "test",
   *     "status": "success",
   *     "reference": "rd0bz6z2wu",
   *     "amount": 20000,
   *     "message": null,
   *     "gateway_response": "Successful",
   *     "paid_at": "2022-08-09T14:21:32.000Z",
   *     "created_at": "2022-08-09T14:20:57.000Z",
   *     "channel": "card",
   *     "currency": "NGN",
   *     "ip_address": "100.64.11.35",
   *     "metadata": "",
   *     "log": {
   *       "start_time": 1660054888,
   *       "time_spent": 4,
   *       "attempts": 1,
   *       "errors": 0,
   *       "success": true,
   *       "mobile": false,
   *       "input": [],
   *       "history": [
   *         {
   *           "type": "action",
   *           "message": "Attempted to pay with card",
   *           "time": 3
   *         },
   *         {
   *           "type": "success",
   *           "message": "Successfully paid with card",
   *           "time": 4
   *         }
   *       ]
   *     },
   *     "fees": 100,
   *     "fees_split": null,
   *     "authorization": {
   *       "authorization_code": "AUTH_ahisucjkru",
   *       "bin": "408408",
   *       "last4": "4081",
   *       "exp_month": "12",
   *       "exp_year": "2030",
   *       "channel": "card",
   *       "card_type": "visa ",
   *       "bank": "TEST BANK",
   *       "country_code": "NG",
   *       "brand": "visa",
   *       "reusable": true,
   *       "signature": "SIG_yEXu7dLBeqG0kU7g95Ke",
   *       "account_name": null
   *     },
   *     "customer": {
   *       "id": 89929267,
   *       "first_name": null,
   *       "last_name": null,
   *       "email": "hello@email.com",
   *       "customer_code": "CUS_i5yosncbl8h2kvc",
   *       "phone": null,
   *       "metadata": null,
   *       "risk_action": "default",
   *       "international_format_phone": null
   *     },
   *     "plan": null,
   *     "split": {},
   *     "order_id": null,
   *     "paidAt": "2022-08-09T14:21:32.000Z",
   *     "createdAt": "2022-08-09T14:20:57.000Z",
   *     "requested_amount": 20000,
   *     "pos_transaction_data": null,
   *     "source": null,
   *     "fees_breakdown": null,
   *     "transaction_date": "2022-08-09T14:20:57.000Z",
   *     "plan_object": {},
   *     "subaccount": {}
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  verify = (reference: string) => {
    return this.apiRequest({ method: 'GET', url: `verify/${reference}` });
  };

  /**
   * @description List transactions carried out on your integration
   * @param {TransactionListRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `list` method
   * ```js
   * transaction.list()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Transactions retrieved",
   *   "data": [
   *     {
   *       "id": 5833,
   *       "domain": "test",
   *       "status": "failed",
   *       "reference": "icy9ma6jd1",
   *       "amount": 100,
   *       "message": null,
   *       "gateway_response": "Declined",
   *       "paid_at": null,
   *       "created_at": "2016-09-29T00:00:05.000Z",
   *       "channel": "card",
   *       "currency": "NGN",
   *       "ip_address": null,
   *       "metadata": null,
   *       "timeline": null,
   *       "customer": {
   *         "first_name": "Test",
   *         "last_name": "Dummy",
   *         "email": "test@dummy.com",
   *         "phone": "16504173147",
   *         "metadata": null,
   *         "customer_code": "CUS_1uld4hluw0g2gn0"
   *       },
   *       "authorization": {},
   *       "plan": {},
   *       "requested_amount": 100
   *     },
   *     {
   *       "id": 298126,
   *       "domain": "live",
   *       "status": "failed",
   *       "reference": "z1gsnks86e6kfo8",
   *       "amount": 10000,
   *       "message": null,
   *       "gateway_response": "Declined",
   *       "paid_at": null,
   *       "created_at": "2016-09-29T00:03:22.000Z",
   *       "channel": "card",
   *       "currency": "NGN",
   *       "ip_address": null,
   *       "metadata": {
   *         "custom_fields": [
   *           {
   *             "display_name": "Mobile Number",
   *             "variable_name": "mobile_number",
   *             "value": "+2348012345678"
   *           }
   *         ]
   *       },
   *       "log": null,
   *       "fees": null,
   *       "paidAt": "2016-09-29T00:03:25.000Z",
   *       "createdAt": "2016-09-29T00:03:22.000Z",
   *       "authorization": {
   *         "authorization_code": "AUTH_86gs11dr",
   *         "bin": "539983",
   *         "last4": "0061",
   *         "exp_month": "08",
   *         "exp_year": "2018",
   *         "card_type": "mastercard DEBIT",
   *         "bank": "Guaranty Trust Bank",
   *         "country_code": "NG",
   *         "brand": "mastercard",
   *         "account_name": "BoJack Horseman"
   *       },
   *       "customer": {
   *         "id": 8279,
   *         "first_name": "Test",
   *         "last_name": "Dummy",
   *         "email": "test@dummy.com",
   *         "phone": "16504173147",
   *         "customer_code": "CUS_1uld4hluw0g2gn0",
   *         "metadata": null,
   *         "risk_action": "default"
   *       },
   *       "requested_amount": 10000
   *     }
   *   ],
   *   "meta": {
   *     "total": 1,
   *     "skipped": 0,
   *     "perPage": 50,
   *     "page": 1,
   *     "pageCount": 1
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  list = (params?: TransactionListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  /**
   * @description Get details of a transaction carried out on your integration
   * @param {string} id - An ID for the transaction to fetch. [**Important! See here**](https://paystack.com/docs/changelog/api/#june-2022)
   * @example
   * Example usage of `fetch` method
   * ```js
   * transaction.fetch(292584114)
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Transaction retrieved",
   *   "data": {
   *     "id": 292584114,
   *     "domain": "test",
   *     "status": "success",
   *     "reference": "203520101",
   *     "amount": 10000,
   *     "message": null,
   *     "gateway_response": "Successful",
   *     "paid_at": "2019-10-09T13:03:28.000Z",
   *     "created_at": "2019-10-09T13:00:16.000Z",
   *     "channel": "card",
   *     "currency": "NGN",
   *     "ip_address": "197.211.43.98",
   *     "metadata": {
   *       "custom_fields": [
   *         {
   *           "display_name": "Mobile Number",
   *           "variable_name": "mobile_number",
   *           "value": "+2348012345678"
   *         }
   *       ],
   *       "referrer": "http://localhost:3001/integration/microphone.html?"
   *     },
   *     "log": {
   *       "start_time": 1570626018,
   *       "time_spent": 192,
   *       "attempts": 1,
   *       "errors": 0,
   *       "success": true,
   *       "mobile": false,
   *       "input": [],
   *       "history": [
   *         {
   *           "type": "action",
   *           "message": "Attempted to pay with card",
   *           "time": 191
   *         },
   *         {
   *           "type": "success",
   *           "message": "Successfully paid with card",
   *           "time": 192
   *         }
   *       ]
   *     },
   *     "fees": 150,
   *     "fees_split": null,
   *     "authorization": {
   *       "authorization_code": "AUTH_2e4k18sj52",
   *       "bin": "408408",
   *       "last4": "4081",
   *       "exp_month": "12",
   *       "exp_year": "2020",
   *       "channel": "card",
   *       "card_type": "visa DEBIT",
   *       "bank": "Test Bank",
   *       "country_code": "NG",
   *       "brand": "visa",
   *       "reusable": true,
   *       "signature": "SIG_JrPFkMYhcu8AD75eQWKl",
   *       "account_name": "BoJack Horseman"
   *     },
   *     "customer": {
   *       "id": 1809887,
   *       "first_name": null,
   *       "last_name": null,
   *       "email": "customer@email.com",
   *       "customer_code": "CUS_0c35ys9w8ma5tbr",
   *       "phone": null,
   *       "metadata": null,
   *       "risk_action": "deny"
   *     },
   *     "plan": {},
   *     "subaccount": {},
   *     "order_id": null,
   *     "paidAt": "2019-10-09T13:03:28.000Z",
   *     "createdAt": "2019-10-09T13:00:16.000Z",
   *     "requested_amount": 1500000
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetch = (id: number) => {
    return this.apiRequest({ method: 'GET', url: `${id}` });
  };

  /**
   * @description All authorizations marked as reusable can be charged with this endpoint whenever you need to receive payments
   * @param {TransactionChargeAuthorizationRequestData} data - The body of the API request
   * @example
   * Example usage of `chargeAuthorization` method
   * ```js
   * transaction.chargeAuthorization({
   *   "email": "customer@email.com",
   *   "amount": "20000",
   *   "authorization_code": "AUTH_72btv547"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Charge attempted",
   *   "data": {
   *     "amount": 27000,
   *     "currency": "NGN",
   *     "transaction_date": "2020-05-27T11:45:03.000Z",
   *     "status": "success",
   *     "reference": "cn65lf4ixmkzvda",
   *     "domain": "test",
   *     "metadata": "",
   *     "gateway_response": "Approved",
   *     "message": null,
   *     "channel": "card",
   *     "ip_address": null,
   *     "log": null,
   *     "fees": 14500,
   *     "authorization": {
   *       "authorization_code": "AUTH_pmx3mgawyd",
   *       "bin": "408408",
   *       "last4": "4081",
   *       "exp_month": "12",
   *       "exp_year": "2020",
   *       "channel": "card",
   *       "card_type": "visa DEBIT",
   *       "bank": "Test Bank",
   *       "country_code": "NG",
   *       "brand": "visa",
   *       "reusable": true,
   *       "signature": "SIG_2Gvc6pNuzJmj4TCchXfp",
   *       "account_name": null
   *     },
   *     "customer": {
   *       "id": 23215815,
   *       "first_name": null,
   *       "last_name": null,
   *       "email": "mail@mail.com",
   *       "customer_code": "CUS_wt0zmhzb0xqd4nr",
   *       "phone": null,
   *       "metadata": null,
   *       "risk_action": "default"
   *     },
   *     "plan": null,
   *     "id": 696105928
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  chargeAuthorization = (data: TransactionChargeAuthorizationRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `charge_authorization` });
  };

  /**
   * @description View the timeline of a transaction
   * @param {string | number} idOrReference
   * @example
   * Example usage of `timeline` method
   * ```js
   * transaction.timeline("7PVGX8MEk85tgeEpVDtD")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Timeline retrieved",
   *   "data": {
   *     "time_spent": 9061,
   *     "attempts": 1,
   *     "authentication": null,
   *     "errors": 1,
   *     "success": false,
   *     "mobile": false,
   *     "input": [],
   *     "channel": "card",
   *     "history": [
   *       {
   *         "type": "open",
   *         "message": "Opened payment page",
   *         "time": 1
   *       },
   *       {
   *         "type": "input",
   *         "message": "Filled these fields: card number, card expiry, card cvc",
   *         "time": 39
   *       },
   *       {
   *         "type": "action",
   *         "message": "Attempted to pay",
   *         "time": 39
   *       },
   *       {
   *         "type": "error",
   *         "message": "Error: Declined",
   *         "time": 48
   *       },
   *       {
   *         "type": "input",
   *         "message": "Filled these fields: card expiry, card cvc",
   *         "time": 9061
   *       },
   *       {
   *         "type": "close",
   *         "message": "Page closed",
   *         "time": 9061
   *       }
   *     ]
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  timeline = async (idOrReference: string | number) => {
    return this.apiRequest({ method: 'GET', url: `timeline/${idOrReference.toString()}` });
  };

  /**
   * @description Total amount received on your account
   * @param {TransactionTotalsRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `totals` method
   * ```js
   * transaction.totals()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Transaction totals",
   *   "data": {
   *     "total_transactions": 10,
   *     "unique_customers": 3,
   *     "total_volume": 14000,
   *     "total_volume_by_currency": [
   *       {
   *         "currency": "NGN",
   *         "amount": 14000
   *       }
   *     ],
   *     "pending_transfers": 24000,
   *     "pending_transfers_by_currency": [
   *       {
   *         "currency": "NGN",
   *         "amount": 24000
   *       }
   *     ]
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  totals = (params?: TransactionTotalsRequestParams) => {
    return this.apiRequest({ method: 'GET', url: `totals`, params });
  };

  /**
   * @description Export a list of transactions carried out on your integration
   * @param {TransactionExportRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `export` method
   * ```js
   * transaction.export()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Export successful",
   *   "data": {
   *     "path": "https://files.paystack.co/exports/100032/1460290758207.csv"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  export = (params?: TransactionExportRequestParams) => {
    return this.apiRequest({ method: 'GET', url: `export`, params });
  };

  /**
   * @description Retrieve part of a payment from a customer
   * @param {TransactionPartialDebitRequestData} data - The body of the API request
   * @example
   * Example usage of `partialDebit` method
   * ```js
   * transaction.partialDebit({
   *   "authorization_code": "AUTH_72btv547",
   *   "currency": "NGN",
   *   "amount": "20000",
   *   "email": "customer@email.com"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Charge attempted",
   *   "data": {
   *     "amount": 409013,
   *     "currency": "NGN",
   *     "transaction_date": "2022-08-23T12:44:47.000Z",
   *     "status": "success",
   *     "reference": "iae89f2pj791ayd",
   *     "domain": "test",
   *     "metadata": "",
   *     "gateway_response": "Approved",
   *     "message": null,
   *     "channel": "card",
   *     "ip_address": null,
   *     "log": null,
   *     "fees": 2046,
   *     "authorization": {
   *       "authorization_code": "AUTH_dyzaebwx58",
   *       "bin": "408408",
   *       "last4": "4081",
   *       "exp_month": "12",
   *       "exp_year": "2030",
   *       "channel": "card",
   *       "card_type": "visa ",
   *       "bank": "TEST BANK",
   *       "country_code": "NG",
   *       "brand": "visa",
   *       "reusable": true,
   *       "signature": "SIG_yEXu7dLBeqG0kU7g95Ke",
   *       "account_name": null
   *     },
   *     "customer": {
   *       "id": 37651078,
   *       "first_name": null,
   *       "last_name": null,
   *       "email": "member@test.com",
   *       "customer_code": "CUS_q8vst7djnx3vq6d",
   *       "phone": null,
   *       "metadata": null,
   *       "risk_action": "default",
   *       "international_format_phone": null
   *     },
   *     "plan": 0,
   *     "requested_amount": 500000,
   *     "id": 2044566393
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  partialDebit = (data: TransactionPartialDebitRequestData) => {
    return this.apiRequest({ method: 'POST', url: `partial_debit`, data });
  };
}

export default Transaction;
