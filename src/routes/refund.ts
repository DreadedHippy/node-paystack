import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import { RefundCreateRequestData, RefundListRequestParams } from '../interfaces/refund.request';

class Refund {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'refund';
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
   * @description Initiate a refund on your integration
   * @param {RefundCreateRequestData} data - The body of the API request
   * @example
   * Example usage of `create` method
   * ```js
   * refund.create({
   *   "transaction": 1641
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Refund has been queued for processing",
   *   "data": {
   *     "transaction": {
   *       "id": 1004723697,
   *       "domain": "live",
   *       "reference": "T685312322670591",
   *       "amount": 10000,
   *       "paid_at": "2021-08-20T18:34:11.000Z",
   *       "channel": "apple_pay",
   *       "currency": "NGN",
   *       "authorization": {
   *         "exp_month": null,
   *         "exp_year": null,
   *         "account_name": null
   *       },
   *       "customer": {
   *         "international_format_phone": null
   *       },
   *       "plan": {},
   *       "subaccount": {
   *         "currency": null
   *       },
   *       "split": {},
   *       "order_id": null,
   *       "paidAt": "2021-08-20T18:34:11.000Z",
   *       "pos_transaction_data": null,
   *       "source": null,
   *       "fees_breakdown": null
   *     },
   *     "integration": 412829,
   *     "deducted_amount": 0,
   *     "channel": null,
   *     "merchant_note": "Refund for transaction T685312322670591 by test@me.com",
   *     "customer_note": "Refund for transaction T685312322670591",
   *     "status": "pending",
   *     "refunded_by": "test@me.com",
   *     "expected_at": "2021-12-16T09:21:17.016Z",
   *     "currency": "NGN",
   *     "domain": "live",
   *     "amount": 10000,
   *     "fully_deducted": false,
   *     "id": 3018284,
   *     "createdAt": "2021-12-07T09:21:17.122Z",
   *     "updatedAt": "2021-12-07T09:21:17.122Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  create = (data: RefundCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  /**
   * @description List refunds available on your integration
   * @param {RefundListRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `list` method
   * ```js
   * refund.list()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Refunds retrieved",
   *   "data": [
   *     {
   *       "id": 1,
   *       "integration": 100982,
   *       "domain": "live",
   *       "transaction": 1641,
   *       "dispute": 20,
   *       "amount": 500000,
   *       "deducted_amount": 500000,
   *       "currency": "NGN",
   *       "channel": "migs",
   *       "fully_deducted": 1,
   *       "refunded_by": "customer@gmail.com",
   *       "refunded_at": "2018-01-12T10:54:47.000Z",
   *       "expected_at": "2017-10-01T21:10:59.000Z",
   *       "settlement": null,
   *       "customer_note": "xxx",
   *       "merchant_note": "xxx",
   *       "created_at": "2017-09-24T21:10:59.000Z",
   *       "updated_at": "2018-01-18T11:59:56.000Z",
   *       "status": "processed"
   *     },
   *     {
   *       "id": 2,
   *       "integration": 100982,
   *       "domain": "test",
   *       "transaction": 323896,
   *       "dispute": 45,
   *       "amount": 500000,
   *       "deducted_amount": null,
   *       "currency": "NGN",
   *       "channel": "migs",
   *       "fully_deducted": null,
   *       "refunded_by": "customer@gmail.com",
   *       "refunded_at": "2017-09-24T21:11:53.000Z",
   *       "expected_at": "2017-10-01T21:11:53.000Z",
   *       "settlement": null,
   *       "customer_note": "xxx",
   *       "merchant_note": "xxx",
   *       "created_at": "2017-09-24T21:11:53.000Z",
   *       "updated_at": "2017-09-24T21:11:53.000Z",
   *       "status": "pending"
   *     }
   *   ]
   * }
   * ```
   * @returns {Promise<any>}
   */
  list = (params?: RefundListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  /**
   * @description Get details of a refund on your integration
   * @param {string | number} reference - Identifier for transaction to be refunded
   * @example
   * Example usage of `fetch` method
   * ```js
   * refund.fetch(1641)
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Refund retrieved",
   *   "data": {
   *     "integration": 100982,
   *     "transaction": 1641,
   *     "dispute": null,
   *     "settlement": null,
   *     "domain": "live",
   *     "amount": 500000,
   *     "deducted_amount": 500000,
   *     "fully_deducted": true,
   *     "currency": "NGN",
   *     "channel": "migs",
   *     "status": "processed",
   *     "refunded_by": "eseyinwale@gmail.com",
   *     "refunded_at": "2018-01-12T10:54:47.000Z",
   *     "expected_at": "2017-10-01T21:10:59.000Z",
   *     "customer_note": "xxx",
   *     "merchant_note": "xxx",
   *     "id": 1,
   *     "createdAt": "2017-09-24T21:10:59.000Z",
   *     "updatedAt": "2018-01-18T11:59:56.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetch = (reference: string | number) => {
    return this.apiRequest({ method: 'GET', url: `${reference}` });
  };
}

export default Refund;
