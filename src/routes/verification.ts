import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import {
  VerificationResolveAccountRequestParams,
  VerificationValidateAccountRequestData,
} from '../interfaces/verification.request';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';

class Verification {
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
   * @description Confirm an account belongs to the right customer
   * @param {VerificationResolveAccountRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `resolveAccount` method
   * ```js
   * verification.resolveAccount({
   *   account_number: "0022728151",
   *   bank_code: "063"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Account number resolved",
   *   "data": {
   *     "account_number": "0022728151",
   *     "account_name": "WES GIBBONS"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  resolveAccount = async (params: VerificationResolveAccountRequestParams) => {
    return this.apiRequest({
      method: 'GET',
      url: `bank/resolve?account_number=${params.account_number}&bank_code=${params.bank_code}`,
    });
  };

  /**
   * @description Confirm the authenticity of a customer's account number before sending money
   * @param {VerificationValidateAccountRequestData} data - The body of the API request
   * @example
   * Example usage of `resolveAccount` method
   * ```js
   * verification.validateAccount({
   *   "bank_code": "632005",
   *   "country_code": "ZA",
   *   "account_number": "0123456789",
   *   "account_name": "Ann Bron",
   *   "account_type": "personal",
   *   "document_type": "identityNumber",
   *   "document_number": "1234567890123"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Account number resolved",
   *   "data": {
   *     "account_number": "0022728151",
   *     "account_name": "WES GIBBONS"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  validateAccount = async (data: VerificationValidateAccountRequestData) => {
    return this.apiRequest({ method: 'POST', url: `bank/validate`, data });
  };

  /**
   * @description Get more information about a customer's card
   * @param {string} bin - The body of the API request
   * @example
   * Example usage of `resolveCardBin` method
   * ```js
   * verification.resolveCardBin("539983")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Bin resolved",
   *   "data": {
   *     "bin": "539983",
   *     "brand": "Mastercard",
   *     "sub_brand": "",
   *     "country_code": "NG",
   *     "country_name": "Nigeria",
   *     "card_type": "DEBIT",
   *     "bank": "Guaranty Trust Bank",
   *     "linked_bank_id": 9
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  resolveCardBin = async (bin: string) => {
    return this.apiRequest({ method: 'GET', url: `decision/bin/${bin}` });
  };
}

export default Verification;
