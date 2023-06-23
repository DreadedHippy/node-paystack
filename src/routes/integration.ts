import { RequestData, RequestParams } from '../interfaces/request';
import { AxiosInstance, AxiosError, AxiosResponse, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { SuccessResponse, ErrorResponse, AllResponse } from '../interfaces/response';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';

class Integration {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'integration';
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
   * @description Fetch the payment session timeout on your integration
   * @example
   * Example usage of `fetchTimeout` method
   * ```js
   * integration.fetchTimeout()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Payment session timeout retrieved",
   *   "data": {
   *     "payment_session_timeout": 30
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetchTimeout = () => {
    return this.apiRequest({ method: 'GET', url: `payment_session_timeout` });
  };

  /**
   * @description Update the payment session timeout on your integration
   * @param {{timeout: number}} data - Time before stopping session (in seconds). Set to 0 to cancel session timeouts
   * @example
   * Example usage of `updateTimeout` method
   * ```js
   * integration.updateTimeout({ "timeout": 30 })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Payment session timeout retrieved",
   *   "data": {
   *     "payment_session_timeout": 30
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  updateTimeout = (data: { timeout: number }) => {
    return this.apiRequest({ method: 'PUT', url: `payment_session_timeout`, data });
  };
}

export default Integration;
