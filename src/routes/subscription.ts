import { AxiosInstance, AxiosError, CreateAxiosDefaults } from 'axios';
import { createAxiosInstance } from '../utils/utils';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';

class Subscription {
	paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'subscription';
  }

	create = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	list = async (params?: RequestParams) => {
    try {
      const result = await this.paystackClient({ method: 'GET', params });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	fetch = async (subscriptionIdOrCode: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `${subscriptionIdOrCode}`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	enable = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `enable`, data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	disable = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `disable`, data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	generateUpdateLink = async (code: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `${code}/manage/link`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	sendUpdateLink = async (code: string) => {
    try {
      const result = await this.paystackClient({ method: 'POST', url: `${code}/manage/email`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };



}

export default Subscription;