import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { createAxiosInstance } from '../utils/utils';
import { baseURL } from '../static/variables';
import { ClientConfig } from '../interfaces/global';
import { SubaccountCreateRequestData } from '../interfaces/subaccount.request';
import {
  SubscriptionCreateRequestData,
  SubscriptionDisableRequestData,
  SubscriptionEnableRequestData,
  SubscriptionListRequestParams,
} from '../interfaces/subscription.request';

class Subscription {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'subscription';
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
   * @description Create a subscription on your integration
   * @param {SubscriptionCreateRequestData} data - The body of the API request
   * @example
   * Example usage of `create` method
   * ```js
   * subscription.create({
   *   "customer": "CUS_xnxdt6s1zg1f4nx",
   *   "plan": "PLN_gx2wn530m0i3w3m"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Subscription successfully created",
   *   "data": {
   *     "customer": 1173,
   *     "plan": 28,
   *     "integration": 100032,
   *     "domain": "test",
   *     "start": 1459296064,
   *     "status": "active",
   *     "quantity": 1,
   *     "amount": 50000,
   *     "authorization": {
   *       "authorization_code": "AUTH_6tmt288t0o",
   *       "bin": "408408",
   *       "last4": "4081",
   *       "exp_month": "12",
   *       "exp_year": "2020",
   *       "channel": "card",
   *       "card_type": "visa visa",
   *       "bank": "TEST BANK",
   *       "country_code": "NG",
   *       "brand": "visa",
   *       "reusable": true,
   *       "signature": "SIG_uSYN4fv1adlAuoij8QXh",
   *       "account_name": "BoJack Horseman"
   *     },
   *     "subscription_code": "SUB_vsyqdmlzble3uii",
   *     "email_token": "d7gofp6yppn3qz7",
   *     "id": 9,
   *     "createdAt": "2016-03-30T00:01:04.687Z",
   *     "updatedAt": "2016-03-30T00:01:04.687Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  create = (data: SubscriptionCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  /**
   * @description List subscriptions available on your integration
   * @param {SubscriptionListRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `list` method
   * ```js
   * subscription.list()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Subscriptions retrieved",
   *   "data": [
   *     {
   *       "customer": {
   *         "first_name": "BoJack",
   *         "last_name": "Horseman",
   *         "email": "bojack@horseman.com",
   *         "phone": "",
   *         "metadata": null,
   *         "domain": "test",
   *         "customer_code": "CUS_hdhye17yj8qd2tx",
   *         "risk_action": "default",
   *         "id": 84312,
   *         "integration": 100073,
   *         "createdAt": "2016-10-01T10:59:52.000Z",
   *         "updatedAt": "2016-10-01T10:59:52.000Z"
   *       },
   *       "plan": {
   *         "domain": "test",
   *         "name": "Weekly small chops",
   *         "plan_code": "PLN_0as2m9n02cl0kp6",
   *         "description": "Small chops delivered every week",
   *         "amount": 27000,
   *         "interval": "weekly",
   *         "send_invoices": true,
   *         "send_sms": true,
   *         "hosted_page": false,
   *         "hosted_page_url": null,
   *         "hosted_page_summary": null,
   *         "currency": "NGN",
   *         "migrate": null,
   *         "id": 1716,
   *         "integration": 100073,
   *         "createdAt": "2016-10-01T10:59:11.000Z",
   *         "updatedAt": "2016-10-01T10:59:11.000Z"
   *       },
   *       "integration": 123456,
   *       "authorization": {
   *         "authorization_code": "AUTH_6tmt288t0o",
   *         "bin": "408408",
   *         "last4": "4081",
   *         "exp_month": "12",
   *         "exp_year": "2020",
   *         "channel": "card",
   *         "card_type": "visa visa",
   *         "bank": "TEST BANK",
   *         "country_code": "NG",
   *         "brand": "visa",
   *         "reusable": true,
   *         "signature": "SIG_uSYN4fv1adlAuoij8QXh",
   *         "account_name": "BoJack Horseman"
   *       },
   *       "domain": "test",
   *       "start": 1475319599,
   *       "status": "active",
   *       "quantity": 1,
   *       "amount": 27000,
   *       "subscription_code": "SUB_6phdx225bavuwtb",
   *       "email_token": "ore84lyuwcv2esu",
   *       "easy_cron_id": "275226",
   *       "cron_expression": "0 0 * * 6",
   *       "next_payment_date": "2016-10-15T00:00:00.000Z",
   *       "open_invoice": "INV_qc875pkxpxuyodf",
   *       "id": 4192,
   *       "createdAt": "2016-10-01T10:59:59.000Z",
   *       "updatedAt": "2016-10-12T07:45:14.000Z"
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
  list = (params?: SubscriptionListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  /**
   * @description Get details of a subscription on your integration
   * @param {string} subscriptionIdOrCode - The ID or code of the subscription you want to fetch
   * @example
   * Example usage of `fetch` method
   * ```js
   * subscription.fetch("SUB_vsyqdmlzble3uii")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Subscription retrieved successfully",
   *   "data": {
   *     "invoices": [],
   *     "customer": {
   *       "first_name": "BoJack",
   *       "last_name": "Horseman",
   *       "email": "bojack@horsinaround.com",
   *       "phone": null,
   *       "metadata": {
   *         "photos": [
   *           {
   *             "type": "twitter",
   *             "typeId": "twitter",
   *             "typeName": "Twitter",
   *             "url": "https://d2ojpxxtu63wzl.cloudfront.net/static/61b1a0a1d4dda2c9fe9e165fed07f812_a722ae7148870cc2e33465d1807dfdc6efca33ad2c4e1f8943a79eead3c21311",
   *             "isPrimary": false
   *           }
   *         ]
   *       },
   *       "domain": "test",
   *       "customer_code": "CUS_xnxdt6s1zg1f4nx",
   *       "id": 1173,
   *       "integration": 100032,
   *       "createdAt": "2016-03-29T20:03:09.000Z",
   *       "updatedAt": "2016-03-29T20:53:05.000Z"
   *     },
   *     "plan": {
   *       "domain": "test",
   *       "name": "Monthly retainer (renamed)",
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
   *       "integration": 100032,
   *       "createdAt": "2016-03-29T22:42:50.000Z",
   *       "updatedAt": "2016-03-29T23:51:41.000Z"
   *     },
   *     "integration": 100032,
   *     "authorization": {
   *       "authorization_code": "AUTH_6tmt288t0o",
   *       "bin": "408408",
   *       "last4": "4081",
   *       "exp_month": "12",
   *       "exp_year": "2020",
   *       "channel": "card",
   *       "card_type": "visa visa",
   *       "bank": "TEST BANK",
   *       "country_code": "NG",
   *       "brand": "visa",
   *       "reusable": true,
   *       "signature": "SIG_uSYN4fv1adlAuoij8QXh",
   *       "account_name": "BoJack Horseman"
   *     },
   *     "domain": "test",
   *     "start": 1459296064,
   *     "status": "active",
   *     "quantity": 1,
   *     "amount": 50000,
   *     "subscription_code": "SUB_vsyqdmlzble3uii",
   *     "email_token": "d7gofp6yppn3qz7",
   *     "easy_cron_id": null,
   *     "cron_expression": "0 0 28 * *",
   *     "next_payment_date": "2016-04-28T07:00:00.000Z",
   *     "open_invoice": null,
   *     "id": 9,
   *     "createdAt": "2016-03-30T00:01:04.000Z",
   *     "updatedAt": "2016-03-30T00:22:58.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetch = (subscriptionIdOrCode: string) => {
    return this.apiRequest({ method: 'GET', url: `${subscriptionIdOrCode}` });
  };

  /**
   * @description Enable a subscription on your integration
   * @param {SubscriptionEnableRequestData} data - The body of the API request
   * @example
   * Example usage of `enable` method
   * ```js
   * subscription.enable({
   *   "code": "SUB_vsyqdmlzble3uii",
   *   "token": "d7gofp6yppn3qz7"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Subscription enabled successfully"
   * }
   * ```
   * @returns {Promise<any>}
   */
  enable = (data: SubscriptionEnableRequestData) => {
    return this.apiRequest({ method: 'POST', url: `enable`, data });
  };

  /**
   * @description Disable a subscription on your integration
   * @param {SubscriptionDisableRequestData} data - The body of the API request
   * @example
   * Example usage of `disable` method
   * ```js
   * subscription.disable({
   *   "code": "SUB_vsyqdmlzble3uii",
   *   "token": "d7gofp6yppn3qz7"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Subscription disabled successfully"
   * }
   * ```
   * @returns {Promise<any>}
   */
  disable = (data: SubscriptionDisableRequestData) => {
    return this.apiRequest({ method: 'POST', url: `disable`, data });
  };

  /**
   * @description Generate a link for updating the card on a subscription
   * @param {string} code - Subscription code
   * @example
   * Example usage of `generateUpdateLink` method
   * ```js
   * subscription.generateUpdateLink("SUB_vsyqdmlzble3uii")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Link generated",
   *   "data": {
   *     "link": "https://paystack.com/manage/subscriptions/qlgwhpyq1ts9nsw?subscription_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWJzY3JpcHRpb25fY29kZSI6IlNVQl9xbGd3aHB5cTB0czluc3ciLCJpbnRlZ3JhdGlvbiI6MzUzNTE0LCJkb21haW4iOiJ0ZXN0IiwiZW1haWxfdG9rZW4iOiJzNXIwZjA0ODdwcnNtZWsiLCJpYXQiOjE2MzUyNTkxMzEsIm5iZiI6MTYzNTI1OTEzcjeR82XhwIjoxNjM1MzQ1NTMxfQ.FK1glvwMjHu9J8P-4n2oXPN_u_fIpQZ-F_s5x_4WLag"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  generateUpdateLink = (code: string) => {
    return this.apiRequest({ method: 'GET', url: `${code}/manage/link` });
  };

  /**
   * @description Email a customer a link for updating the card on their subscription
   * @param {SubscriptionDisableRequestData} data - The body of the API request
   * @example
   * Example usage of `sendUpdateLink` method
   * ```js
   * subscription.sendUpdateLink("SUB_vsyqdmlzble3uii")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Email successfully sent"
   * }
   * ```
   * @returns {Promise<any>}
   */
  sendUpdateLink = (code: string) => {
    return this.apiRequest({ method: 'POST', url: `${code}/manage/email` });
  };
}

export default Subscription;
