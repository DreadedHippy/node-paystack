import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';

class Transfer {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(
    private axiosConfig: CreateAxiosDefaults,
    private clientConfig: ClientConfig
  ) {
    this.paystackClient.defaults.baseURL = baseURL + 'transfer';
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
        ? errorData
        : (errorData.httpStatus = { statusCode: error.response?.status, statusMessage: error.response?.statusText });
      return this.clientConfig.showRaw ? error : errorData; // The data in the response of the axios error
    }
  };

  initiate = async (data: RequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  finalize = async (data: RequestData) => {
    return this.apiRequest({ method: 'POST', data, url: 'finalize_transfer' });
  };

  bulkInitiate = async (data: RequestData) => {
    return this.apiRequest({ method: 'POST', data, url: 'bulk' });
  };

  list = async (params?: RequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  fetch = async (idOrCode: string) => {
    return this.apiRequest({ method: 'GET', url: `${idOrCode}` });
  };

  verify = async (reference: string) => {
    return this.apiRequest({ method: 'GET', url: `verify/${reference}` });
  };
}

export default Transfer;
