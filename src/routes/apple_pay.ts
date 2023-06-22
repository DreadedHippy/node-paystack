import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { AllResponse } from '../interfaces/response';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import { ApplePayListDomainsRequestParams, ApplePayRegisterDomainRequestData, ApplePayUnregisterDomainRequestData } from '../interfaces/apple_pay.request';

class ApplePay {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(
    private axiosConfig: CreateAxiosDefaults,
    private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'apple-pay';
  }

  private apiRequest = async (requestConfig: AxiosRequestConfig) => {
    try {
      const result = await this.paystackClient(requestConfig);
      return this.clientConfig.showRaw ? result : result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      // console.log(error)
      let errorData = error.response?.data || error.cause;
      error.response?.data === undefined
        ? (errorData = { error: 'Data not received', cause: error.cause })
        : this.clientConfig.hideHttpErrorStatus
        ? errorData
        : (errorData.httpStatus = { statusCode: error.response?.status, statusMessage: error.response?.statusText });
      return this.clientConfig.showRaw ? error : errorData; // The data in the response of the axios error
    }
  };

  registerDomain = (data: ApplePayRegisterDomainRequestData) => {
    return this.apiRequest({ method: 'POST', data, url: `domain` });
  };

  listDomains = (params?: ApplePayListDomainsRequestParams) => {
    return this.apiRequest({ method: 'GET', url: `domain`, params });
  };

  unregisterDomain = (data: ApplePayUnregisterDomainRequestData) => {
    return this.apiRequest({ method: 'DELETE', data, url: `domain` });
  };
}

export default ApplePay;
