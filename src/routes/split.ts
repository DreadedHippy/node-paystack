import { AxiosInstance, AxiosError } from 'axios';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';

class Split {
  constructor(private paystackClient: AxiosInstance) {
    this.paystackClient = paystackClient;
    this.paystackClient.defaults.baseURL = baseURL + 'split';
  }

  create = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response.data as AllResponse; // The data in the response of the axios error
    }
  };

  list = async (params: RequestParams = {}) => {
    try {
      const result = await this.paystackClient({ method: 'GET', params });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response.data as AllResponse; // The data in the response of the axios error
    }
  };
}

export default Split;
