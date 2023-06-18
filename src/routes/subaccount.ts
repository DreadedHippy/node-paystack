import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { createAxiosInstance } from '../utils/utils';

import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';


class Subaccount {
	private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'subaccount';
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

	create = (data: RequestData) => {
    return this.apiRequest({ method: 'POST', data });
	}

	list = (params?: RequestParams) => {
    return this.apiRequest({ method: 'GET', params });
	}

	fetch = (idOrCode: string) => {
    return this.apiRequest({ method: 'GET', url: `${idOrCode}` });
	}

	update = (idOrCode: string, data: RequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${idOrCode}`, data });
	}

}

export default Subaccount