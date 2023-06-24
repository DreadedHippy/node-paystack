import {
  PaymentRequestFinalizeRequestData,
  PaymentRequestUpdateRequestData,
} from './../interfaces/payment_request.request';
import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import {
  PaymentRequestCreateRequestData,
  PaymentRequestListRequestParams,
} from '../interfaces/payment_request.request';

class PaymentRequest {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'paymentrequest';
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
   * @description Create a payment request for a transaction on your integration
   * @param {PaymentRequestCreateRequestData} data - The body of the API request
   * @example
   * Example usage of `create` method
   * ```js
   * paymentRequest.create({
   *   "description": "a test invoice",
   *   "line_items": [
   *     {"name": "item 1", "amount": 20000},
   *     {"name": "item 2", "amount": 20000}
   *   ],
   *   "tax": [
   *     {"name": "VAT", "amount": 2000}
   *   ],
   *   "customer": "CUS_xwaj0txjryg393b",
   *   "due_date": "2020-07-08"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Payment request created",
   *   "data": {
   *     "id": 3136406,
   *     "domain": "test",
   *     "amount": 42000,
   *     "currency": "NGN",
   *     "due_date": "2020-07-08T00:00:00.000Z",
   *     "has_invoice": true,
   *     "invoice_number": 1,
   *     "description": "a test invoice",
   *     "line_items": [
   *       {
   *         "name": "item 1",
   *         "amount": 20000
   *       },
   *       {
   *         "name": "item 2",
   *         "amount": 20000
   *       }
   *     ],
   *     "tax": [
   *       {
   *         "name": "VAT",
   *         "amount": 2000
   *       }
   *     ],
   *     "request_code": "PRQ_1weqqsn2wwzgft8",
   *     "status": "pending",
   *     "paid": false,
   *     "metadata": null,
   *     "notifications": [],
   *     "offline_reference": "4286263136406",
   *     "customer": 25833615,
   *     "created_at": "2020-06-29T16:07:33.073Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  create = (data: PaymentRequestCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  /**
   * @description List the payment requests available on your integration
   * @param {PaymentRequestListRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `list` method
   * ```js
   * paymentRequest.list()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Payment requests retrieved",
   *   "data": [
   *     {
   *       "id": 3136406,
   *       "domain": "test",
   *       "amount": 42000,
   *       "currency": "NGN",
   *       "due_date": "2020-07-08T00:00:00.000Z",
   *       "has_invoice": true,
   *       "invoice_number": 1,
   *       "description": "a test invoice",
   *       "pdf_url": null,
   *       "line_items": [
   *         {
   *           "name": "item 1",
   *           "amount": 20000
   *         },
   *         {
   *           "name": "item 2",
   *           "amount": 20000
   *         }
   *       ],
   *       "tax": [
   *         {
   *           "name": "VAT",
   *           "amount": 2000
   *         }
   *       ],
   *       "request_code": "PRQ_1weqqsn2wwzgft8",
   *       "status": "pending",
   *       "paid": false,
   *       "paid_at": null,
   *       "metadata": null,
   *       "notifications": [],
   *       "offline_reference": "4286263136406",
   *       "customer": {
   *         "id": 25833615,
   *         "first_name": "Damilola",
   *         "last_name": "Odujoko",
   *         "email": "damilola@example.com",
   *         "customer_code": "CUS_xwaj0txjryg393b",
   *         "phone": null,
   *         "metadata": {
   *           "calling_code": "+234"
   *         },
   *         "risk_action": "default",
   *         "international_format_phone": null
   *       },
   *       "created_at": "2020-06-29T16:07:33.000Z"
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
  list = (params?: PaymentRequestListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  /**
   * @description Get details of a payment request on your integration
   * @param {string} idOrCode - The ID or code of the payment request you want to fetch
   * @example
   * Example usage of `fetch` method
   * ```js
   * paymentRequests.fetch("PRQ_1weqqsn2wwzgft8")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Payment request retrieved",
   *   "data": {
   *     "transactions": [],
   *     "domain": "test",
   *     "request_code": "PRQ_1weqqsn2wwzgft8",
   *     "description": "a test invoice",
   *     "line_items": [
   *       {
   *         "name": "item 1",
   *         "amount": 20000
   *       },
   *       {
   *         "name": "item 2",
   *         "amount": 20000
   *       }
   *     ],
   *     "tax": [
   *       {
   *         "name": "VAT",
   *         "amount": 2000
   *       }
   *     ],
   *     "amount": 42000,
   *     "discount": null,
   *     "currency": "NGN",
   *     "due_date": "2020-07-08T00:00:00.000Z",
   *     "status": "pending",
   *     "paid": false,
   *     "paid_at": null,
   *     "metadata": null,
   *     "has_invoice": true,
   *     "invoice_number": 1,
   *     "offline_reference": "4286263136406",
   *     "pdf_url": null,
   *     "notifications": [],
   *     "archived": false,
   *     "source": "user",
   *     "payment_method": null,
   *     "note": null,
   *     "amount_paid": null,
   *     "id": 3136406,
   *     "integration": 428626,
   *     "customer": {
   *       "transactions": [],
   *       "subscriptions": [],
   *       "authorizations": [],
   *       "first_name": "Damilola",
   *       "last_name": "Odujoko",
   *       "email": "damilola@example.com",
   *       "phone": null,
   *       "metadata": {
   *         "calling_code": "+234"
   *       },
   *       "domain": "test",
   *       "customer_code": "CUS_xwaj0txjryg393b",
   *       "risk_action": "default",
   *       "id": 25833615,
   *       "integration": 428626,
   *       "createdAt": "2020-06-29T16:06:53.000Z",
   *       "updatedAt": "2020-06-29T16:06:53.000Z"
   *     },
   *     "createdAt": "2020-06-29T16:07:33.000Z",
   *     "updatedAt": "2020-06-29T16:07:33.000Z",
   *     "pending_amount": 42000
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetch = (idOrCode: string) => {
    return this.apiRequest({ method: 'GET', url: `${idOrCode}` });
  };

  /**
   * @description Verify details of a payment request on your integration
   * @param {string} code - Payment Request code
   * @example
   * Example usage of `verify` method
   * ```js
   * dedicatedAccount.verify("PRQ_1weqqsn2wwzgft8")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Payment request retrieved",
   *   "data": {
   *     "id": 3136406,
   *     "domain": "test",
   *     "amount": 42000,
   *     "currency": "NGN",
   *     "due_date": "2020-07-08T00:00:00.000Z",
   *     "has_invoice": true,
   *     "invoice_number": 1,
   *     "description": "a test invoice",
   *     "pdf_url": null,
   *     "line_items": [
   *       {
   *         "name": "item 1",
   *         "amount": 20000
   *       },
   *       {
   *         "name": "item 2",
   *         "amount": 20000
   *       }
   *     ],
   *     "tax": [
   *       {
   *         "name": "VAT",
   *         "amount": 2000
   *       }
   *     ],
   *     "request_code": "PRQ_1weqqsn2wwzgft8",
   *     "status": "pending",
   *     "paid": false,
   *     "paid_at": null,
   *     "metadata": null,
   *     "notifications": [],
   *     "offline_reference": "4286263136406",
   *     "customer": {
   *       "id": 25833615,
   *       "first_name": "Damilola",
   *       "last_name": "Odujoko",
   *       "email": "damilola@example.com",
   *       "customer_code": "CUS_xwaj0txjryg393b",
   *       "phone": null,
   *       "metadata": {
   *         "calling_code": "+234"
   *       },
   *       "risk_action": "default",
   *       "international_format_phone": null
   *     },
   *     "created_at": "2020-06-29T16:07:33.000Z",
   *     "integration": {
   *       "key": "pk_test_xxxxxxxx",
   *       "name": "Paystack Documentation",
   *       "logo": "https://s3-eu-west-1.amazonaws.com/pstk-integration-logos/paystack.jpg",
   *       "allowed_currencies": [
   *         "NGN",
   *         "USD"
   *       ]
   *     },
   *     "pending_amount": 42000
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  verify = (code: string) => {
    return this.apiRequest({ method: 'GET', url: `verify/${code}` });
  };

  /**
   * @description Send notification of a payment request to your customers
   * @param {string} code - Payment Request code
   * @example
   * Example usage of `notify` method
   * ```js
   * paymentRequest.notify("PRQ_1weqqsn2wwzgft8")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Notification sent"
   * }
   * ```
   * @returns {Promise<any>}
   */
  notify = (code: string) => {
    return this.apiRequest({ method: 'POST', url: `notify/${code}` });
  };

  /**
   * @description Get payment requests metric
   * @example
   * Example usage of `total` method
   * ```js
   * paymentRequest.total()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Payment request totals",
   *   "data": {
   *     "pending": [
   *       {
   *         "currency": "NGN",
   *         "amount": 42000
   *       },
   *       {
   *         "currency": "USD",
   *         "amount": 0
   *       }
   *     ],
   *     "successful": [
   *       {
   *         "currency": "NGN",
   *         "amount": 0
   *       },
   *       {
   *         "currency": "USD",
   *         "amount": 0
   *       }
   *     ],
   *     "total": [
   *       {
   *         "currency": "NGN",
   *         "amount": 42000
   *       },
   *       {
   *         "currency": "USD",
   *         "amount": 0
   *       }
   *     ]
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  total = () => {
    return this.apiRequest({ method: 'GET', url: `totals` });
  };

  /**
   * @description Finalize a draft payment request
   * @param {string} code - Payment Request code
   * @param {PaymentRequestFinalizeRequestData} data - The body of the API request
   * @example
   * Example usage of `finalize` method
   * ```js
   * paymentRequest.finalize("PRQ_1weqqsn2wwzgft8")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Payment request finalized",
   *   "data": {
   *     "id": 3136496,
   *     "domain": "test",
   *     "amount": 45000,
   *     "currency": "NGN",
   *     "due_date": "2020-06-30T22:59:59.000Z",
   *     "has_invoice": true,
   *     "invoice_number": 2,
   *     "description": "Testing Invoice",
   *     "pdf_url": null,
   *     "line_items": [
   *       {
   *         "name": "Water",
   *         "amount": 15000,
   *         "quantity": 1
   *       },
   *       {
   *         "name": "Bread",
   *         "amount": 30000,
   *         "quantity": 1
   *       }
   *     ],
   *     "tax": [],
   *     "request_code": "PRQ_rtjkfk1tpmvqo40",
   *     "status": "pending",
   *     "paid": false,
   *     "paid_at": null,
   *     "metadata": null,
   *     "notifications": [],
   *     "offline_reference": "4286263136496",
   *     "customer": {
   *       "id": 25833615,
   *       "first_name": "Damilola",
   *       "last_name": "Odujoko",
   *       "email": "damilola@email.com",
   *       "customer_code": "CUS_xwaj0txjryg393b",
   *       "phone": null,
   *       "metadata": {
   *         "calling_code": "+234"
   *       },
   *       "risk_action": "default",
   *       "international_format_phone": null
   *     },
   *     "created_at": "2020-06-29T16:22:35.000Z",
   *     "pending_amount": 45000
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  finalize = (code: string, data: PaymentRequestFinalizeRequestData) => {
    return this.apiRequest({ method: 'POST', url: `finalize/${code}`, data });
  };

  /**
   * @description Update a payment request details on your integration
   * @param {string} code - Payment Request code
   * @param {PaymentRequestUpdateRequestData} data - The body of the API request
   * @example
   * Example usage of `update` method
   * ```js
   * paymentRequest.update("PRQ_1weqqsn2wwzgft8",{
   *   "description": "Update test invoice",
   *   "due_date": "2017-05-10"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Payment request updated",
   *   "data": {
   *     "id": 3136496,
   *     "domain": "test",
   *     "amount": 45000,
   *     "currency": "NGN",
   *     "due_date": "2020-06-30T22:59:59.000Z",
   *     "has_invoice": true,
   *     "invoice_number": 2,
   *     "description": "Update Testing",
   *     "pdf_url": null,
   *     "line_items": [
   *       {
   *         "name": "Water",
   *         "amount": 15000,
   *         "quantity": 1
   *       },
   *       {
   *         "name": "Bread",
   *         "amount": 30000,
   *         "quantity": 1
   *       }
   *     ],
   *     "tax": [],
   *     "request_code": "PRQ_rtjkfk1tpmvqo40",
   *     "status": "pending",
   *     "paid": false,
   *     "paid_at": null,
   *     "metadata": null,
   *     "notifications": [],
   *     "offline_reference": "4286263136496",
   *     "customer": {
   *       "id": 25833615,
   *       "first_name": "Doc",
   *       "last_name": "Test",
   *       "email": "doc@test.com",
   *       "customer_code": "CUS_xwaj0txjryg393b",
   *       "phone": null,
   *       "metadata": {
   *         "calling_code": "+234"
   *       },
   *       "risk_action": "default",
   *       "international_format_phone": null
   *     },
   *     "created_at": "2020-06-29T16:22:35.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  update = (code: string, data: PaymentRequestUpdateRequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${code}`, data });
  };

  /**
   * @description Used to archive a payment request. The payment request will no longer be fetched on list or returned on verify
   * @param {string} code - Payment Request code
   * @example
   * Example usage of `archive` method
   * ```js
   * paymentRequest.archive("PRQ_1weqqsn2wwzgft8")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Payment request has been archived"
   * }
   * ```
   * @returns {Promise<any>}
   */
  archive = (code: string) => {
    return this.apiRequest({ method: 'POST', url: `archive/${code}` });
  };
}

export default PaymentRequest;
