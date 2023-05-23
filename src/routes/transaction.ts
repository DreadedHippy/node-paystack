import { RequestData, RequestParams } from '../interfaces/request';
import { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { SuccessResponse, ErrorResponse, AllResponse } from '../interfaces/response';

class Transaction {
  constructor(private options: AxiosInstance) {
    this.options = options;
    this.options.defaults.baseURL = 'https://api.paystack.co/transaction';
  }

  initialize = async (data: RequestData): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const result = await this.options({ method: 'POST', data, url: `initialize` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response.data as Result; // The data in the response of the axios error
    }
  };

  verify = async (reference: string): Promise<AllResponse> => {
    try {
      const result = await this.options({ method: 'GET', url: `verify/${reference}` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response.data as Result;
    }
  };

  list = async (): Promise<AllResponse> => {
    try {
      const result = await this.options({ method: 'GET' });
      return result.data; // The data in the axios response
    } catch (error: any) {
      return error.response?.data as Result; // The data in the response of the axios error
    }
  };

  fetch = async (id: number) => {
    try {
      const result = await this.options({ method: 'GET', url: `${id}` });
      return result.data; // The data in the axios response
    } catch (error: any) {
      return error.response?.data as Result; // The data in the response of the axios error
    }
  };

  chargeAuthorization = async (data: RequestData) => {
    try {
      const result = await this.options({ method: 'POST', data, url: `charge_authorization` });
      return result.data;
    } catch (error: any | AxiosError) {
      return error.response?.data as Result;
    }
  };

  timeline = async (idOrReference: string | number) => {
    try {
      const result = await this.options({ method: 'GET', url: `timeline/${idOrReference.toString()}` });
      return result.data;
    } catch (error: any | AxiosError) {
      return error.response?.data as Result;
    }
  };

  totals = async (params: RequestParams) => {
    try {
      const result = await this.options({ method: 'GET', url: `totals`, params });
      return result.data;
    } catch (error: any | AxiosError) {
      return error.response?.data as Result;
    }
  };

  export = async (params: RequestParams) => {
    try {
      const result = await this.options({ method: 'GET', url: `export`, params });
      return result.data;
    } catch (error: any | AxiosError) {
      return error.response?.data as Result;
    }
  };

  partialDebit = async (data: RequestData) => {
    try {
      const result = await this.options({ method: 'POST', url: `partial_debit`, data });
      return result.data;
    } catch (error: any | AxiosError) {
      return error.response?.data as Result;
    }
  };
}

export default Transaction;
type Result = SuccessResponse & ErrorResponse;
