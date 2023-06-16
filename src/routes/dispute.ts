import { RequestData, RequestParams } from '../interfaces/request';
import { AxiosInstance, AxiosError, AxiosResponse, CreateAxiosDefaults } from 'axios';
import { SuccessResponse, ErrorResponse, AllResponse } from '../interfaces/response';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';

class Dispute {
	private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'dispute';
  }

	list = async (params?: RequestParams) => {
    try {
      const result = await this.paystackClient({ method: 'GET', params });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	fetch = async (disputeId: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `${disputeId}` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	listTransactionDisputes = async (transactionId: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `transaction/${transactionId}` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	update = async (disputeId: string, data: {refund_amount: string, upload_filename?: string}) => {
    try {
      const result = await this.paystackClient({ method: 'PUT', url: `${disputeId}`, data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	addEvidence = async (disputeId: string, data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', url: `${disputeId}/evidence`, data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	getUploadURL = async (disputeId: string, params: RequestParams) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `${disputeId}/upload_url`, params });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

  resolve = async (disputeId: string, data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'PUT', url: `${disputeId}/resolve`, data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

  export = async (params: RequestParams) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `export`, params });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };
  


}

export default Dispute;