import { RequestData, RequestParams } from '../interfaces/request';
import { AxiosInstance, AxiosError, AxiosResponse, CreateAxiosDefaults } from 'axios';
import { SuccessResponse, ErrorResponse, AllResponse } from '../interfaces/response';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';

class Charge {
	private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'charge';
  }

	create = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	submitPin = async (data: {pin: string, reference: string}) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data, url: `submit_pin` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };


	submitOTP = async (data: {otp: string, reference: string}) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data, url: `submit_otp` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	submitPhone = async (data: {phone: string, reference: string}) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data, url: `submit_phone` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	submitBirthday = async (data: {birthday: `${number}${number}${number}${number}-${number}${number}-${number}${number}`, reference: string}) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data, url: `submit_birthday` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	submitAddress = async (data: {address: string, city: string, state: string, zip_code: string, reference: string}) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data, url: `submit_address` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	checkPending = async (reference: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `${reference}` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

}

export default Charge;