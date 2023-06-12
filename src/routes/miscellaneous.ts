import { AxiosInstance, AxiosError, CreateAxiosDefaults } from 'axios';
import { baseURL } from '../static/variables';
import { AllResponse } from '../interfaces/response';
import { MiscellaneousRouteRequestData } from '../interfaces/miscellaneous.request';
import { createAxiosInstance } from '../utils/utils';

class Miscellaneous {
	paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL;
  }

	listBanks = async (params: MiscellaneousRouteRequestData) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: 'bank', params});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
	}

	listCountries = async () => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: 'country'});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
	}

	listStates = async (countryCode: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `address_verification/states?country=${countryCode}`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
	}

}

export default Miscellaneous