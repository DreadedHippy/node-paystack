import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import {
  TransferRecipientBulkCreateRequestData,
  TransferRecipientCreateRequestData,
  TransferRecipientListRequestParams,
  TransferRecipientUpdateRequestData,
} from '../interfaces/transfer_recipient.request';

class TransferRecipient {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'transferrecipient';
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
   * @description Creates a new recipient. A duplicate account number will lead to the retrieval of the existing record.
   * @param {TransferRecipientCreateRequestData} data - The body of the API request
   * @example
   * Example usage of `create` method
   * ```js
   * transferRecipient.create({
   *   "type": "nuban",
   *   "name": "Tolu Robert",
   *   "account_number": "01000000010",
   *   "bank_code": "058",
   *   "currency": "NGN"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Transfer recipient created successfully",
   *   "data": {
   *     "active": true,
   *     "createdAt": "2021-11-05T11:27:53.131Z",
   *     "currency": "NGN",
   *     "domain": "test",
   *     "id": 20317609,
   *     "integration": 463433,
   *     "name": "Tolu Robert",
   *     "recipient_code": "RCP_m7ljkv8leesep7p",
   *     "type": "nuban",
   *     "updatedAt": "2021-11-05T11:27:53.131Z",
   *     "is_deleted": false,
   *     "details": {
   *       "authorization_code": null,
   *       "account_number": "01000000010",
   *       "account_name": "Tolu Robert",
   *       "bank_code": "058",
   *       "bank_name": "Guaranty Trust Bank"
   *     }
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  create = (data: TransferRecipientCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  /**
   * @description Create multiple transfer recipients in batches. A duplicate account number will lead to the retrieval of the existing record.
   * @param {TransferRecipientBulkCreateRequestData} data - The body of the API request
   * @example
   * Example usage of `bulkCreate` method
   * ```js
   * transferRecipient.bulkCreate({
   *   "batch": [
   *     {
   *       "type":"nuban",
   *       "name" : "Habenero Mundane",
   *       "account_number": "0123456789",
   *       "bank_code": "033",
   *       "currency": "NGN"
   *     },
   *     {
   *       "type":"nuban",
   *       "name" : "Soft Merry",
   *       "account_number": "98765432310",
   *       "bank_code": "50211",
   *       "currency": "NGN"
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
   *   "message": "Recipients added successfully",
   *   "data": {
   *     "success": [
   *       {
   *         "domain": "test",
   *         "name": "Habenero Mundane",
   *         "type": "nuban",
   *         "description": "",
   *         "integration": 463433,
   *         "currency": "NGN",
   *         "metadata": null,
   *         "details": {
   *           "account_number": "0123456789",
   *           "account_name": null,
   *           "bank_code": "033",
   *           "bank_name": "United Bank For Africa"
   *         },
   *         "recipient_code": "RCP_wh5k8r4vzuh5c94",
   *         "active": true,
   *         "id": 10152540,
   *         "isDeleted": false,
   *         "createdAt": "2020-11-09T10:12:48.213Z",
   *         "updatedAt": "2020-11-09T10:12:48.213Z"
   *       },
   *       {
   *         "domain": "test",
   *         "name": "Soft Merry",
   *         "type": "nuban",
   *         "description": "",
   *         "integration": 463433,
   *         "currency": "NGN",
   *         "metadata": null,
   *         "details": {
   *           "account_number": "98765432310",
   *           "account_name": null,
   *           "bank_code": "50211",
   *           "bank_name": "Kuda Bank"
   *         },
   *         "recipient_code": "RCP_yu1kkyktoljnczg",
   *         "active": true,
   *         "id": 10152541,
   *         "isDeleted": false,
   *         "createdAt": "2020-11-09T10:12:48.213Z",
   *         "updatedAt": "2020-11-09T10:12:48.213Z"
   *       }
   *     ],
   *     "errors": []
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  bulkCreate = (data: TransferRecipientBulkCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: 'bulk' });
  };

  /**
   * @description List transfer recipients available on your integration
   * @param {TransferRecipientListRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `list` method
   * ```js
   * transferRecipient.list()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Recipients retrieved",
   *   "data": [
   *     {
   *       "domain": "test",
   *       "type": "nuban",
   *       "currency": "NGN",
   *       "name": "Flesh",
   *       "details": {
   *         "account_number": "01000000000",
   *         "account_name": null,
   *         "bank_code": "044",
   *         "bank_name": "Access Bank"
   *       },
   *       "metadata": {
   *         "job": "Eater"
   *       },
   *       "recipient_code": "RCP_2x5j67tnnw1t98k",
   *       "active": true,
   *       "id": 28,
   *       "createdAt": "2017-02-02T19:39:04.000Z",
   *       "updatedAt": "2017-02-02T19:39:04.000Z"
   *     },
   *     {
   *       "integration": 100073,
   *       "domain": "test",
   *       "type": "nuban",
   *       "currency": "NGN",
   *       "name": "Flesh",
   *       "details": {
   *         "account_number": "0100000010",
   *         "account_name": null,
   *         "bank_code": "044",
   *         "bank_name": "Access Bank"
   *       },
   *       "metadata": {},
   *       "recipient_code": "RCP_1i2k27vk4suemug",
   *       "active": true,
   *       "id": 27,
   *       "createdAt": "2017-02-02T19:35:33.000Z",
   *       "updatedAt": "2017-02-02T19:35:33.000Z"
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
  list = (params?: TransferRecipientListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  /**
   * @description Fetch the details of a transfer recipient
   * @param {string} idOrCode - An ID or code for the recipient whose details you want to receive.
   * @example
   * Example usage of `fetch` method
   * ```js
   * transferRecipient.fetch("RCP_2x5j67tnnw1t98k")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Recipient retrieved",
   *   "data": {
   *     "domain": "test",
   *     "type": "nuban",
   *     "currency": "NGN",
   *     "name": "Flesh",
   *     "details": {
   *       "account_number": "01000000000",
   *       "account_name": null,
   *       "bank_code": "044",
   *       "bank_name": "Access Bank"
   *     },
   *     "metadata": {
   *       "job": "Eater"
   *     },
   *     "recipient_code": "RCP_2x5j67tnnw1t98k",
   *     "active": true,
   *     "id": 28,
   *     "createdAt": "2017-02-02T19:39:04.000Z",
   *     "updatedAt": "2017-02-02T19:39:04.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetch = (idOrCode: string) => {
    return this.apiRequest({ method: 'GET', url: `${idOrCode}` });
  };

  /**
   * @description Update transfer recipients available on your integration
   * @param {string} idOrCode - Transfer Recipient's ID or code
   * @param {TransferRecipientUpdateRequestData} data - The body of the API request
   * @example
   * Example usage of `update` method
   * ```js
   * transferRecipient.update("RCP_2x5j67tnnw1t98k", {
   *   "name": "Rick Sanchez"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Recipient updated",
   *   "data": {
   *     "type": "nuban",
   *     "name": "Rick Sanchez",
   *     "metadata": {
   *       "job": "Flesh Eater",
   *       "retired": true
   *     },
   *     "domain": "test",
   *     "details": {
   *       "account_number": "01000000010",
   *       "account_name": null,
   *       "bank_code": "044",
   *       "bank_name": "Access Bank"
   *     },
   *     "currency": "NGN",
   *     "recipient_code": "RCP_1i2k27vk4suemug",
   *     "active": true,
   *     "id": 27,
   *     "createdAt": "2017-02-02T19:35:33.686Z",
   *     "updatedAt": "2017-02-02T19:35:33.686Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  update = (idOrCode: string, data: TransferRecipientUpdateRequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${idOrCode}`, data });
  };

  /**
   * @description Delete a transfer recipient (sets the transfer recipient to inactive)
   * @param {string} idOrCode - Transfer Recipient's ID or code
   * @example
   * Example usage of `delete` method
   * ```js
   * transferRecipient.delete("RCP_2x5j67tnnw1t98k")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Transfer recipient set as inactive"
   * }
   * ```
   * @returns {Promise<any>}
   */
  delete = (idOrCode: string) => {
    return this.apiRequest({ method: 'DELETE', url: `${idOrCode}` });
  };
}

export default TransferRecipient;
