import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import {
  TransferBulkInitiateRequestData,
  TransferFinalizeRequestData,
  TransferInitiateRequestData,
  TransfersListRequestParams,
} from '../interfaces/transfer.request';

class Transfer {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);

  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'transfer';
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
   * @description Send money to your customers. Status of transfer object returned will be `pending` if `OTP` is disabled. In the event that an `OTP` is required, status will read `otp`.
   * @param {TransferInitiateRequestData} data - The body of the API request
   * @example
   * Example usage of `initiate` method
   * ```js
   * transfer.initiate({
   *   "source": "balance",
   *   "reason": "Calm down",
   *   "amount":3794800,
   *   "recipient": "RCP_gx2wn530m0i3w3m"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Transfer requires OTP to continue",
   *   "data": {
   *     "integration": 100073,
   *     "domain": "test",
   *     "amount": 3794800,
   *     "currency": "NGN",
   *     "source": "balance",
   *     "reason": "Calm down",
   *     "recipient": 28,
   *     "status": "otp",
   *     "transfer_code": "TRF_1ptvuv321ahaa7q",
   *     "id": 14,
   *     "createdAt": "2017-02-03T17:21:54.508Z",
   *     "updatedAt": "2017-02-03T17:21:54.508Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  initiate = (data: TransferInitiateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  /**
   * @description Finalize an initiated transfer
   * @param {TransferFinalizeRequestData} data - The body of the API request
   * @example
   * Example usage of `finalize` method
   * ```js
   * transfer.finalize({
   *   "transfer_code": "TRF_vsyqdmlzble3uii",
   *   "otp": "928783"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Transfer has been queued",
   *   "data": {
   *     "domain": "test",
   *     "amount": 1000000,
   *     "currency": "NGN",
   *     "reference": "n7ll9pzl6b",
   *     "source": "balance",
   *     "source_details": null,
   *     "reason": "E go better for you",
   *     "status": "success",
   *     "failures": null,
   *     "transfer_code": "TRF_zuirlnr9qblgfko",
   *     "titan_code": null,
   *     "transferred_at": null,
   *     "id": 529410,
   *     "integration": 123460,
   *     "recipient": 225204,
   *     "createdAt": "2018-08-02T10:02:55.000Z",
   *     "updatedAt": "2018-08-02T10:12:05.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  finalize = (data: TransferFinalizeRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: 'finalize_transfer' });
  };

  /**
   * @description Batch multiple transfers in a single request. You need to disable the Transfers OTP requirement to use this endpoint
   * @param {TransferBulkInitiateRequestData} data - The body of the API request
   * @example
   * Example usage of `bulkInitiate` method
   * ```js
   * transfer.bulkInitiate({
   *   "currency": "NGN",
   *   "source": "balance",
   *   "transfers": [
   *     {
   *       "amount": 20000,
   *       "reference": "588YtfftReF355894J",
   *       "reason": "Why not?",
   *       "recipient": "RCP_2tn9clt23s7qr28"
   *     },
   *     {
   *       "amount": 30000,
   *       "reference": "YunoTReF35e0r4J",
   *       "reason": "Because I can",
   *       "recipient": "RCP_1a25w1h3n0xctjg"
   *     },
   *     {
   *       "amount": 40000,
   *       "reason": "Coming right up",
   *       "recipient": "RCP_aps2aibr69caua7"
   *     }
   *   ]
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "3 transfers queued.",
   *   "data": [
   *     {
   *       "reference": "588YtfftReF355894J",
   *       "recipient": "RCP_2tn9clt23s7qr28",
   *       "amount": 20000,
   *       "transfer_code": "TRF_ful4rvpbiuaph4fo",
   *       "currency": "NGN",
   *       "status": "received"
   *     },
   *     {
   *       "reference": "YunoTReF35e0r4J",
   *       "recipient": "RCP_1a25w1h3n0xctjg",
   *       "amount": 30000,
   *       "transfer_code": "TRF_0lztrf3rox1rpbw1",
   *       "currency": "NGN",
   *       "status": "received"
   *     },
   *     {
   *       "reference": "nm7kjk9gb-l5i4lr9wq3",
   *       "recipient": "RCP_aps2aibr69caua7",
   *       "amount": 40000,
   *       "transfer_code": "TRF_hsk59k6loek7vlut",
   *       "currency": "NGN",
   *       "status": "received"
   *     }
   *   ]
   * }
   * ```
   * @returns {Promise<any>}
   */
  bulkInitiate = (data: TransferBulkInitiateRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: 'bulk' });
  };

  /**
   * @description List the transfers made on your integration.
   * @param {TransfersListRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `list` method
   * ```js
   * transfer.list()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Transfers retrieved",
   *   "data": [
   *     {
   *       "integration": 100073,
   *       "recipient": {
   *         "domain": "test",
   *         "type": "nuban",
   *         "currency": "NGN",
   *         "name": "Flesh",
   *         "details": {
   *           "account_number": "olounje",
   *           "account_name": null,
   *           "bank_code": "044",
   *           "bank_name": "Access Bank"
   *         },
   *         "description": "Eater",
   *         "metadata": null,
   *         "recipient_code": "RCP_2x5j67tnnw1t98k",
   *         "active": true,
   *         "id": 28,
   *         "integration": 100073,
   *         "createdAt": "2017-02-02T19:39:04.000Z",
   *         "updatedAt": "2017-02-02T19:39:04.000Z"
   *       },
   *       "domain": "test",
   *       "amount": 4400,
   *       "currency": "NGN",
   *       "source": "balance",
   *       "source_details": null,
   *       "reason": "Eater",
   *       "status": "otp",
   *       "failures": null,
   *       "transfer_code": "TRF_1ptvuv321ahaa7q",
   *       "id": 14,
   *       "createdAt": "2017-02-03T17:21:54.000Z",
   *       "updatedAt": "2017-02-03T17:21:54.000Z"
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
  list = (params?: TransfersListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  /**
   * @description Get details of a transfer on your integration.
   * @param {string} idOrCode - The ID or code of the transfer you want to fetch
   * @example
   * Example usage of `fetch` method
   * ```js
   * transfer.fetch("TRF_2x5j67tnnw1t98k")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Transfer retrieved",
   *   "data": {
   *     "recipient": {
   *       "domain": "test",
   *       "type": "nuban",
   *       "currency": "NGN",
   *       "name": "Flesh",
   *       "details": {
   *         "account_number": "olounje",
   *         "account_name": null,
   *         "bank_code": "044",
   *         "bank_name": "Access Bank"
   *       },
   *       "metadata": null,
   *       "recipient_code": "RCP_2x5j67tnnw1t98k",
   *       "active": true,
   *       "id": 28,
   *       "integration": 100073,
   *       "createdAt": "2017-02-02T19:39:04.000Z",
   *       "updatedAt": "2017-02-02T19:39:04.000Z"
   *     },
   *     "domain": "test",
   *     "amount": 4400,
   *     "currency": "NGN",
   *     "source": "balance",
   *     "source_details": null,
   *     "reason": "Redemption",
   *     "status": "pending",
   *     "failures": null,
   *     "transfer_code": "TRF_2x5j67tnnw1t98k",
   *     "id": 14938,
   *     "createdAt": "2017-02-03T17:21:54.000Z",
   *     "updatedAt": "2017-02-03T17:21:54.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetch = (idOrCode: string) => {
    return this.apiRequest({ method: 'GET', url: `${idOrCode}` });
  };

  /**
   * @descriptionVerify the status of a transfer on your integration.
   * @param {string} idOrCode - Transfer reference
   * @example
   * Example usage of `verify` method
   * ```js
   * transfer.verify("ref_demo")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Transfer retrieved",
   *   "data": {
   *     "integration": 119333,
   *     "recipient": {
   *       "domain": "test",
   *       "type": "nuban",
   *       "currency": "NGN",
   *       "name": "Zombie",
   *       "details": {
   *         "account_number": "0100000001",
   *         "account_name": null,
   *         "bank_code": "044",
   *         "bank_name": "Access Bank"
   *       },
   *       "description": "Zombier",
   *       "metadata": "",
   *       "recipient_code": "RCP_c2mty1w1uvd4av4",
   *       "active": true,
   *       "email": null,
   *       "id": 31911,
   *       "integration": 119333,
   *       "createdAt": "2017-10-13T20:35:51.000Z",
   *       "updatedAt": "2017-10-13T20:35:51.000Z"
   *     },
   *     "domain": "test",
   *     "amount": 50000,
   *     "currency": "NGN",
   *     "reference": "ref_demo",
   *     "source": "balance",
   *     "source_details": null,
   *     "reason": "Test for reference",
   *     "status": "success",
   *     "failures": null,
   *     "transfer_code": "TRF_kjati32r73poyt5",
   *     "titan_code": null,
   *     "transferred_at": null,
   *     "id": 476948,
   *     "createdAt": "2018-07-22T10:29:33.000Z",
   *     "updatedAt": "2018-07-22T10:29:33.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  verify = (reference: string) => {
    return this.apiRequest({ method: 'GET', url: `verify/${reference}` });
  };
}

export default Transfer;
