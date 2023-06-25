import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { createAxiosInstance } from '../utils/utils';
import { baseURL } from '../static/variables';
import { ClientConfig } from '../interfaces/global';
import {
  SubaccountCreateRequestData,
  SubaccountListRequestParams,
  SubaccountUpdateRequestData,
} from '../interfaces/subaccount.request';

class Subaccount {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'subaccount';
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
   * @description Create a subaccount on your integration
   * @param {SubaccountCreateRequestData} data - The body of the API request
   * @example
   * Example usage of `create` method
   * ```js
   * subaccount.create({
   *   "business_name": "Sunshine Studios",
   *   "settlement_bank": "044", 
   *   "account_number": "0193274682", 
   *   "percentage_charge": 18.2 
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Subaccount created",
   *   "data": {
   *     "integration": 100973,
   *     "domain": "test",
   *     "subaccount_code": "ACCT_4hl4xenwpjy5wb",
   *     "business_name": "Sunshine Studios",
   *     "description": null,
   *     "primary_contact_name": null,
   *     "primary_contact_email": null,
   *     "primary_contact_phone": null,
   *     "metadata": null,
   *     "percentage_charge": 18.2,
   *     "is_verified": false,
   *     "settlement_bank": "Access Bank",
   *     "account_number": "0193274682",
   *     "settlement_schedule": "AUTO",
   *     "active": true,
   *     "migrate": false,
   *     "id": 55,
   *     "createdAt": "2016-10-05T13:22:04.000Z",
   *     "updatedAt": "2016-10-21T02:19:47.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  create = (data: SubaccountCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  /**
   * @description List subaccounts available on your integration
   * @param {SubaccountListRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `list` method
   * ```js
   * subaccount.list()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Subaccounts retrieved",
   *   "data": [
   *     {
   *       "integration": 129938,
   *       "domain": "test",
   *       "subaccount_code": "ACCT_cljt3j4cp0kb2gq",
   *       "business_name": "Business 2",
   *       "description": null,
   *       "primary_contact_name": null,
   *       "primary_contact_email": null,
   *       "primary_contact_phone": null,
   *       "metadata": null,
   *       "percentage_charge": 20,
   *       "is_verified": false,
   *       "settlement_bank": "Zenith Bank",
   *       "account_number": "0193274382",
   *       "active": true,
   *       "migrate": false,
   *       "id": 53,
   *       "createdAt": "2016-10-05T12:55:47.000Z",
   *       "updatedAt": "2016-10-05T12:55:47.000Z"
   *     },
   *     {
   *       "integration": 129938,
   *       "domain": "test",
   *       "subaccount_code": "ACCT_vwy3d1gck2c9gxi",
   *       "business_name": "Sunshine Studios",
   *       "description": null,
   *       "primary_contact_name": null,
   *       "primary_contact_email": null,
   *       "primary_contact_phone": null,
   *       "metadata": null,
   *       "percentage_charge": 20,
   *       "is_verified": false,
   *       "settlement_bank": "Access Bank",
   *       "account_number": "0128633833",
   *       "active": true,
   *       "migrate": false,
   *       "id": 35,
   *       "createdAt": "2016-10-04T09:06:00.000Z",
   *       "updatedAt": "2016-10-04T09:06:00.000Z"
   *     }
   *   ],
   *   "meta": {
   *     "total": 20,
   *     "skipped": 0,
   *     "perPage": "2",
   *     "page": 1,
   *     "pageCount": 7
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  list = (params?: SubaccountListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  /**
   * @description Get details of a subaccount on your integration
   * @param {string} idOrCode - The ID or code of the subaccount you want to fetch
   * @example
   * Example usage of `fetch` method
   * ```js
   * subaccount.fetch("ACCT_4hl4xenwpjy5wb")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Subaccount retrieved",
   *   "data": {
   *     "integration": 100973,
   *     "domain": "test",
   *     "subaccount_code": "ACCT_4hl4xenwpjy5wb",
   *     "business_name": "Sunshine Studios",
   *     "description": null,
   *     "primary_contact_name": null,
   *     "primary_contact_email": "dafe@aba.com",
   *     "primary_contact_phone": null,
   *     "metadata": null,
   *     "percentage_charge": 18.9,
   *     "is_verified": false,
   *     "settlement_bank": "Access Bank",
   *     "account_number": "0193274682",
   *     "settlement_schedule": "AUTO",
   *     "active": true,
   *     "migrate": false,
   *     "id": 55,
   *     "createdAt": "2016-10-05T13:22:04.000Z",
   *     "updatedAt": "2016-10-21T02:19:47.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetch = (idOrCode: string) => {
    return this.apiRequest({ method: 'GET', url: `${idOrCode}` });
  };

  /**
   * @description Update a subaccount details on your integration
   * @param {string} idOrCOde - Subaccount ID or code
   * @param {SubaccountUpdateRequestData} data - The body of the API request
   * @example
   * Example usage of `update` method
   * ```js
   * subaccount.update("ACCT_4hl4xenwpjy5wb", {
   *   "primary_contact_email": "dafe@aba.com",
   *   "percentage_charge": 18.9
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Subaccount updated",
   *   "data": {
   *     "integration": 100973,
   *     "domain": "test",
   *     "subaccount_code": "ACCT_4hl4xenwpjy5wb",
   *     "business_name": "Sunshine Studios",
   *     "description": null,
   *     "primary_contact_name": null,
   *     "primary_contact_email": "dafe@aba.com",
   *     "primary_contact_phone": null,
   *     "metadata": null,
   *     "percentage_charge": 18.9,
   *     "is_verified": false,
   *     "settlement_bank": "Access Bank",
   *     "account_number": "0193274682",
   *     "settlement_schedule": "AUTO",
   *     "active": true,
   *     "migrate": false,
   *     "id": 55,
   *     "createdAt": "2016-10-05T13:22:04.000Z",
   *     "updatedAt": "2016-10-21T02:19:47.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  update = (idOrCode: string, data: SubaccountUpdateRequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${idOrCode}`, data });
  };
}

export default Subaccount;
