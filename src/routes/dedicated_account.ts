import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { createAxiosInstance } from '../utils/utils';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';

class DedicatedAccount {
	private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'dedicated_account';
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
  };

	assign = (data: RequestData) => {
    return this.apiRequest({ method: 'POST', data, url: 'assign' });
  };

	list = (params?: RequestParams) => {
    return this.apiRequest({ method: 'GET', params});
  };

	fetch = (dedicatedAccountId: string) => {
    return this.apiRequest({ method: 'GET', url: `${dedicatedAccountId}`});
  };

	requery = (params: {account_number: string, provider_slug: string, date?: string}) => {
    return this.apiRequest({ method: 'GET', url: `requery`, params});
  };

	deactivate = (dedicatedAccountId: string) => {
    return this.apiRequest({ method: 'DELETE', url: `${dedicatedAccountId}`});
  };

	splitAccountTransaction = (data: RequestData) => {
    return this.apiRequest({ method: 'POST', data});
  };

	removeSplit = (data: {account_number: string}) => {
    return this.apiRequest({ method: 'DELETE', data, url: 'split'});
  };

	listProviders = () => {
    return this.apiRequest({method: 'GET', url: 'available_providers'});
  };



}

export default DedicatedAccount