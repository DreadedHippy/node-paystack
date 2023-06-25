import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import {
  TerminalListRequestParams,
  TerminalSendEventRequestData,
  TerminalUpdateRequestData,
} from '../interfaces/terminal.request';

class Terminal {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'terminal';
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
   * @description Send an event from your application to the Paystack Terminal
   * @param {string} terminalId - The ID of the Terminal the event should be sent to.
   * @param {TerminalSendEventRequestData} data - The body of the API request.
   * @example
   * Example usage of `sendEvent` method
   * ```js
   * terminal.sendEvent(30, {
   *   "type": "invoice",
   *   "action": "process",
   *   "data": {
   *     "id": 7895939,
   *     "reference": 4634337895939
   *   }
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Event sent to Terminal",
   *   "data": {
   *     "id": "616d721e8c5cd40a0cdd54a6"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  sendEvent = (terminalId: string, data: TerminalSendEventRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `${terminalId}/event` });
  };

  /**
   * @description Send an event from your application to the Paystack Terminal
   * @param {string} terminalId - The ID of the Terminal
   * @param {string} eventId - The ID of the event that was sent to the Terminal.
   * @example
   * Example usage of `sendEvent` method
   * ```js
   * terminal.fetchEventStatus("30", "7895939")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Message Status Retrieved",
   *   "data": {
   *     "delivered": true
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetchEventStatus = (terminalId: string, eventId: string) => {
    return this.apiRequest({ method: 'GET', url: `${terminalId}/event/${eventId}` });
  };

  /**
   * @description Check the availability of a Terminal before sending an event to it
   * @param {string} terminalId - The ID of the Terminal
   * @example
   * Example usage of `fetchTerminalStatus` method
   * ```js
   * terminal.fetchTerminalStatus(30)
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Terminal status retrieved",
   *   "data": {
   *     "online": true,
   *     "available": false
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetchTerminalStatus = (terminalId: string) => {
    return this.apiRequest({ method: 'GET', url: `${terminalId}/presence` });
  };

  /**
   * @description List the Terminals available on your integration
   * @param {TerminalListRequestParams} params - The query parameters for the API request.
   * @example
   * Example usage of `list` method
   * ```js
   * terminal.list()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Terminals retrieved successfully",
   *   "data": [
   *     {
   *       "id": 30,
   *       "serial_number": "033301504100A563877",
   *       "device_make": null,
   *       "terminal_id": "2872S934",
   *       "integration": 463433,
   *       "domain": "live",
   *       "name": "Damilola's Terminal",
   *       "address": null,
   *       "status": "active"
   *     }
   *   ],
   *   "meta": {
   *     "next": null,
   *     "previous": null,
   *     "perPage": 1
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  list = (params?: TerminalListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  /**
   * @description Get the details of a Terminal
   * @param {string} terminalId - The ID of the terminal
   * @example
   * Example usage of `fetch` method
   * ```js
   * terminal.fetch(30)
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Terminal retrieved successfully",
   *   "data": {
   *     "id": 30,
   *     "serial_number": "033301504100A563877",
   *     "device_make": null,
   *     "terminal_id": "2872S934",
   *     "integration": 463433,
   *     "domain": "live",
   *     "name": "Damilola's Terminal",
   *     "address": null,
   *     "status": "active"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetch = (terminalId: string) => {
    return this.apiRequest({ method: 'GET', url: `${terminalId}` });
  };

  /**
   * @description Update the details of a terminal
   * @param {string} terminalId - The ID of the terminal
   * @param {TerminalUpdateRequestData} data - The body of the API request
   * @example
   * Example usage of `update` method
   * ```js
   * terminal.update("30", {
   *   "address": "Somewhere on earth"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Terminal Details updated"
   * }
   * ```
   * @returns {Promise<any>}
   */
  update = (terminalId: string, data: TerminalUpdateRequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${terminalId}`, data });
  };

  /**
   * @description Activate your debug device by linking it to your integration
   * @param {{serial_number: string}} data - The body of the API request
   * @example
   * Example usage of `commission` method
   * ```js
   * terminal.commission({
   *   "serial_number": "1111150412230003899"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": false,
   *   "message": "Device has been commissioned already"
   * }
   * ```
   * @returns {Promise<any>}
   */
  commission = (data: { serial_number: string }) => {
    return this.apiRequest({ method: 'POST', url: `commission_device`, data });
  };

  /**
   * @description Unlink your debug device from your integration
   * @param {{serial_number: string}} data - The body of the API request
   * @example
   * Example usage of `decommission` method
   * ```js
   * terminal.decommission({
   *   "serial_number": "1111150412230003899"
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json{
   *   "status": true,
   *   "message": "Device decommissioned successfully"
   * }
   * ```
   * @returns {Promise<any>}
   */
  decommission = (data: { serial_number: string }) => {
    return this.apiRequest({ method: 'POST', url: `decommission_device`, data });
  };
}

export default Terminal;
