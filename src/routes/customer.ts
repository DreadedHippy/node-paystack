import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { createAxiosInstance } from '../utils/utils';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';
import { CustomerRouteRequestData, CustomerRouteRequestParams } from '../interfaces/customer.request';

class Customer {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'customer';
  }

  private apiRequest = async (requestConfig: AxiosRequestConfig) => {
    try {
      const result = await this.paystackClient(requestConfig);
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      // console.log(error)
      let errorData = error.response?.data || (error.cause as AllResponse);
      error.response?.data === undefined
        ? (errorData = { error: 'Data not received', cause: error.cause })
        : (errorData.httpStatus = { statusCode: error.response?.status, statusMessage: error.response?.statusText });
      return errorData; // The data in the response of the axios error
    }
  };

  create = (data: CustomerRouteRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  list = (params?: CustomerRouteRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  fetch = (emailOrCode: string) => {
    return this.apiRequest({ method: 'GET', url: `${emailOrCode}` });
  };

  update = (code: string, data: Partial<CustomerRouteRequestData>) => {
    return this.apiRequest({ method: 'PUT', url: `${code}`, data });
  };

  validate = (emailOrCode: string, data: RequestData) => {
    return this.apiRequest({ method: 'POST', url: `${emailOrCode}/identification`, data });
  };

  setRiskAction = (data: RequestData) => {
    return this.apiRequest({ method: 'POST', url: `set_risk_action`, data });
  };

  deactivateAuthorization = (data: RequestData) => {
    return this.apiRequest({ method: 'POST', url: `deactivate_authorization`, data });
  };
}

export default Customer;
