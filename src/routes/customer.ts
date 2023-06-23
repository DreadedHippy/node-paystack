import { AxiosError, AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { CustomerCreateRequestData, CustomerDeactivateAuthorizationRequestData, CustomerListRequestParams, CustomerSetRiskActionRequestData, CustomerUpdateRequestData, CustomerValidateRequestData } from '../interfaces/customer.request';
import { ClientConfig } from '../interfaces/global';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';

class Customer {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(
    private axiosConfig: CreateAxiosDefaults,
    private clientConfig: ClientConfig
  ) {
    this.paystackClient.defaults.baseURL = baseURL + 'customer';
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
   * @description Create a customer on your integration
   * @param {CustomerCreateRequestData} data - The body of the API request
   * @example
   * Example usage of `create` method
   * ```js
   * charge.create({
   *   "email": "customer@email.com",
   *   "first_name": "Zero",
   *   "last_name": "Sum",
   *   "phone": "+2348123456789"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Customer created",
   *   "data": {
   *     "email": "customer@email.com",
   *     "integration": 100032,
   *     "domain": "test",
   *     "customer_code": "CUS_xnxdt6s1zg1f4nx",
   *     "id": 1173,
   *     "identified": false,
   *     "identifications": null,
   *     "createdAt": "2016-03-29T20:03:09.584Z",
   *     "updatedAt": "2016-03-29T20:03:09.584Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  create = (data: CustomerCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  
  /**
   * @description List customers available on your integration
   * @param {CustomerListRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `list` method
   * ```js
   * customer.list()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Customers retrieved",
   *   "data": [
   *     {
   *       "integration": 463433,
   *       "first_name": null,
   *       "last_name": null,
   *       "email": "dom@gmail.com",
   *       "phone": null,
   *       "metadata": null,
   *       "domain": "test",
   *       "customer_code": "CUS_c6wqvwmvwopw4ms",
   *       "risk_action": "default",
   *       "id": 90758908,
   *       "createdAt": "2022-08-15T13:46:39.000Z",
   *      "updatedAt": "2022-08-15T13:46:39.000Z"
   *     },
   *     {
   *       "integration": 463433,
   *       "first_name": "lukman",
   *       "last_name": "calle",
   *       "email": "lukman@calle.co",
   *       "phone": "08922383034",
   *       "metadata": {},
   *       "domain": "test",
   *       "customer_code": "CUS_hpxsz8c1if90quo",
   *       "risk_action": "default",
   *       "id": 90747194,
   *       "createdAt": "2022-08-15T12:31:13.000Z",
   *       "updatedAt": "2022-08-15T12:31:13.000Z"
   *     }
   *   ],
   *   "meta": {
   *     "next": "Y3VzdG9tZXI6OTAyMjU4MDk=",
   *     "previous": null,
   *     "perPage": 2
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */ 
  list = (params?: CustomerListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };
  
  /**
   * @description Get details of a customer on your integration.
   * @param {string} emailOrCode - The email or code of the customer.
   * @example
   * Example usage of `fetch` method
   * ```js
   * customer.fetch("customer@email.com")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json{
   *   "status": true,
   *   "message": "Customer retrieved",
   *   "data": {
   *     "transactions": [],
   *     "subscriptions": [],
   *     "authorizations": [
   *       {
   *         "authorization_code": "AUTH_ekk8t49ogj",
   *         "bin": "408408",
   *         "last4": "4081",
   *         "exp_month": "12",
   *         "exp_year": "2030",
   *         "channel": "card",
   *         "card_type": "visa ",
   *         "bank": "TEST BANK",
   *         "country_code": "NG",
   *         "brand": "visa",
   *         "reusable": true,
   *         "signature": "SIG_yEXu7dLBeqG0kU7g95Ke",
   *         "account_name": null
   *       }
   *     ],
   *     "first_name": null,
   *     "last_name": null,
   *     "email": "dom@gmail.com",
   *     "phone": null,
   *     "metadata": null,
   *     "domain": "test",
   *     "customer_code": "CUS_c6wqvwmvwopw4ms",
   *     "risk_action": "default",
   *     "id": 90758908,
   *     "integration": 463433,
   *     "createdAt": "2022-08-15T13:46:39.000Z",
   *     "updatedAt": "2022-08-15T13:46:39.000Z",
   *     "created_at": "2022-08-15T13:46:39.000Z",
   *     "updated_at": "2022-08-15T13:46:39.000Z",
   *     "total_transactions": 0,
   *     "total_transaction_value": [],
   *     "dedicated_account": null,
   *     "identified": false,
   *     "identifications": null
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */ 
  fetch = (emailOrCode: string) => {
    return this.apiRequest({ method: 'GET', url: `${emailOrCode}` });
  };

  /**
   * @description Update a customer's details on your integration
   * @param {string} code - Customer's code
   * @param {CustomerUpdateRequestData} data - The body of the API request
   * @example
   * Example usage of `create` method
   * ```js
   * charge.update({
   *   "first_name": "BoJack"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Customer updated",
   *   "data": {
   *     "integration": 100032,
   *     "first_name": "BoJack",
   *     "last_name": "Horseman",
   *     "email": "bojack@horsinaround.com",
   *     "phone": null,
   *     "metadata": {
   *       "photos": [
   *         {
   *           "type": "twitter",
   *           "typeId": "twitter",
   *           "typeName": "Twitter",
   *           "url": "https://d2ojpxxtu63wzl.cloudfront.net/static/61b1a0a1d4dda2c9fe9e165fed07f812_a722ae7148870cc2e33465d1807dfdc6efca33ad2c4e1f8943a79eead3c21311",
   *           "isPrimary": true
   *         }
   *       ]
   *     },
   *     "identified": false,
   *     "identifications": null,
   *     "domain": "test",
   *     "customer_code": "CUS_xnxdt6s1zg1f4nx",
   *     "id": 1173,
   *     "transactions": [],
   *     "subscriptions": [],
   *     "authorizations": [],
   *     "createdAt": "2016-03-29T20:03:09.000Z",
   *     "updatedAt": "2016-03-29T20:03:10.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  update = (code: string, data: CustomerUpdateRequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${code}`, data });
  };

  /**
   * @description Validate a customer's identity
   * @param {string} code - Email, or customer code of customer to be identified
   * @param {CustomerValidateRequestData} data - The body of the API request
   * @example
   * Example usage of `validate` method
   * ```js
   * charge.validate({
   *   "country": "NG",
   *   "type": "bank_account",
   *   "account_number": "0123456789",
   *   "bvn": "20012345677",
   *   "bank_code": "007",
   *   "first_name": "Asta",
   *   "last_name": "Lavista"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Customer Identification in progress"
   * }
   * ```
   * @returns {Promise<any>}
   */
  validate = (emailOrCode: string, data: CustomerValidateRequestData) => {
    return this.apiRequest({ method: 'POST', url: `${emailOrCode}/identification`, data });
  };

  /**
   * @description Whitelist or blacklist a customer on your integration
   * @param {CustomerSetRiskActionRequestData} data - The body of the API request
   * @example
   * Example usage of `setRiskAction` method
   * ```js
   * charge.setRiskAction({
   *   "customer": "CUS_xr58yrr2ujlft9k",
   *   "risk_action": "allow"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Customer updated",
   *   "data": {
   *     "first_name": "Peter",
   *     "last_name": "Griffin",
   *     "email": "peter@grif.com",
   *     "phone": null,
   *     "metadata": {},
   *     "domain": "test",
   *     "identified": false,
   *     "identifications": null,
   *     "customer_code": "CUS_xr58yrr2ujlft9k",
   *     "risk_action": "allow",
   *     "id": 2109,
   *     "integration": 100032,
   *     "createdAt": "2016-01-26T13:43:38.000Z",
   *     "updatedAt": "2016-08-23T03:56:43.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  setRiskAction = (data: CustomerSetRiskActionRequestData) => {
    return this.apiRequest({ method: 'POST', url: `set_risk_action`, data });
  };

  /**
   * @description Deactivate an authorization when the card needs to be forgotten
   * @param {CustomerDeactivateAuthorizationRequestData} data - The body of the API request
   * @example
   * Example usage of `deactivateAuthorization` method
   * ```js
   * charge.deactivateAuthorization({
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
   *   "message": "Authorization has been deactivated"
   * }
   * ```
   * @returns {Promise<any>}
   */
  deactivateAuthorization = (data: CustomerDeactivateAuthorizationRequestData) => {
    return this.apiRequest({ method: 'POST', url: `deactivate_authorization`, data });
  };
}

export default Customer;
