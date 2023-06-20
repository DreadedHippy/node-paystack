import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';

class TransferRecipient {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(
    private axiosConfig: CreateAxiosDefaults,
    private clientConfig: ClientConfig
  ) {
    this.paystackClient.defaults.baseURL = baseURL + 'transferrecipient';
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

  create = async (data: RequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  bulkCreate = async (data: RequestData) => {
    return this.apiRequest({ method: 'POST', data, url: 'bulk' });
  };

  list = async (params?: RequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  fetch = async (idOrCode: string) => {
    return this.apiRequest({ method: 'GET', url: `${idOrCode}` });
  };

  update = async (idOrCode: string, data: RequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${idOrCode}`, data });
  };

  delete = async (idOrCode: string) => {
    return this.apiRequest({ method: 'DELETE', url: `${idOrCode}` });
  };
}

export default TransferRecipient;
