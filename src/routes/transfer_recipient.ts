import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import { TransferRecipientBulkCreateRequestData, TransferRecipientCreateRequestData, TransferRecipientListRequestParams, TransferRecipientUpdateRequestData } from '../interfaces/transfer_recipient.request';

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
        ? errorData = errorData
        : (errorData.httpStatus = { statusCode: error.response?.status, statusMessage: error.response?.statusText });
      return this.clientConfig.showRaw ? error : errorData; // The data in the response of the axios error
    }
  };

  create = (data: TransferRecipientCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  bulkCreate = (data: TransferRecipientBulkCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: 'bulk' });
  };

  list = (params?: TransferRecipientListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  fetch = (idOrCode: string) => {
    return this.apiRequest({ method: 'GET', url: `${idOrCode}` });
  };

  update = (idOrCode: string, data: TransferRecipientUpdateRequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${idOrCode}`, data });
  };

  delete = (idOrCode: string) => {
    return this.apiRequest({ method: 'DELETE', url: `${idOrCode}` });
  };
}

export default TransferRecipient;
