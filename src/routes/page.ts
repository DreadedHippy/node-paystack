import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';
import { createAxiosInstance } from '../utils/utils';

class Page {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'page';
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

  fetch = (idOrSlug: string) => {
    return this.apiRequest({ method: 'GET', url: `${idOrSlug}` });
  };

  update = (idOrSlug: string, data: string) => {
    return this.apiRequest({ method: 'PUT', url: `${idOrSlug}`, data });
  };

  checkSlugAvailability = (slug: string) => {
    return this.apiRequest({ method: 'GET', url: `check_slug_availability/${slug}` });
  };

  addProducts = (pageId: string, productIds: string[] | number[]) => {
    return this.apiRequest({ method: 'POST', url: `${pageId}/product`, data: { product: productIds } });
  };
}

export default Page;
