import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import {
  TransfersControlFinalizeDisableOTPRequestData,
  TransfersControlResendOTPRequestData,
} from '../interfaces/transfers_control.request';

class TransfersControl {
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
   * @description Fetch the available balance on your integration
   * @example
   * Example usage of `checkBalance` method
   * ```js
   * transfersControl.checkBalance()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Balances retrieved",
   *   "data": [
   *     {
   *       "currency": "NGN",
   *       "balance": 1700000
   *     }
   *   ]
   * }
   * ```
   * @returns {Promise<any>}
   */
  checkBalance = () => {
    return this.apiRequest({ method: 'GET', url: 'balance' });
  };

  /**
   * @description Fetch all pay-ins and pay-outs that occured on your integration
   * @example
   * Example usage of `fetchBalanceLedger` method
   * ```js
   * transfersControl.fetchBalanceLedger()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Balance ledger retrieved",
   *   "data": [
   *     {
   *       "integration": 463433,
   *       "domain": "test",
   *       "balance": 2078224968,
   *       "currency": "NGN",
   *       "difference": -50000,
   *       "reason": "Who dey breet?",
   *       "model_responsible": "Transfer",
   *       "model_row": 56610600,
   *       "id": 149411613,
   *       "createdAt": "2021-04-08T09:39:49.000Z",
   *       "updatedAt": "2021-04-08T09:39:49.000Z"
   *     },
   *     {
   *       "integration": 463433,
   *       "domain": "test",
   *       "balance": 2078274968,
   *       "currency": "NGN",
   *       "difference": 10000,
   *       "reason": "",
   *       "model_responsible": "Transaction",
   *       "model_row": 1073891448,
   *       "id": 149314482,
   *       "createdAt": "2021-04-08T00:00:11.000Z",
   *       "updatedAt": "2021-04-08T00:00:11.000Z"
   *     }
   *   ],
   *   "meta": {
   *     "total": 36944,
   *     "skipped": 0,
   *     "perPage": 50,
   *     "page": 1,
   *     "pageCount": 739
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetchBalanceLedger = () => {
    return this.apiRequest({ method: 'GET', url: 'balance/ledger' });
  };

  /**
   * @description Generates a new OTP and sends to customer in the event they are having trouble receiving one.
   * @param {TransfersControlResendOTPRequestData} data - The body of the API request
   * @example
   * Example usage of `resendOTP` method
   * ```js
   * transfersControl.resendOTP({
   *   "transfer_code": "TRF_vsyqdmlzble3uii",
   *   "reason": "resend_otp"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "OTP has been resent"
   * }
   * ```
   * @returns {Promise<any>}
   */
  resendOTP = (data: TransfersControlResendOTPRequestData) => {
    return this.apiRequest({ method: 'POST', url: 'transfer/resend_otp', data });
  };

  /**
   * @description This is used in the event that you want to be able to complete transfers programmatically without use of OTPs. No arguments required. You will get an OTP to complete the request.
   * @example
   * Example usage of `disableOTP` method
   * ```js
   * transfersControl.disableOTP()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "OTP has been sent to mobile number ending with 4321"
   * }
   * ```
   * @returns {Promise<any>}
   */
  disableOTP = () => {
    return this.apiRequest({ method: 'POST', url: 'transfer/disable_otp' });
  };

  /**
   * @description Finalize the request to disable OTP on your transfers.
   * @param {TransfersControlFinalizeDisableOTPRequestData} data - The body of the API request
   * @example
   * Example usage of `finalizeDisableOTP` method
   * ```js
   * transfersControl.finalizeDisableOTP()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "OTP requirement for transfers has been disabled"
   * }
   * ```
   * @returns {Promise<any>}
   */
  finalizeDisableOTP = (data: TransfersControlFinalizeDisableOTPRequestData) => {
    return this.apiRequest({ method: 'POST', url: 'transfer/disable_otp_finalize', data });
  };

  /**
   * @description In the event that a customer wants to stop being able to complete transfers programmatically, this endpoint helps turn OTP requirement back on. No arguments required.
   * @example
   * Example usage of `enableOTP` method
   * ```js
   * transfersControl.enableOTP()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "OTP requirement for transfers has been enabled"
   * }
   * ```
   * @returns {Promise<any>}
   */
  enableOTP = () => {
    return this.apiRequest({ method: 'POST', url: 'transfer/enable_otp' });
  };
}

export default TransfersControl;
