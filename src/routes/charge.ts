import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import {
  ChargeCreateRequestData,
  ChargeSubmitAddressRequestData,
  ChargeSubmitBirthdayRequestData,
  ChargeSubmitOTPRequestData,
  ChargeSubmitPhoneRequestData,
  ChargeSubmitPinRequestData,
} from '../interfaces/charge.request';

class Charge {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'charge';
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
   * @description Initiate a payment by integrating the payment channel of your choice.
   * @param {ChargeCreateRequestData} data - The body of the API request.
   * @example
   * Example usage of `create` method
   * ```js
   * charge.create({
   *   "email": "customer@email.com",
   *   "amount": "10000",
   *   "metadata": {
   *     "custom_fields": [
   *       {
   *         "value": "makurdi",
   *         "display_name": "Donation for",
   *         "variable_name": "donation_for"
   *       }
   *     ]
   *   },
   *   "bank":{
   *       "code": "057",
   *       "account_number": "0000000000"
   *   },
   *   "birthday": "1995-12-23"
   * })
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Charge attempted",
   *   "data": {
   *     "amount": 200,
   *     "currency": "NGN",
   *     "transaction_date": "2017-05-24T05:56:12.000Z",
   *     "status": "success",
   *     "reference": "zuvbpizfcf2fs7y",
   *     "domain": "test",
   *     "metadata": {
   *       "custom_fields": [
   *         {
   *           "display_name": "Merchant name",
   *           "variable_name": "merchant_name",
   *           "value": "Van Damme"
   *         },
   *         {
   *           "display_name": "Paid Via",
   *           "variable_name": "paid_via",
   *           "value": "API call"
   *         }
   *       ]
   *     },
   *     "gateway_response": "Successful",
   *     "message": null,
   *     "channel": "card",
   *     "ip_address": "54.154.89.28, 162.158.38.82, 172.31.38.35",
   *     "log": null,
   *     "fees": 3,
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
   *     "customer": {
   *       "id": 14571,
   *       "first_name": null,
   *       "last_name": null,
   *       "email": "test@email.co",
   *       "customer_code": "CUS_hns72vhhtos0f0k",
   *       "phone": null,
   *       "metadata": null,
   *       "risk_action": "default"
   *     },
   *     "plan": null
   *   }
   * }
   * ```
   *
   * @returns {Promise<any>}
   */
  create = (data: ChargeCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  /**
   * @description Submit PIN to continue a charge
   * @param {ChargeSubmitPinRequestData} data - The body of the API request
   * @example
   * Example usage of `submitPin` method
   * ```js
   * charge.submitPin({
   *   "pin": "1234",
   *   "reference": "5bwib5v6anhe9xa"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Charge attempted",
   *   "data": {
   *     "id": 2046671778,
   *     "domain": "test",
   *     "status": "success",
   *     "reference": "36xz3b9rie9ppvz",
   *     "amount": 10000,
   *     "message": "madePayment",
   *     "gateway_response": "Approved",
   *     "paid_at": "2022-08-24T12:00:18.000Z",
   *     "created_at": "2022-08-24T11:58:41.000Z",
   *     "channel": "bank",
   *     "currency": "NGN",
   *     "ip_address": "172.31.68.204",
   *     "metadata": "",
   *     "log": null,
   *     "fees": 50,
   *     "fees_split": null,
   *     "authorization": {
   *       "authorization_code": "AUTH_nrp5ly1goc",
   *       "bin": "000XXX",
   *       "last4": "X000",
   *       "exp_month": "12",
   *       "exp_year": "9999",
   *       "channel": "bank",
   *       "card_type": "",
   *       "bank": "Zenith Bank",
   *       "country_code": "NG",
   *       "brand": "Zenith Emandate",
   *       "reusable": false,
   *       "signature": null,
   *       "account_name": null
   *     },
   *     "customer": {
   *       "id": 44494174,
   *       "first_name": null,
   *       "last_name": null,
   *       "email": "charge@email.com",
   *       "customer_code": "CUS_cm4hqzmhg0u0ded",
   *       "phone": null,
   *       "metadata": null,
   *       "risk_action": "default",
   *       "international_format_phone": null
   *     },
   *     "plan": null,
   *     "split": {},
   *     "order_id": null,
   *     "paidAt": "2022-08-24T12:00:18.000Z",
   *     "createdAt": "2022-08-24T11:58:41.000Z",
   *     "requested_amount": 10000,
   *     "pos_transaction_data": null,
   *     "source": null,
   *     "fees_breakdown": null,
   *     "transaction_date": "2022-08-24T11:58:41.000Z",
   *     "plan_object": {},
   *     "subaccount": {}
   *   }
   * }
   * ```
   *
   * @returns {Promise<any>}
   */
  submitPin = (data: ChargeSubmitPinRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `submit_pin` });
  };

  /**
   * @description Submit OTP to complete a charge
   * @param {ChargeSubmitOTPRequestData} data - The body of the API request
   * @example
   * Example usage of `submitOTP` method
   * ```js
   * charge.submitOTP({
   *   "otp": "123456",
   *   "reference": "5bwib5v6anhe9xa"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Charge attempted",
   *   "data": {
   *     "id": 2046671778,
   *     "domain": "test",
   *     "status": "success",
   *     "reference": "36xz3b9rie9ppvz",
   *     "amount": 10000,
   *     "message": "madePayment",
   *     "gateway_response": "Approved",
   *     "paid_at": "2022-08-24T12:00:18.000Z",
   *     "created_at": "2022-08-24T11:58:41.000Z",
   *     "channel": "bank",
   *     "currency": "NGN",
   *     "ip_address": "172.31.68.204",
   *     "metadata": "",
   *     "log": null,
   *     "fees": 50,
   *     "fees_split": null,
   *     "authorization": {
   *       "authorization_code": "AUTH_nrp5ly1goc",
   *       "bin": "000XXX",
   *       "last4": "X000",
   *       "exp_month": "12",
   *       "exp_year": "9999",
   *       "channel": "bank",
   *       "card_type": "",
   *       "bank": "Zenith Bank",
   *       "country_code": "NG",
   *       "brand": "Zenith Emandate",
   *       "reusable": false,
   *       "signature": null,
   *       "account_name": null
   *     },
   *     "customer": {
   *       "id": 44494174,
   *       "first_name": null,
   *       "last_name": null,
   *       "email": "charge@email.com",
   *       "customer_code": "CUS_cm4hqzmhg0u0ded",
   *       "phone": null,
   *       "metadata": null,
   *       "risk_action": "default",
   *       "international_format_phone": null
   *     },
   *     "plan": null,
   *     "split": {},
   *     "order_id": null,
   *     "paidAt": "2022-08-24T12:00:18.000Z",
   *     "createdAt": "2022-08-24T11:58:41.000Z",
   *     "requested_amount": 10000,
   *     "pos_transaction_data": null,
   *     "source": null,
   *     "fees_breakdown": null,
   *     "transaction_date": "2022-08-24T11:58:41.000Z",
   *     "plan_object": {},
   *     "subaccount": {}
   *   }
   * }
   * ```
   *
   * @returns {Promise<any>}
   */
  submitOTP = (data: ChargeSubmitOTPRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `submit_otp` });
  };

  /**
   * @description Submit phone number when requested
   * @param {ChargeSubmitPhoneRequestData} data - The body of the API request
   * @example
   * Example usage of `submitPhone` method
   * ```js
   * charge.submitPhone({
   *   "phone": "08012345678",
   *   "reference": "5bwib5v6anhe9xa"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Charge attempted",
   *   "data": {
   *     "id": 2046671778,
   *     "domain": "test",
   *     "status": "success",
   *     "reference": "36xz3b9rie9ppvz",
   *     "amount": 10000,
   *     "message": "madePayment",
   *     "gateway_response": "Approved",
   *     "paid_at": "2022-08-24T12:00:18.000Z",
   *     "created_at": "2022-08-24T11:58:41.000Z",
   *     "channel": "bank",
   *     "currency": "NGN",
   *     "ip_address": "172.31.68.204",
   *     "metadata": "",
   *     "log": null,
   *     "fees": 50,
   *     "fees_split": null,
   *     "authorization": {
   *       "authorization_code": "AUTH_nrp5ly1goc",
   *       "bin": "000XXX",
   *       "last4": "X000",
   *       "exp_month": "12",
   *       "exp_year": "9999",
   *       "channel": "bank",
   *       "card_type": "",
   *       "bank": "Zenith Bank",
   *       "country_code": "NG",
   *       "brand": "Zenith Emandate",
   *       "reusable": false,
   *       "signature": null,
   *       "account_name": null
   *     },
   *     "customer": {
   *       "id": 44494174,
   *       "first_name": null,
   *       "last_name": null,
   *       "email": "charge@email.com",
   *       "customer_code": "CUS_cm4hqzmhg0u0ded",
   *       "phone": null,
   *       "metadata": null,
   *       "risk_action": "default",
   *       "international_format_phone": null
   *     },
   *     "plan": null,
   *     "split": {},
   *     "order_id": null,
   *     "paidAt": "2022-08-24T12:00:18.000Z",
   *     "createdAt": "2022-08-24T11:58:41.000Z",
   *     "requested_amount": 10000,
   *     "pos_transaction_data": null,
   *     "source": null,
   *     "fees_breakdown": null,
   *     "transaction_date": "2022-08-24T11:58:41.000Z",
   *     "plan_object": {},
   *     "subaccount": {}
   *   }
   * }
   * ```
   *
   * @returns {Promise<any>}
   */
  submitPhone = (data: ChargeSubmitPhoneRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `submit_phone` });
  };

  /**
   * @description Submit phone number when requested
   * @param {ChargeSubmitBirthdayRequestData} data - The body of the API request
   * @example
   * Example usage of `submitPhone` method
   * ```js
   * charge.submitBirthday({
   *   "birthday": "1961-09-21",
   *   "reference": "5bwib5v6anhe9xa"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Charge attempted",
   *   "data": {
   *     "id": 2046671778,
   *     "domain": "test",
   *     "status": "success",
   *     "reference": "36xz3b9rie9ppvz",
   *     "amount": 10000,
   *     "message": "madePayment",
   *     "gateway_response": "Approved",
   *     "paid_at": "2022-08-24T12:00:18.000Z",
   *     "created_at": "2022-08-24T11:58:41.000Z",
   *     "channel": "bank",
   *     "currency": "NGN",
   *     "ip_address": "172.31.68.204",
   *     "metadata": "",
   *     "log": null,
   *     "fees": 50,
   *     "fees_split": null,
   *     "authorization": {
   *       "authorization_code": "AUTH_nrp5ly1goc",
   *       "bin": "000XXX",
   *       "last4": "X000",
   *       "exp_month": "12",
   *       "exp_year": "9999",
   *       "channel": "bank",
   *       "card_type": "",
   *       "bank": "Zenith Bank",
   *       "country_code": "NG",
   *       "brand": "Zenith Emandate",
   *       "reusable": false,
   *       "signature": null,
   *       "account_name": null
   *     },
   *     "customer": {
   *       "id": 44494174,
   *       "first_name": null,
   *       "last_name": null,
   *       "email": "charge@email.com",
   *       "customer_code": "CUS_cm4hqzmhg0u0ded",
   *       "phone": null,
   *       "metadata": null,
   *       "risk_action": "default",
   *       "international_format_phone": null
   *     },
   *     "plan": null,
   *     "split": {},
   *     "order_id": null,
   *     "paidAt": "2022-08-24T12:00:18.000Z",
   *     "createdAt": "2022-08-24T11:58:41.000Z",
   *     "requested_amount": 10000,
   *     "pos_transaction_data": null,
   *     "source": null,
   *     "fees_breakdown": null,
   *     "transaction_date": "2022-08-24T11:58:41.000Z",
   *     "plan_object": {},
   *     "subaccount": {}
   *   }
   * }
   * ```
   *
   * @returns {Promise<any>}
   */
  submitBirthday = (data: ChargeSubmitBirthdayRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `submit_birthday` });
  };

  /**
   * @description Submit address to continue a charge
   * @param {ChargeSubmitAddressRequestData} data - The body of the API request
   * @example
   * Example usage of `submitAddress` method
   * ```js
   * charge.submitAddress({
   *   "reference": "7c7rpkqpc0tijs8",
   *   "address": "140 N 2ND ST",
   *   "city": "Stroudsburg",
   *   "state": "PA",
   *   "zip_code": "18360"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "message": "Charge attempted",
   *   "status": true,
   *   "data": {
   *     "message": "",
   *     "paidAt": "2020-05-21T15:16:00.000Z",
   *     "plan": null,
   *     "log": null,
   *     "ip_address": "35.177.113.19",
   *     "domain": "live",
   *     "fees": 390,
   *     "metadata": "",
   *     "requested_amount": 10000,
   *     "id": 102039,
   *     "currency": "NGN",
   *     "status": "success",
   *     "transaction_date": "2020-05-21T15:14:25.000Z",
   *     "reference": "7c7rpkqpc0tijs8",
   *     "subaccount": {},
   *     "customer": {
   *       "last_name": "Ben",
   *       "metadata": null,
   *       "customer_code": "CUS_bpy9ciomcstg55y",
   *       "risk_action": "default",
   *       "first_name": "Jude",
   *       "phone": "",
   *       "id": 16200
   *     },
   *     "order_id": null,
   *     "plan_object": {},
   *     "authorization": {
   *       "signature": "SIG_5wBvKoAT64nwSJgZkHvQ",
   *       "authorization_code": "AUTH_82e26bc6yb",
   *       "reusable": true,
   *       "exp_month": "08",
   *       "card_type": "visa DEBIT",
   *       "last4": "4633",
   *       "account_name": "BoJack Horseman",
   *       "channel": "card",
   *       "brand": "visa",
   *       "country_code": "US",
   *       "bin": "440066",
   *       "bank": "",
   *       "exp_year": "2024"
   *     },
   *     "channel": "card",
   *     "amount": 10000,
   *     "created_at": "2020-05-21T15:14:25.000Z",
   *     "gateway_response": "Approved",
   *     "fees_split": null,
   *     "paid_at": "2020-05-21T15:16:00.000Z"
   *   }
   * }
   * ```
   *
   * @returns {Promise<any>}
   */
  submitAddress = (data: ChargeSubmitAddressRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `submit_address` });
  };

  /**
   * @description When you get `pending` as a charge status or if there was an exception when calling any of the /charge endpoints, wait 10 seconds or more, then make a check to see if its status has changed. Don't call too early as you may get a lot more `pending` than you should.
   * @param {string} reference - The reference to check
   * @example
   * Example usage of `checkPending` method
   * ```js
   * charge.checkPending("zuvbpizfcf2fs7y")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Charge attempted",
   *   "data": {
   *     "amount": 200,
   *     "currency": "NGN",
   *     "transaction_date": "2017-05-24T05:56:12.000Z",
   *     "status": "success",
   *     "reference": "zuvbpizfcf2fs7y",
   *     "domain": "test",
   *     "metadata": {
   *       "custom_fields": [
   *         {
   *           "display_name": "Merchant name",
   *           "variable_name": "merchant_name",
   *           "value": "Van Damme"
   *         },
   *         {
   *           "display_name": "Paid Via",
   *           "variable_name": "paid_via",
   *           "value": "API call"
   *         }
   *       ]
   *     },
   *     "gateway_response": "Successful",
   *     "message": null,
   *     "channel": "card",
   *     "ip_address": "54.154.89.28, 162.158.38.82, 172.31.38.35",
   *     "log": null,
   *     "fees": 3,
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
   *     "customer": {
   *       "id": 14571,
   *       "first_name": null,
   *       "last_name": null,
   *       "email": "test@email.co",
   *       "customer_code": "CUS_hns72vhhtos0f0k",
   *       "phone": null,
   *       "metadata": null,
   *       "risk_action": "default"
   *     },
   *     "plan": null
   *   }
   * }
   * ```
   *
   * @returns {Promise<any>}
   */
  checkPending = (reference: string) => {
    return this.apiRequest({ method: 'GET', url: `${reference}` });
  };
}

export default Charge;
