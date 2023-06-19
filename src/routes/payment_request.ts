import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';
import { createAxiosInstance } from '../utils/utils';

class PaymentRequest {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'paymentrequest';
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

  create = (data: RequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  list = (params?: RequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  fetch = (idOrCode: string) => {
    return this.apiRequest({ method: 'GET', url: `${idOrCode}` });
  };

  verify = (code: string) => {
    return this.apiRequest({ method: 'GET', url: `verify/${code}` });
  };

  notify = (idOrCode: string) => {
    return this.apiRequest({ method: 'POST', url: `notify/${idOrCode}` });
  };

  total = () => {
    return this.apiRequest({ method: 'GET', url: `totals` });
  };

  finalize = (idOrCode: string, sendNotification: boolean = true) => {
    return this.apiRequest({
      method: 'POST',
      url: `finalize/${idOrCode}`,
      data: { send_notification: sendNotification },
    });
  };

  update = (idOrCode: string, data: RequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${idOrCode}`, data });
  };

  archive = (idOrCode: string) => {
    return this.apiRequest({ method: 'POST', url: `archive/${idOrCode}` });
  };
}

export default PaymentRequest;
