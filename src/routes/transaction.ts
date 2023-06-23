import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import { TransactionChargeAuthorizationRequestData, TransactionExportRequestParams, TransactionInitializeRequestData, TransactionListRequestParams, TransactionPartialDebitRequestData, TransactionTotalsRequestParams } from '../interfaces/transaction.request';

class Transaction {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(
    private axiosConfig: CreateAxiosDefaults,
    private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'transaction';
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

  initialize = (data: TransactionInitializeRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `initialize` });
  };

  verify = (reference: string) => {
    return this.apiRequest({ method: 'GET', url: `verify/${reference}` });
  };

  list = (params?: TransactionListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  fetch = (id: number) => {
    return this.apiRequest({ method: 'GET', url: `${id}` });
  };

  chargeAuthorization = (data: TransactionChargeAuthorizationRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `charge_authorization` });
  };

  timeline = async (idOrReference: string | number) => {
    return this.apiRequest({ method: 'GET', url: `timeline/${idOrReference.toString()}` });
  };

  totals = (params: TransactionTotalsRequestParams) => {
    return this.apiRequest({ method: 'GET', url: `totals`, params });
  };

  export = (params: TransactionExportRequestParams) => {
    return this.apiRequest({ method: 'GET', url: `export`, params });
  };

  partialDebit = (data: TransactionPartialDebitRequestData) => {
    return this.apiRequest({ method: 'POST', url: `partial_debit`, data });
  };
}

export default Transaction;
