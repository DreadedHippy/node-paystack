import { RequestData, RequestParams } from '../interfaces/request';
import { AxiosInstance, AxiosError, AxiosResponse, CreateAxiosDefaults } from 'axios';
import { SuccessResponse, ErrorResponse, AllResponse } from '../interfaces/response';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';

class BulkCharge {
	private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'bulkcharge';
  }

	initiate = async (data: {authorization: string, amount: number, reference: string}[]) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	list = async (params?: RequestParams) => {
    try {
      const result = await this.paystackClient({ method: 'GET', params});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	fetch = async (idOrCode: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `${idOrCode}`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	fetchCharges = async (idOrCode: string, params?: RequestParams) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `${idOrCode}/charges`, params});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	pause = async (batchCode: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `pause/${batchCode}`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	resume = async (batchCode: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `resume/${batchCode}`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };


}

export default BulkCharge;