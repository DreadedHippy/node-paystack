import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';
import { createAxiosInstance } from '../utils/utils';

class TransferRecipient {
	private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'transferrecipient';
  }

	create = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	bulkCreate = async (data: RequestData) => {
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
      const result = await this.paystackClient({ method: 'GET', url:`${idOrCode}`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	update = async (idOrCode: string, data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'PUT', data, url:`${idOrCode}`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	delete = async (idOrCode: string) => {
    try {
      const result = await this.paystackClient({ method: 'DELETE', url:`${idOrCode}`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };


}

export default TransferRecipient;