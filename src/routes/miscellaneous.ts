import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { AllResponse } from '../interfaces/response';
import { MiscellaneousRouteRequestData } from '../interfaces/miscellaneous.request';
import { createAxiosInstance } from '../utils/utils';

class Miscellaneous {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL;
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

  listBanks = (params?: MiscellaneousRouteRequestData) => {
    return this.apiRequest({ method: 'GET', url: 'bank', params });
  };

  listCountries = () => {
    return this.apiRequest({ method: 'GET', url: 'country' });
  };

  listStates = (countryCode: string) => {
    return this.apiRequest({ method: 'GET', url: `address_verification/states?country=${countryCode}` });
  };
}

export default Miscellaneous;
