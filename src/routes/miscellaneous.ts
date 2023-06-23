import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { AllResponse } from '../interfaces/response';
import { MiscellaneousRouteRequestData } from '../interfaces/miscellaneous.request';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';

class Miscellaneous {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL;
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
   * @description Get a list of all supported banks and their properties
   * @param {MiscellaneousRouteRequestData} params - The query parameters of the API request
   * @example
   * Example usage of `listBanks` method
   * ```js
   * miscellaneous.listBanks()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Banks retrieved",
   *   "data": [
   *     {
   *       "name": "Abbey Mortgage Bank",
   *       "slug": "abbey-mortgage-bank",
   *       "code": "801",
   *       "longcode": "",
   *       "gateway": null,
   *       "pay_with_bank": false,
   *       "active": true,
   *       "is_deleted": false,
   *       "country": "Nigeria",
   *       "currency": "NGN",
   *       "type": "nuban",
   *       "id": 174,
   *       "createdAt": "2020-12-07T16:19:09.000Z",
   *       "updatedAt": "2020-12-07T16:19:19.000Z"
   *     },
   *     {
   *       "name": "Coronation Merchant Bank",
   *       "slug": "coronation-merchant-bank",
   *       "code": "559",
   *       "longcode": "",
   *       "gateway": null,
   *       "pay_with_bank": false,
   *       "active": true,
   *       "is_deleted": false,
   *       "country": "Nigeria",
   *       "currency": "NGN",
   *       "type": "nuban",
   *       "id": 173,
   *       "createdAt": "2020-11-24T10:25:07.000Z",
   *       "updatedAt": "2020-11-24T10:25:07.000Z"
   *     },
   *     {
   *       "name": "Infinity MFB",
   *       "slug": "infinity-mfb",
   *       "code": "50457",
   *       "longcode": "",
   *       "gateway": null,
   *       "pay_with_bank": false,
   *       "active": true,
   *       "is_deleted": false,
   *       "country": "Nigeria",
   *       "currency": "NGN",
   *       "type": "nuban",
   *       "id": 172,
   *       "createdAt": "2020-11-24T10:23:37.000Z",
   *       "updatedAt": "2020-11-24T10:23:37.000Z"
   *     },
   *     {
   *       "name": "Paycom",
   *       "slug": "paycom",
   *       "code": "999992",
   *       "longcode": "",
   *       "gateway": null,
   *       "pay_with_bank": false,
   *       "active": true,
   *       "is_deleted": false,
   *       "country": "Nigeria",
   *       "currency": "NGN",
   *       "type": "nuban",
   *       "id": 171,
   *       "createdAt": "2020-11-24T10:20:45.000Z",
   *       "updatedAt": "2020-11-24T10:20:54.000Z"
   *     },
   *     {
   *       "name": "Petra Mircofinance Bank Plc",
   *       "slug": "petra-microfinance-bank-plc",
   *       "code": "50746",
   *       "longcode": "",
   *       "gateway": null,
   *       "pay_with_bank": false,
   *       "active": true,
   *       "is_deleted": false,
   *       "country": "Nigeria",
   *       "currency": "NGN",
   *       "type": "nuban",
   *       "id": 170,
   *       "createdAt": "2020-11-24T10:03:06.000Z",
   *       "updatedAt": "2020-11-24T10:03:06.000Z"
   *     }
   *   ],
   *   "meta": {
   *     "next": "YmFuazoxNjk=",
   *     "previous": null,
   *     "perPage": 5
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  listBanks = (params?: MiscellaneousRouteRequestData) => {
    return this.apiRequest({ method: 'GET', url: 'bank', params });
  };

  /**
   * @description Gets a list of countries that Paystack currently supports
   * @example
   * Example usage of `listCountries` method
   * ```js
   * miscellaneous.listCountries()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Countries retrieved",
   *   "data": [
   *     {
   *       "id": 1,
   *       "name": "Nigeria",
   *       "iso_code": "NG",
   *       "default_currency_code": "NGN",
   *       "integration_defaults": {},
   *       "relationships": {
   *         "currency": {
   *           "type": "currency",
   *           "data": [
   *             "NGN",
   *             "USD"
   *           ]
   *         },
   *         "integration_feature": {
   *           "type": "integration_feature",
   *           "data": []
   *         },
   *         "integration_type": {
   *           "type": "integration_type",
   *           "data": [
   *             "ITYPE_001",
   *             "ITYPE_002",
   *             "ITYPE_003"
   *           ]
   *         },
   *         "payment_method": {
   *           "type": "payment_method",
   *           "data": [
   *             "PAYM_001",
   *             "PAYM_002",
   *             "PAYM_003",
   *             "PAYM_004"
   *           ]
   *         }
   *       }
   *     },
   *     {
   *       "id": 2,
   *       "name": "Ghana",
   *       "iso_code": "GH",
   *       "default_currency_code": "GHS",
   *       "integration_defaults": {},
   *       "relationships": {
   *         "currency": {
   *           "type": "currency",
   *           "data": [
   *             "GHS",
   *             "USD"
   *           ]
   *         },
   *         "integration_feature": {
   *           "type": "integration_feature",
   *           "data": []
   *         },
   *         "integration_type": {
   *           "type": "integration_type",
   *           "data": [
   *             "ITYPE_004",
   *             "ITYPE_005"
   *           ]
   *         },
   *         "payment_method": {
   *           "type": "payment_method",
   *           "data": [
   *             "PAYM_001"
   *           ]
   *         }
   *       }
   *     }
   *   ]
   * }
   * ```
   * @returns {Promise<any>}
   */
  listCountries = () => {
    return this.apiRequest({ method: 'GET', url: 'country' });
  };

  /**
   * @description Get a list of states for a country for address verification
   * @param {string} countryCode - The country code of the states to list. It is gotten after the charge request.
   * @example
   * Example usage of `listStates` method
   * ```js
   * miscellaneous.listStates("CA")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "States retrieved",
   *   "data": [
   *     {
   *       "name": "Alberta",
   *       "slug": "alberta",
   *       "abbreviation": "AB"
   *     },
   *     {
   *       "name": "British Columbia",
   *       "slug": "british-columbia",
   *       "abbreviation": "BC"
   *     }
   *   ]
   * }
   * ```
   * @returns {Promise<any>}
   */
  listStates = (countryCode: string) => {
    return this.apiRequest({ method: 'GET', url: `address_verification/states?country=${countryCode}` });
  };
}

export default Miscellaneous;
