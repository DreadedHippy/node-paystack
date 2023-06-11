import { RequestData, RequestParams } from '../interfaces/request';
import { AxiosInstance, AxiosError, AxiosResponse, CreateAxiosDefaults } from 'axios';
import { SuccessResponse, ErrorResponse, AllResponse } from '../interfaces/response';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';

class Transaction {
	paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'transaction';
  }
  
  initialize = async (data: RequestData): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const result = await this.paystackClient({ method: 'POST', data, url: `initialize` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response.data as AllResponse; // The data in the response of the axios error
    }
  };

  verify = async (reference: string): Promise<AllResponse> => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `verify/${reference}` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response.data as AllResponse;
    }
  };

  list = async (): Promise<AllResponse> => {
    try {
      const result = await this.paystackClient({ method: 'GET' });
      return result.data; // The data in the axios response
    } catch (error: any) {
      return error.response?.data as AllResponse; // The data in the response of the axios error
    }
  };

  fetch = async (id: number) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `${id}` });
      return result.data; // The data in the axios response
    } catch (error: any) {
      return error.response?.data as AllResponse; // The data in the response of the axios error
    }
  };

  chargeAuthorization = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data, url: `charge_authorization` });
      return result.data;
    } catch (error: any | AxiosError) {
      return error.response?.data as AllResponse;
    }
  };

  timeline = async (idOrReference: string | number) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `timeline/${idOrReference.toString()}` });
      return result.data;
    } catch (error: any | AxiosError) {
      return error.response?.data as AllResponse;
    }
  };

  totals = async (params: RequestParams) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `totals`, params });
      return result.data;
    } catch (error: any | AxiosError) {
      return error.response?.data as AllResponse;
    }
  };

  export = async (params: RequestParams) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `export`, params });
      return result.data;
    } catch (error: any | AxiosError) {
      return error.response?.data as AllResponse;
    }
  };

  partialDebit = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', url: `partial_debit`, data });
      return result.data;
    } catch (error: any | AxiosError) {
      return error.response?.data as AllResponse;
    }
  };
}

export default Transaction;
