import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { createAxiosInstance } from '../utils/utils';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';
import { ClientConfig } from '../interfaces/global';
import { DedicatedAccountAssignRequestData, DedicatedAccountCreateRequestData, DedicatedAccountListRequestParams, DedicatedAccountRemoveSplitRequestData, DedicatedAccountRequeryRequestParams, DedicatedAccountSplitAccountTransactionRequestData } from '../interfaces/dedicated_account.request';

class DedicatedAccount {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(
    private axiosConfig: CreateAxiosDefaults,
    private clientConfig: ClientConfig
  ) {
    this.paystackClient.defaults.baseURL = baseURL + 'dedicated_account';
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

  create = (data: DedicatedAccountCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  assign = (data: DedicatedAccountAssignRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: 'assign' });
  };

  list = (params?: DedicatedAccountListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  fetch = (dedicatedAccountId: string) => {
    return this.apiRequest({ method: 'GET', url: `${dedicatedAccountId}` });
  };

  requery = (params: DedicatedAccountRequeryRequestParams) => {
    return this.apiRequest({ method: 'GET', url: `requery`, params });
  };

  deactivate = (dedicatedAccountId: string) => {
    return this.apiRequest({ method: 'DELETE', url: `${dedicatedAccountId}` });
  };

  splitAccountTransaction = (data: DedicatedAccountSplitAccountTransactionRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  removeSplit = (data: DedicatedAccountRemoveSplitRequestData) => {
    return this.apiRequest({ method: 'DELETE', data, url: 'split' });
  };

  listProviders = () => {
    return this.apiRequest({ method: 'GET', url: 'available_providers' });
  };
}

export default DedicatedAccount;
