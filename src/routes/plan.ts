import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { PlanCreateRequestData, PlanListRequestParams, PlanUpdateRequestData } from '../interfaces/plan.request';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';

class Plan {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'plan';
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
   * @description Create a plan on your integration
   * @param {PlanCreateRequestData} data - The body of the API request
   * @example
   * Example usage of `create` method
   * ```js
   * plan.create({
   *   "name": "Monthly retainer",
   *   "interval": "monthly",
   *   "amount": "500000"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Plan created",
   *   "data": {
   *     "name": "Monthly retainer",
   *     "amount": 500000,
   *     "interval": "monthly",
   *     "integration": 100032,
   *     "domain": "test",
   *     "plan_code": "PLN_gx2wn530m0i3w3m",
   *     "send_invoices": true,
   *     "send_sms": true,
   *     "hosted_page": false,
   *     "currency": "NGN",
   *     "id": 28,
   *     "createdAt": "2016-03-29T22:42:50.811Z",
   *     "updatedAt": "2016-03-29T22:42:50.811Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  create = (data: PlanCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  /**
   * @description List plans available on your integration
   * @param {PlanListRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `list` method
   * ```js
   * plan.list()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Plans retrieved",
   *   "data": [
   *     {
   *       "subscriptions": [],
   *       "integration": 100032,
   *       "domain": "test",
   *       "name": "Monthly retainer",
   *       "plan_code": "PLN_gx2wn530m0i3w3m",
   *       "description": null,
   *       "amount": 50000,
   *       "interval": "monthly",
   *       "send_invoices": true,
   *       "send_sms": true,
   *       "hosted_page": false,
   *       "hosted_page_url": null,
   *       "hosted_page_summary": null,
   *       "currency": "NGN",
   *       "id": 28,
   *       "createdAt": "2016-03-29T22:42:50.000Z",
   *       "updatedAt": "2016-03-29T22:42:50.000Z"
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
  list = (params?: PlanListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  /**
   * @description Get details of a plan on your integration
   * @param {string} idOrCode - The ID or code of the plan you want to fetch
   * @example
   * Example usage of `fetch` method
   * ```js
   * plan.fetch("PLN_gx2wn530m0i3w3m")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Plan retrieved",
   *   "data": {
   *     "subscriptions": [],
   *     "integration": 100032,
   *     "domain": "test",
   *     "name": "Monthly retainer",
   *     "plan_code": "PLN_gx2wn530m0i3w3m",
   *     "description": null,
   *     "amount": 50000,
   *     "interval": "monthly",
   *     "send_invoices": true,
   *     "send_sms": true,
   *     "hosted_page": false,
   *     "hosted_page_url": null,
   *     "hosted_page_summary": null,
   *     "currency": "NGN",
   *     "id": 28,
   *     "createdAt": "2016-03-29T22:42:50.000Z",
   *     "updatedAt": "2016-03-29T22:42:50.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetch = (idOrCode: string) => {
    return this.apiRequest({ method: 'GET', url: `${idOrCode}` });
  };

  /**
   * @description Update a details of a plan on your integration
   * @param {string} idOrCode - Plan's ID or code
   * @param {PlanUpdateRequestData} data - The body of the API request
   * @example
   * Example usage of `update` method
   * ```js
   * plan.update("PLN_gx2wn530m0i3w3m", {
   *   "name": "Monthly retainer (renamed)"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Plan updated. 1 subscription(s) affected"
   * }
   * ```
   * @returns {Promise<any>}
   */
  update = (idOrCode: string, data: PlanUpdateRequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${idOrCode}`, data });
  };
}

export default Plan;
