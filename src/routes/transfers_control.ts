import { AxiosInstance, AxiosError, CreateAxiosDefaults } from 'axios';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';
import { createAxiosInstance } from '../utils/utils';

class TransfersControl {
	paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL;
  }

	checkBalance = async () => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: 'balance' });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	fetchBalanceLedger = async () => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: 'balance/ledger' });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };
	
	resendOTP = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', url: 'transfer/resend_otp', data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	disableOTP = async () => {
    try {
      const result = await this.paystackClient({ method: 'POST', url: 'transfer/disable_otp'});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	finalizeDisableOTP = async (data: {otp: string}) => {
    try {
      const result = await this.paystackClient({ method: 'POST', url: 'transfer/disable_otp_finalize', data});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	enableOTP = async () => {
    try {
      const result = await this.paystackClient({ method: 'POST', url: 'transfer/enable_otp'});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

};

export default TransfersControl;