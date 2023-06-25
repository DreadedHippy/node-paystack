import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import {
  SplitCreateRequestData,
  SplitListRequestParams,
  SplitUpdateRequestData,
  SplitUpsertSubaccountRequestData,
  SplitRemoveSubaccountRequestData,
} from '../interfaces/split.request';

class Split {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'split';
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
   * @description Create a split payment on your integration
   * @param {SplitCreateRequestData} data - The body of the API request
   * @example
   * Example usage of `create` method
   * ```js
   * split.create({
   *   "name":"Percentage Split", 
   *   "type":"percentage",
   *   "currency": "NGN", 
   *   "subaccounts":[{
   *     "subaccount": "ACCT_z3x6z3nbo14xsil",
   *     "share": 20
   *   },
   *   {
   *       "subaccount": "ACCT_pwwualwty4nhq9d",
   *       "share": 30
   *   }], 
   *   "bearer_type":"subaccount", 
   *   "bearer_subaccount":"ACCT_hdl8abxl8drhrl3"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   * "status": true,
   * "message": "Split created",
   * "data": {
   *   "id": 142,
   *   "name": "Test Doc",
   *   "type": "percentage",
   *   "currency": "NGN",
   *   "integration": 428626,
   *   "domain": "test",
   *   "split_code": "SPL_e7jnRLtzla",
   *   "active": true,
   *   "bearer_type": "subaccount",
   *   "bearer_subaccount": 40809,
   *   "createdAt": "2020-06-30T11:42:29.150Z",
   *   "updatedAt": "2020-06-30T11:42:29.150Z",
   *   "subaccounts": [
   *     {
   *       "subaccount": {
   *         "id": 40809,
   *         "subaccount_code": "ACCT_z3x6z3nbo14xsil",
   *         "business_name": "Business Name",
   *         "description": "Business Description",
   *         "primary_contact_name": null,
   *         "primary_contact_email": null,
   *         "primary_contact_phone": null,
   *         "metadata": null,
   *         "percentage_charge": 20,
   *         "settlement_bank": "Business Bank",
   *         "account_number": "1234567890"
   *       },
   *       "share": 20
   *     },
   *     {
   *       "subaccount": {
   *         "id": 40809,
   *         "subaccount_code": "ACCT_pwwualwty4nhq9d",
   *         "business_name": "Business Name",
   *         "description": "Business Description",
   *         "primary_contact_name": null,
   *         "primary_contact_email": null,
   *         "primary_contact_phone": null,
   *         "metadata": null,
   *         "percentage_charge": 20,
   *         "settlement_bank": "Business Bank",
   *         "account_number": "0123456789"
   *       },
   *       "share": 30
   *     }
   *   ],
   *   "total_subaccounts": 2
   * }
  }*
   * ```
   * @returns {Promise<any>}
   */
  create = (data: SplitCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

 /**
   * @description List the transaction splits available on your integration
   * @param {SplitListRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `list` method
   * ```js
   * split.list()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Split retrieved",
   *   "data": [
   *     {
   *       "id": 143,
   *       "name": "Test Doc",
   *       "split_code": "SPL_UO2vBzEqHW",
   *       "integration": 428626,
   *       "domain": "test",
   *       "type": "percentage",
   *       "active": 1,
   *       "currency": "NGN",
   *       "bearer_type": "subaccount",
   *       "bearer_subaccount": 40809,
   *       "created_at": "2020-06-30T11:52:24.000Z",
   *       "updated_at": "2020-06-30T11:52:24.000Z",
   *       "subaccounts": [
   *         {
   *           "subaccount": {
   *             "id": 40809,
   *             "subaccount_code": "ACCT_z3x6z3nbo14xsil",
   *             "business_name": "Business Name",
   *             "description": "Business Description",
   *             "primary_contact_name": null,
   *             "primary_contact_email": null,
   *             "primary_contact_phone": null,
   *             "metadata": null,
   *             "percentage_charge": 80,
   *             "settlement_bank": "Business Bank",
   *             "account_number": "1234567890"
   *           },
   *           "share": 30
   *         },
   *         {
   *           "subaccount": {
   *             "id": 40811,
   *             "subaccount_code": "ACCT_pwwualwty4nhq9d",
   *             "business_name": "Business Name",
   *             "description": "Business Description",
   *             "primary_contact_name": null,
   *             "primary_contact_email": null,
   *             "primary_contact_phone": null,
   *             "metadata": null,
   *             "percentage_charge": 80,
   *             "settlement_bank": "Business Bank",
   *             "account_number": "0123456789"
   *           },
   *           "share": 20
   *         }
   *       ],
   *       "total_subaccounts": 2
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
  list = (params?: SplitListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  /**
   * @description Get details of a split on your integration
   * @param {string | number} id - The ID of the split
   * @example
   * Example usage of `fetch` method
   * ```js
   * split.fetch(143)
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Split retrieved",
   *   "data": {
   *     "id": 143,
   *     "name": "Test Doc",
   *     "split_code": "SPL_UO2vBzEqHW",
   *     "integration": 428626,
   *     "domain": "test",
   *     "type": "percentage",
   *     "active": 1,
   *     "currency": "NGN",
   *     "bearer_type": "subaccount",
   *     "bearer_subaccount": 40809,
   *     "created_at": "2020-06-30T11:52:24.000Z",
   *     "updated_at": "2020-06-30T11:52:24.000Z",
   *     "subaccounts": [
   *       {
   *         "subaccount": {
   *           "id": 40809,
   *           "subaccount_code": "ACCT_z3x6z3nbo14xsil",
   *           "business_name": "Business Name",
   *           "description": "Business Description",
   *           "primary_contact_name": null,
   *           "primary_contact_email": null,
   *           "primary_contact_phone": null,
   *           "metadata": null,
   *           "percentage_charge": 80,
   *           "settlement_bank": "Business Bank",
   *           "account_number": "1234567890"
   *         },
   *         "share": 30
   *       },
   *       {
   *         "subaccount": {
   *           "id": 40811,
   *           "subaccount_code": "ACCT_pwwualwty4nhq9d",
   *           "business_name": "Business Name",
   *           "description": "Business Description",
   *           "primary_contact_name": null,
   *           "primary_contact_email": null,
   *           "primary_contact_phone": null,
   *           "metadata": null,
   *           "percentage_charge": 80,
   *           "settlement_bank": "Business Bank",
   *           "account_number": "0123456789"
   *         },
   *         "share": 20
   *       }
   *     ],
   *     "total_subaccounts": 2
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetch = (id: string | number) => {
    return this.apiRequest({ method: 'GET', url: `${id}` });
  };

  /**
   * @description Update a transaction split details on your integration
   * @param {string | number} id - Split ID
   * @param {SplitUpdateRequestData} data - The body of the API request
   * @example
   * Example usage of `update` method
   * ```js
   * split.update(95, {
   *   "name": "Updated Name",
   *   "active": true
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Split group updated",
   *   "data": {
   *     "id": 95,
   *     "name": "Updated Name",
   *     "type": "percentage",
   *     "currency": "NGN",
   *     "integration": 165956,
   *     "domain": "test",
   *     "split_code": "SPL_uMzcGbG5ca",
   *     "active": false,
   *     "bearer_type": "all",
   *     "bearer_subaccount": null,
   *     "createdAt": "2020-06-22T16:20:53.000Z",
   *     "updatedAt": "2020-06-22T17:26:59.000Z",
   *     "subaccounts": [
   *       {
   *         "subaccount": {
   *           "id": 12700,
   *           "subaccount_code": "ACCT_jsuq5uwf3n8la7b",
   *           "business_name": "Ayobami GTB",
   *           "description": "Ayobami GTB",
   *           "primary_contact_name": null,
   *           "primary_contact_email": null,
   *           "primary_contact_phone": null,
   *           "metadata": null,
   *           "percentage_charge": 20,
   *           "settlement_bank": "Guaranty Trust Bank",
   *           "account_number": "0259111351"
   *         },
   *         "share": 80
   *       }
   *     ],
   *     "total_subaccounts": 1
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  update = (id: string | number, data: SplitUpdateRequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${id}`, data });
  };

  /**
   * @description Add a Subaccount to a Transaction Split, or update the share of an existing Subaccount in a Transaction Split
   * @param {string | number} id - Split ID
   * @param {SplitUpsertSubaccountRequestData} data - The body of the API request
   * @example
   * Example usage of `upsertSubaccount` method
   * ```js
   * split.upsertSubaccount(143, {
   *   "subaccount": "ACCT_hdl8abxl8drhrl3", 
   *   "share": 40000
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Subaccount added",
   *   "data": {
   *     "id": 143,
   *     "name": "Test Doc",
   *     "type": "percentage",
   *     "currency": "NGN",
   *     "integration": 428626,
   *     "domain": "test",
   *     "split_code": "SPL_UO2vBzEqHW",
   *     "active": true,
   *     "bearer_type": "subaccount",
   *     "bearer_subaccount": 40809,
   *     "createdAt": "2020-06-30T11:52:24.000Z",
   *     "updatedAt": "2020-06-30T11:52:24.000Z",
   *     "subaccounts": [
   *       {
   *         "subaccount": {
   *           "id": 40809,
   *           "subaccount_code": "ACCT_sv6roe394nkpu6j",
   *           "business_name": "Business Name",
   *           "description": "Business Description",
   *           "primary_contact_name": null,
   *           "primary_contact_email": null,
   *           "primary_contact_phone": null,
   *           "metadata": null,
   *           "percentage_charge": 20,
   *           "settlement_bank": "Business Bank",
   *           "account_number": "1234567890"
   *         },
   *         "share": 30
   *       },
   *       {
   *         "subaccount": {
   *           "id": 40811,
   *           "subaccount_code": "ACCT_7i76qpjh7rr6q3z",
   *           "business_name": "Business Name",
   *           "description": "Business Description",
   *           "primary_contact_name": null,
   *           "primary_contact_email": null,
   *           "primary_contact_phone": null,
   *           "metadata": null,
   *           "percentage_charge": 20,
   *           "settlement_bank": "Business Bank",
   *           "account_number": "0123456789"
   *         },
   *         "share": 30
   *       }
   *     ],
   *     "total_subaccounts": 2
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  upsertSubaccount = (id: string | number, data: SplitUpsertSubaccountRequestData) => {
    return this.apiRequest({ method: 'POST', url: `${id}/subaccount/add`, data });
  };

  /**
   * @description Remove a subaccount from a transaction split
   * @param {string | number} id - Split ID
   * @param {SplitRemoveSubaccountRequestData} data - The body of the API request
   * @example
   * Example usage of `removeSubaccount` method
   * ```js
   * split.removeSubaccount(143, {
   *   "subaccount": "ACCT_hdl8abxl8drhrl3"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Subaccount removed"
   * }
   * ```
   * @returns {Promise<any>}
   */
  removeSubaccount = (id: string | number, data: SplitRemoveSubaccountRequestData) => {
    return this.apiRequest({ method: 'POST', url: `${id}/subaccount/remove`, data });
  };
}

export default Split;
