import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import { BulkChargeFetchChargeRequestParams, BulkChargeInitiateRequestData, BulkChargeListRequestParams } from '../interfaces/bulk_charge.request';

class BulkCharge {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(
    private axiosConfig: CreateAxiosDefaults,
    private clientConfig: ClientConfig
  ) {
    this.paystackClient.defaults.baseURL = baseURL + 'bulkcharge';
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
        ? errorData = errorData
        : (errorData.httpStatus = { statusCode: error.response?.status, statusMessage: error.response?.statusText });
      return this.clientConfig.showRaw ? error : errorData; // The data in the response of the axios error
    }
  };

  /**
   * @description Send an array of objects with authorization codes and amount (in **kobo** if currency is `NGN`, **pesewas**, if currency is `GHS`, and **cents** if currency is `ZAR`) so we can process transactions as a batch.
   * @param {object} data The body of the API request
   * @example
   * Example usage of `initiate` method
   *  ```js
   *  bulkCharge.initiate([
   *     {"authorization": "AUTH_ncx8hews93", "amount": 2500, "reference": "dam1266638dhhd"}, 
   *     {"authorization": "AUTH_xfuz7dy4b9", "amount": 1500, "reference": "dam1266638dhhe"}
   *  ])
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   *  ```
   * ***
   * Sample default Response
   * ```json
   *  {
   *   "status": true,
   *   "message": "Charges have been queued",
   *   "data": {
   *      "batch_code": "BCH_rrsbgwb4ivgzst1",
   *      "reference": "bulkcharge-1663150565684-p18nyoa68a",
   *      "id": 66608171,
   *      "integration": 463433,
   *      "domain": "test",
   *      "status": "active",
   *      "total_charges": 2,
   *      "pending_charges": 2,
   *      "createdAt": "2022-09-14T10:16:05.000Z",
   *      "updatedAt": "2022-09-14T10:16:05.000Z"
   *   }
   *  }
   * ```
   * @returns {Promise<any>}
   */
  initiate = (data: BulkChargeInitiateRequestData[]) => {
    return this.apiRequest({ method: 'POST', data });
  };

  
  /**
   * @description This lists all bulk charge batches created by the integration. Statuses can be `active`, `paused`, or `complete`.
   * @param {object} params The query params of the API request
   * @example
   * Example usage of the `list` method
   * ```js
   * bulkCharge.list()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response
   * ```json
   * {
   *   "status": true,
   *   "message": "Bulk charges retrieved",
   *   "data": [
   *     {
   *       "domain": "test",
   *       "batch_code": "BCH_1nV4L1D7cayggh",
   *       "status": "complete",
   *       "id": 1733,
   *       "createdAt": "2017-02-04T05:44:19.000Z",
   *       "updatedAt": "2017-02-04T05:45:02.000Z"
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
  list = (params?: BulkChargeListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  
  /**
   * @description This endpoint retrieves a specific batch code. It also returns useful information on its progress by way of the `total_charges` and `pending_charges` attributes.
   * @param {string} batchIdOrCode - An ID or code for the charge whose batches you want to retrieve.
   * @example
   * Example usage of the `fetch` method
   * ```js
   * bulkCharge.fetch("BCH_180tl7oq7cayggh")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response
   * ```json
   * {
   *   "status": true,
   *   "message": "Bulk charge retrieved",
   *   "data": {
   *     "domain": "test",
   *     "batch_code": "BCH_180tl7oq7cayggh",
   *     "status": "complete",
   *     "id": 17,
   *     "total_charges": 0,
   *     "pending_charges": 0,
   *     "createdAt": "2017-02-04T05:44:19.000Z",
   *     "updatedAt": "2017-02-04T05:45:02.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetch = (batchIdOrCode: string) => {
    return this.apiRequest({ method: 'GET', url: `${batchIdOrCode}` });
  };

  
  /**
   * @description This endpoint retrieves the charges associated with a specified batch code. Pagination parameters are available. You can also filter by status. Charge statuses can be `pending`, `success` or `failed`.
   * @param {string} batchIdOrCode - The batch Id or batch code of the required batch
   * @param {object} params - The query params of the API request
   * @example
   * Example usage of `fetchCharges` method
   * ```js
   * bulkCharge.fetchCharges("BCH_180tl7oq7cayggh")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response
   * ```json
   * {
   *   "status": true,
   *   "message": "Bulk charge items retrieved",
   *   "data": [
   *     {
   *       "integration": 100073,
   *       "bulkcharge": 18,
   *       "customer": {
   *         "id": 181336,
   *         "first_name": null,
   *         "last_name": null,
   *         "email": "test@again.com",
   *         "customer_code": "CUS_dw5posshfd1i5uj",
   *         "phone": null,
   *         "metadata": null,
   *         "risk_action": "default"
   *       },
   *       "authorization": {
   *         "authorization_code": "AUTH_jh3cfpca",
   *         "bin": "412345",
   *         "last4": "1381",
   *         "exp_month": "08",
   *         "exp_year": "2088",
   *         "channel": "card",
   *         "card_type": "visa visa",
   *         "bank": "TEST BANK",
   *         "country_code": "NG",
   *         "brand": "visa",
   *         "reusable": true,
   *         "account_name": "BoJack Horseman"
   *       },
   *       "transaction": {
   *         "id": 718835,
   *         "domain": "test",
   *         "status": "success",
   *         "reference": "2mr588n0ik9enja",
   *         "amount": 20500,
   *         "message": null,
   *         "gateway_response": "Successful",
   *         "paid_at": "2017-02-04T06:05:02.000Z",
   *         "created_at": "2017-02-04T06:05:02.000Z",
   *         "channel": "card",
   *         "currency": "NGN",
   *         "ip_address": null,
   *         "metadata": "",
   *         "log": null,
   *         "fees": null,
   *         "fees_split": null,
   *         "customer": {},
   *         "authorization": {},
   *         "plan": {},
   *         "subaccount": {},
   *         "paidAt": "2017-02-04T06:05:02.000Z",
   *         "createdAt": "2017-02-04T06:05:02.000Z"
   *       },
   *       "domain": "test",
   *       "amount": 20500,
   *       "currency": "NGN",
   *       "status": "success",
   *       "id": 15,
   *       "createdAt": "2017-02-04T06:04:26.000Z",
   *       "updatedAt": "2017-02-04T06:05:03.000Z"
   *     },
   *     {
   *       "integration": 100073,
   *       "bulkcharge": 18,
   *       "customer": {
   *         "id": 181336,
   *         "first_name": null,
   *         "last_name": null,
   *         "email": "duummy@email.com",
   *         "customer_code": "CUS_dw5posshfd1i5uj",
   *         "phone": null,
   *         "metadata": null,
   *         "risk_action": "default"
   *       },
   *       "authorization": {
   *         "authorization_code": "AUTH_qdyfjbl3",
   *         "bin": "412345",
   *         "last4": "1381",
   *         "exp_month": "08",
   *         "exp_year": "2018",
   *         "channel": "card",
   *         "card_type": "visa visa",
   *         "bank": "TEST BANK",
   *         "country_code": "NG",
   *         "brand": "visa",
   *         "reusable": true,
   *         "account_name": "BoJack Horseman"
   *       },
   *       "transaction": {
   *         "id": 718836,
   *         "domain": "test",
   *         "status": "success",
   *         "reference": "5xkmvfe2h4065zl",
   *         "amount": 11500,
   *         "message": null,
   *         "gateway_response": "Successful",
   *         "paid_at": "2017-02-04T06:05:02.000Z",
   *         "created_at": "2017-02-04T06:05:02.000Z",
   *         "channel": "card",
   *         "currency": "NGN",
   *         "ip_address": null,
   *         "metadata": "",
   *         "log": null,
   *         "fees": null,
   *         "fees_split": null,
   *         "customer": {},
   *         "authorization": {},
   *         "plan": {},
   *         "subaccount": {},
   *         "paidAt": "2017-02-04T06:05:02.000Z",
   *         "createdAt": "2017-02-04T06:05:02.000Z"
   *       },
   *       "domain": "test",
   *       "amount": 11500,
   *       "currency": "NGN",
   *       "status": "success",
   *       "id": 16,
   *       "createdAt": "2017-02-04T06:04:26.000Z",
   *       "updatedAt": "2017-02-04T06:05:03.000Z"
   *     }
   *   ],
   *   "meta": {
   *     "total": 2,
   *     "skipped": 0,
   *     "perPage": 50,
   *     "page": 1,
   *     "pageCount": 1
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetchCharges = (batchIdOrCode: string, params?: BulkChargeFetchChargeRequestParams) => {
    return this.apiRequest({ method: 'GET', url: `${batchIdOrCode}/charges`, params });
  };
  
  /**
   * @description Use this endpoint to pause processing a batch
   * @param {string} batchCode - The batch code of the required batch
   * @example
   * Example usage of `pause` method
   * ```js
   * bulkCharge.pause("BCH_180tl7oq7cayggh")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response
   * ```json
   * {
   *   "status": true,
   *   "message": "Bulk charge batch has been paused"
   * }
   * ```
   * @see {@link resume} method to resume processing a batch
   * @returns {Promise<any>}
   */
  pause = (batchCode: string) => {
    return this.apiRequest({ method: 'GET', url: `pause/${batchCode}` });
  };

  
  /**
   * @description Use this endpoint to resume processing a batch
   * @param {string} batchCode - The batch code of the required batch
   * @example
   * Example usage of `resume` method
   * ```js
   * bulkCharge.resume("BCH_180tl7oq7cayggh")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Bulk charge batch has been resumed"
   * }
   * ```
   * @see {@link pause} method to pause processing a batch
   * @returns {Promise<any>}
   */
  resume = (batchCode: string) => {
    return this.apiRequest({ method: 'GET', url: `resume/${batchCode}` });
  };
}

export default BulkCharge;
