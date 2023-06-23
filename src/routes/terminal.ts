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

  sendEvent = (terminalId: string, data: TerminalSendEventRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `${terminalId}/event` });
  };

  fetchEventStatus = (terminalId: string, eventId: string) => {
    return this.apiRequest({ method: 'GET', url: `${terminalId}/event/${eventId}` });
  };

  fetchTerminalStatus = (terminalId: string) => {
    return this.apiRequest({ method: 'GET', url: `${terminalId}/presence` });
  };

  list = (params?: TerminalListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  fetch = (terminalId: string) => {
    return this.apiRequest({ method: 'GET', url: `${terminalId}` });
  };

  update = (terminalId: string, data: TerminalUpdateRequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${terminalId}`, data });
  };

  commission = (data: { serial_number: string }) => {
    return this.apiRequest({ method: 'POST', url: `commission_device`, data });
  };

  decommission = (data: { serial_number: string }) => {
    return this.apiRequest({ method: 'POST', url: `decommission_device`, data });
  };
}

export default Terminal;
