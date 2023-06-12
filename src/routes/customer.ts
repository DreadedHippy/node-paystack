import { AxiosInstance, AxiosError, CreateAxiosDefaults } from 'axios';
import { createAxiosInstance } from '../utils/utils';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';
import { CustomerRouteRequestData, CustomerRouteRequestParams } from '../interfaces/customer.request';

class Customer {
	paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'customer';
  }

	create = async (data: CustomerRouteRequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	list = async (params?: CustomerRouteRequestParams) => {
    try {
      const result = await this.paystackClient({ method: 'GET', params});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	fetch = async (emailOrCode: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `${emailOrCode}` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	update = async (code: string, data: Partial<CustomerRouteRequestData>) => {
    try {
      const result = await this.paystackClient({ method: 'PUT', url: `${code}`, data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	validate = async (emailOrCode: string, data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'PUT', url: `${emailOrCode}/identification`, data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	setRiskAction = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', url: `set_risk_action`, data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	deactivateAuthorization = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', url: `deactivate_authorization`, data});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };
}

export default Customer