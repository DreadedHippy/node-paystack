import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import {
  TransferBulkInitiateRequestData,
  TransferFinalizeRequestData,
  TransferInitiateRequestData,
  TransfersListRequestParams,
} from '../interfaces/transfer.request';

class Transfer {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);

  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
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
        ? (errorData = errorData)
        : (errorData.httpStatus = { statusCode: error.response?.status, statusMessage: error.response?.statusText });
      return this.clientConfig.showRaw ? error : errorData; // The data in the response of the axios error
    }
  };

  initiate = (data: TransferInitiateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  finalize = (data: TransferFinalizeRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: 'finalize_transfer' });
  };

  bulkInitiate = (data: TransferBulkInitiateRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: 'bulk' });
  };

  list = (params?: TransfersListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  fetch = (idOrCode: string) => {
    return this.apiRequest({ method: 'GET', url: `${idOrCode}` });
  };

  verify = (reference: string) => {
    return this.apiRequest({ method: 'GET', url: `verify/${reference}` });
  };
}

export default Transfer;
