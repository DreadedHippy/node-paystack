import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { createAxiosInstance } from '../utils/utils';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';
import { ClientConfig } from '../interfaces/global';
import {
  DedicatedAccountAssignRequestData,
  DedicatedAccountCreateRequestData,
  DedicatedAccountListRequestParams,
  DedicatedAccountRemoveSplitRequestData,
  DedicatedAccountRequeryRequestParams,
  DedicatedAccountSplitAccountTransactionRequestData,
} from '../interfaces/dedicated_account.request';

class DedicatedAccount {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'dedicated_account';
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
   * @description Create a dedicated virtual account for an existing customer
   * @param {DedicatedAccountCreateRequestData} data - The body of the API request
   * @example
   * Example usage of `create` method
   * ```js
   * dedicatedAccount.create({
   *   "customer": 481193,
   *   "preferred_bank": "wema-bank"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "NUBAN successfully created",
   *   "data": {
   *     "bank": {
   *       "name": "Wema Bank",
   *       "id": 20,
   *       "slug": "wema-bank"
   *     },
   *     "account_name": "KAROKART / RHODA CHURCH",
   *     "account_number": "9930000737",
   *     "assigned": true,
   *     "currency": "NGN",
   *     "metadata": null,
   *     "active": true,
   *     "id": 253,
   *     "created_at": "2019-12-12T12:39:04.000Z",
   *     "updated_at": "2020-01-06T15:51:24.000Z",
   *     "assignment": {
   *       "integration": 100043,
   *       "assignee_id": 7454289,
   *       "assignee_type": "Customer",
   *       "expired": false,
   *       "account_type": "PAY-WITH-TRANSFER-RECURRING",
   *       "assigned_at": "2020-01-06T15:51:24.764Z"
   *     },
   *     "customer": {
   *       "id": 7454289,
   *       "first_name": "RHODA",
   *       "last_name": "CHURCH",
   *       "email": "rhodachurch@email.com",
   *       "customer_code": "CUS_kpb3qj71u1m0rw8",
   *       "phone": "+2349053267565",
   *       "risk_action": "default"
   *     }
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  create = (data: DedicatedAccountCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  /**
   * @description With this endpoint, you can create a customer, validate the customer, and assign a DVA to the customer.
   * @param {DedicatedAccountAssignRequestData} data - The body of the API request
   * @example
   * Example usage of `assign` method
   * ```js
   * dedicatedAccount.assign({
   *   "email": "janedoe@test.com",
   *   "first_name": "Jane",
   *   "middle_name": "Karen",
   *   "last_name": "Doe",
   *   "phone": "+2348100000000",
   *   "preferred_bank": "test-bank",
   *   "country": "NG"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Assign dedicated account in progress"
   * }
   * ```
   * @returns {Promise<any>}
   */
  assign = (data: DedicatedAccountAssignRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: 'assign' });
  };

  /**
   * @description List dedicated virtual accounts available on your integration.
   * @param {DedicatedAccountListRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `list` method
   * ```js
   * dedicatedAccount.list()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Managed accounts successfully retrieved",
   *   "data": [
   *     {
   *       "customer": {
   *         "id": 1530104,
   *         "first_name": "yinka",
   *         "last_name": "Ojo",
   *         "email": "hello@company.co",
   *         "customer_code": "CUS_dy1r7ts03zixbq5",
   *         "phone": "08154239386",
   *         "risk_action": "default",
   *         "international_format_phone": null
   *       },
   *       "bank": {
   *         "name": "Wema Bank",
   *         "id": 20,
   *         "slug": "wema-bank"
   *       },
   *       "id": 173,
   *       "account_name": "KAROKART/A YINKA",
   *       "account_number": "9930020212",
   *       "created_at": "2019-12-09T13:31:38.000Z",
   *       "updated_at": "2020-06-11T14:04:28.000Z",
   *       "currency": "NGN",
   *       "split_config": {
   *         "subaccount": "ACCT_xdrne0tcvr5jkei"
   *       },
   *       "active": true,
   *       "assigned": true
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
  list = (params?: DedicatedAccountListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  /**
   * @description Get details of a dedicated virtual account on your integration.
   * @param {number} dedicatedAccountId - ID of dedicated virtual account
   * @example
   * Example usage of `fetch` method
   * ```js
   * dedicatedAccount.fetch(17593)
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Customer retrieved",
   *   "data": {
   *     "transactions": [],
   *     "subscriptions": [],
   *     "authorizations": [],
   *     "first_name": null,
   *     "last_name": null,
   *     "email": "rhode@chu.com",
   *     "phone": null,
   *     "metadata": null,
   *     "domain": "live",
   *     "customer_code": "CUS_h00a7ngn0xbzf2g",
   *     "risk_action": "default",
   *     "id": 17593,
   *     "integration": 190972,
   *     "createdAt": "2019-10-25T15:05:23.000Z",
   *     "updatedAt": "2019-10-25T15:05:23.000Z",
   *     "created_at": "2019-10-25T15:05:23.000Z",
   *     "updated_at": "2019-10-25T15:05:23.000Z",
   *     "total_transactions": 0,
   *     "total_transaction_value": [],
   *     "dedicated_account": {
   *       "id": 59,
   *       "account_name": "KAROKART/RHODA CHURCH",
   *       "account_number": "9807062474",
   *       "created_at": "2019-09-10T11:10:12.000Z",
   *       "updated_at": "2019-10-25T15:05:24.000Z",
   *       "currency": "NGN",
   *       "active": true,
   *       "assigned": true,
   *       "provider": {
   *         "id": 1,
   *         "provider_slug": "wema-bank",
   *         "bank_id": 20,
   *         "bank_name": "Wema Bank"
   *       },
   *       "assignment": {
   *         "assignee_id": 17593,
   *         "assignee_type": "Customer",
   *         "account_type": "PAY-WITH-TRANSFER-RECURRING",
   *         "integration": 190972
   *       }
   *     }
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetch = (dedicatedAccountId: number) => {
    return this.apiRequest({ method: 'GET', url: `${dedicatedAccountId}` });
  };

  /**
   * @description Requery Dedicated Virtual Account for new transactions
   * @param {DedicatedAccountRequeryRequestParams} params - The query parameters of the API request
   * @see {@link listProviders} method to get a list of all provider slugs
   * @example
   * Example usage of `requery` method
   * ```js
   * dedicatedAccount.requery({
   *   account_number: "1234567890",
   *   provider_slug: "wema-bank"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "We are checking the status of your transfer. We will send you a notification once it is confirmed"
   * }
   * ```
   * @returns {Promise<any>}
   */
  requery = (params: DedicatedAccountRequeryRequestParams) => {
    return this.apiRequest({ method: 'GET', url: `requery`, params });
  };

  /**
   * @description Deactivate a dedicated virtual account on your integration.
   * @param {string} dedicatedAccountId - ID of dedicated virtual account
   * @example
   * Example usage of `deactivate` method
   * ```js
   * dedicatedAccount.deactivate(20)
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Managed Account Successfully Unassigned",
   *   "data": {
   *     "bank": {
   *       "name": "Wema Bank",
   *       "id": 20,
   *       "slug": "wema-bank"
   *     },
   *     "account_name": "KAROKART/A YINKA",
   *     "account_number": "9930020212",
   *     "assigned": false,
   *     "currency": "NGN",
   *     "metadata": null,
   *     "active": true,
   *     "id": 173,
   *     "created_at": "2019-12-09T13:31:38.000Z",
   *     "updated_at": "2020-08-28T10:04:25.000Z",
   *     "assignment": {
   *       "assignee_id": 1530104,
   *       "assignee_type": "Integration",
   *       "assigned_at": "2019-12-09T13:40:21.000Z",
   *       "integration": 100043,
   *       "account_type": "PAY-WITH-TRANSFER-RECURRING"
   *     }
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  deactivate = (dedicatedAccountId: string) => {
    return this.apiRequest({ method: 'DELETE', url: `${dedicatedAccountId}` });
  };

  /**
   * @description Split a dedicated virtual account transaction with one or more accounts
   * @param {DedicatedAccountSplitAccountTransactionRequestData} data - The body of the API request
   * @example
   * Example usage of `splitAccountTransaction` method
   * ```js
   * dedicatedAccount.splitAccountTransaction({
   *   customer: 481193,
   *   preferred_bank:"wema-bank",
   *   split_code: "SPL_e7jnRLtzla"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Assigned Managed Account Successfully Created",
   *   "data": {
   *     "bank": {
   *       "name": "Wema Bank",
   *       "id": 20,
   *       "slug": "wema-bank"
   *     },
   *     "account_name": "KAROKART/YINKA ADE",
   *     "account_number": "6731105168",
   *     "assigned": true,
   *     "currency": "NGN",
   *     "metadata": null,
   *     "active": true,
   *     "id": 97,
   *     "created_at": "2019-11-13T13:52:39.000Z",
   *     "updated_at": "2020-03-17T07:52:23.000Z",
   *     "assignment": {
   *       "integration": 100043,
   *       "assignee_id": 17328,
   *       "assignee_type": "Customer",
   *       "expired": false,
   *       "account_type": "PAY-WITH-TRANSFER-RECURRING",
   *       "assigned_at": "2020-03-17T07:52:23.023Z",
   *       "expired_at": null
   *     },
   *     "split_config": {
   *       "split_code": "SPL_e7jnRLtzla"
   *     },
   *     "customer": {
   *       "id": 17328,
   *       "first_name": "YINKA",
   *       "last_name": "ADE",
   *       "email": "yinka@testemail.com",
   *       "customer_code": "CUS_xxxxxxxx",
   *       "phone": null,
   *       "metadata": null,
   *       "risk_action": "default"
   *     }
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  splitAccountTransaction = (data: DedicatedAccountSplitAccountTransactionRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  /**
   * @description If you've previously set up split payment for transactions on a dedicated virtual account, you can remove it with this endpoint
   * @param {DedicatedAccountRemoveSplitRequestData} data - The body of the API request
   * @example
   * Example usage of `removeSplit` method
   * ```js
   * dedicatedAccount.removeSplit({
   *   account_number: "0033322211"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": "success",
   *   "message": "Subaccount unassigned",
   *   "data": {
   *     "id": 22173,
   *     "split_config": {},
   *     "account_name": "KAROKART/YINKA ADE",
   *     "account_number": "0033322211",
   *     "currency": "NGN",
   *     "assigned": true,
   *     "active": true,
   *     "createdAt": "2020-03-11T15:14:00.707Z",
   *     "updatedAt": "2020-03-11T15:14:00.707Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  removeSplit = (data: DedicatedAccountRemoveSplitRequestData) => {
    return this.apiRequest({ method: 'DELETE', data, url: 'split' });
  };

  /**
   * @description Get available bank providers for a dedicated virtual account
   * @example
   * Example usage of `listProviders` method
   * ```js
   * dedicatedAccount.listProviders()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Dedicated account providers retrieved",
   *   "data": [
   *     {
   *       "provider_slug": "access-bank",
   *       "bank_id": 1,
   *       "bank_name": "Access Bank",
   *       "id": 6
   *     },
   *     {
   *       "provider_slug": "wema-bank",
   *       "bank_id": 20,
   *       "bank_name": "Wema Bank",
   *       "id": 5
   *     }
   *   ]
   * }
   * ```
   * @returns {Promise<any>}
   */
  listProviders = () => {
    return this.apiRequest({ method: 'GET', url: 'available_providers' });
  };
}

export default DedicatedAccount;
