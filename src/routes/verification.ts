import { AxiosInstance, AxiosError, CreateAxiosDefaults } from 'axios';
import { baseURL } from '../static/variables';
import { AllResponse } from '../interfaces/response';
import { VerificationRouteRequestData } from '../interfaces/verification.request';
import { createAxiosInstance } from '../utils/utils';

class Verification {
	paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL 
  }

	resolveAccount = async (data: {account_number: string; bank_code: string;}) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `bank/resolve?account_number=${data.account_number}&bank_code=${data.bank_code}`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
	}

	validateAccount = async (data: VerificationRouteRequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', url: `bank/validate`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
	}

	resolveCardBin = async (bin: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `decision/bin/${bin}`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
	}

}

export default Verification