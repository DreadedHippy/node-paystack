import { AxiosInstance, AxiosError, CreateAxiosDefaults } from 'axios';
import { createAxiosInstance } from '../utils/utils';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';

class DedicatedAccount {
	paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'dedicated_account';
  }

	create = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	assign = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data, url: 'assign' });
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

	fetch = async (dedicatedAccountId: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `${dedicatedAccountId}` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	requery = async (dedicatedAccountId: string, params: {account_number: string, provider_slug: string, date?: string}) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `${dedicatedAccountId}`, params });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	deactivate = async (dedicatedAccountId: string) => {
    try {
      const result = await this.paystackClient({ method: 'DELETE', url: `${dedicatedAccountId}`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	splitAccountTransaction = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	removeSplit = async (data: {account_number: string}) => {
    try {
      const result = await this.paystackClient({ method: 'DELETE', data, url: 'split'});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	listProviders = async () => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: 'available_providers'});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };



}

export default DedicatedAccount