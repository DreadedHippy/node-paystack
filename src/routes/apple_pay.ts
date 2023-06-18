import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { AllResponse } from '../interfaces/response';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';


class ApplePay {
	private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'apple-pay';
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

	registerDomain = (data: {domainName: string}) => {
		return this.apiRequest({ method: 'POST', data, url: `domain` });
  };

	listDomains = () => {
		return this.apiRequest({ method: 'GET', url: `domain` });
  };

	unregisterDomain = (data: {domainName: string}) => {
		return this.apiRequest({ method: 'DELETE', data, url: `domain` });
  };

}

export default ApplePay