import { AxiosInstance, AxiosError, CreateAxiosDefaults } from 'axios';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';
import { CreatePlanRequestData } from '../interfaces/plan.request';
import { createAxiosInstance } from '../utils/utils';

class Plan {	
	paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'plan';
  }

	create = async (data: CreatePlanRequestData) => {
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

	fetch = async (idOrCode: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url:`${idOrCode}`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	update = async (idOrCode: string, data: CreatePlanRequestData) => {
    try {
      const result = await this.paystackClient({ method: 'PUT', url:`${idOrCode}`, data});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

}

export default Plan