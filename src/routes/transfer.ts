import { AxiosInstance, AxiosError, CreateAxiosDefaults } from 'axios';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';
import { createAxiosInstance } from '../utils/utils';

class Transfer {
	private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'transfer';
  }

	initiate = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	finalize = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data, url: 'finalize_transfer' });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	bulkInitiate = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data, url: 'bulk' });
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

	verify = async (reference: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `verify/${reference}`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };


};

export default Transfer;