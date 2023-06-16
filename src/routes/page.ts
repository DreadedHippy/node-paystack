import { AxiosInstance, AxiosError, CreateAxiosDefaults } from 'axios';
import { baseURL } from '../static/variables';
import { RequestData, RequestParams } from '../interfaces/request';
import { AllResponse } from '../interfaces/response';
import { createAxiosInstance } from '../utils/utils';


class Page {
	private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults) {
    this.paystackClient.defaults.baseURL = baseURL + 'page';
  }

	create = async (data: RequestData) => {
    try {
      const result = await this.paystackClient({ method: 'POST', data });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	list = async (params?: RequestParams) => {
    try {
      const result = await this.paystackClient({ method: 'GET', params });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	fetch = async (idOrSlug: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `${idOrSlug}` });
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	update = async (idOrSlug: string, data: string) => {
    try {
      const result = await this.paystackClient({ method: 'PUT', url: `${idOrSlug}`, data});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	checkSlugAvailability = async (slug: string) => {
    try {
      const result = await this.paystackClient({ method: 'GET', url: `check_slug_availability/${slug}`});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };

	addProducts = async (pageId: string, productIds: string[] | number[]) => {
    try {
      const result = await this.paystackClient({ method: 'POST', url: `${pageId}/product`, data: { product: productIds}});
      return result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
			return error.response?.data || error.cause as AllResponse; // The data in the response of the axios error
    }
  };
}

export default Page