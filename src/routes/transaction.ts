import { RequestData, RequestParams } from '../interfaces/request';
import { AxiosInstance, AxiosError, AxiosResponse, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { SuccessResponse, ErrorResponse, AllResponse } from '../interfaces/response';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';

class Transaction {
	private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'transaction';
  }
  
	private apiRequest = async (requestConfig: AxiosRequestConfig) => {
		try {
      const result = await this.paystackClient(requestConfig);
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
			// console.log(error)
			let errorData = error.response?.data || error.cause  as AllResponse;
			error.response?.data == undefined ? errorData = {error : "Data not received", cause: error.cause} :
			errorData.httpStatus = {statusCode: error.response?.status, statusMessage: error.response?.statusText};
      return errorData; // The data in the response of the axios error
    }
	}
  
  initialize = async (data: RequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `initialize` });
  };

  verify = async (reference: string) => {
    return this.apiRequest({ method: 'GET', url: `verify/${reference}` });
  };

  list = async (params?: RequestParams) => {
    return this.apiRequest({ method: 'GET', params});
  };

  fetch = async (id: number) => {
    return this.apiRequest({ method: 'GET', url: `${id}`});
  };

  chargeAuthorization = async (data: RequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `charge_authorization` });
  };

  timeline = async (idOrReference: string | number) => {
    return this.apiRequest({ method: 'GET', url: `timeline/${idOrReference.toString()}` });
  };

  totals = async (params: RequestParams) => {
    return this.apiRequest({ method: 'GET', url: `totals`, params });
  };

  export = async (params: RequestParams) => {
    return this.apiRequest({ method: 'GET', url: `export`, params });
  };

  partialDebit = async (data: RequestData) => {
    return this.apiRequest({ method: 'POST', url: `partial_debit`, data });
  };
  
}

export default Transaction;
