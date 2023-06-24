import { AxiosInstance, AxiosError, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';
import { baseURL } from '../static/variables';
import { createAxiosInstance } from '../utils/utils';
import { ClientConfig } from '../interfaces/global';
import {
  PageAddProductsRequestData,
  PageCreateRequestData,
  PageListRequestParams,
  PageUpdateRequestData,
} from '../interfaces/page.request';

class Page {
  private paystackClient: AxiosInstance = createAxiosInstance(this.axiosConfig);
  constructor(private axiosConfig: CreateAxiosDefaults, private clientConfig: ClientConfig) {
    this.paystackClient.defaults.baseURL = baseURL + 'page';
  }

  private apiRequest = async (requestConfig: AxiosRequestConfig) => {
    try {
      const result = await this.paystackClient(requestConfig);
      return this.clientConfig.showRaw ? result : result.data; // The data in the axios response
    } catch (error: any | AxiosError) {
      // console.log(error)
      let errorData = error.response?.data || error.cause;
      error.response?.data === undefined
        ? (errorData = { error: 'Data not received', cause: error.cause })
        : this.clientConfig.hideHttpErrorStatus
        ? (errorData = errorData)
        : (errorData.httpStatus = { statusCode: error.response?.status, statusMessage: error.response?.statusText });
      return this.clientConfig.showRaw ? error : errorData; // The data in the response of the axios error
    }
  };

  /**
   * @description Create a payment page on your integration
   * @param {PageCreateRequestData} data - The body of the API request
   * @example
   * Example usage of `create` method
   * ```js
   * paymentPage.create({
   *   "name": "Buttercup Brunch",
   *   "description": "Gather your friends for the ritual that is brunch",
   *   "amount": 500000
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Page created",
   *   "data": {
   *     "name": "Onipan and Hassan",
   *     "description": "",
   *     "amount": 10000,
   *     "split_code": "SPL_yqSS1FvrBz",
   *     "integration": 463433,
   *     "domain": "test",
   *     "slug": "1got2y8unp",
   *     "currency": "NGN",
   *     "type": "payment",
   *     "collect_phone": false,
   *     "active": true,
   *     "published": true,
   *     "migrate": false,
   *     "id": 1308510,
   *     "createdAt": "2023-03-21T11:44:16.412Z",
   *     "updatedAt": "2023-03-21T11:44:16.412Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  create = (data: PageCreateRequestData) => {
    return this.apiRequest({ method: 'POST', data });
  };

  /**
   * @description List payment pages available on your integration
   * @param {PageListRequestParams} params - The query parameters of the API request
   * @example
   * Example usage of `list` method
   * ```js
   * paymentPage.list()
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Pages retrieved",
   *   "data": [
   *     {
   *       "integration": 100073,
   *       "plan": 1716,
   *       "domain": "test",
   *       "name": "Subscribe to plan: Weekly small chops",
   *       "description": null,
   *       "amount": null,
   *       "currency": "NGN",
   *       "slug": "sR7Ohx2iVd",
   *       "custom_fields": null,
   *       "redirect_url": null,
   *       "active": true,
   *       "migrate": null,
   *       "id": 2223,
   *       "createdAt": "2016-10-01T10:59:11.000Z",
   *       "updatedAt": "2016-10-01T10:59:11.000Z"
   *     },
   *     {
   *       "integration": 100073,
   *       "plan": null,
   *       "domain": "test",
   *       "name": "Special",
   *       "description": "Special page",
   *       "amount": 10000,
   *       "currency": "NGN",
   *       "slug": "special-me",
   *       "custom_fields": [
   *         {
   *           "display_name": "Speciality",
   *           "variable_name": "speciality"
   *         },
   *         {
   *           "display_name": "Age",
   *           "variable_name": "age"
   *         }
   *       ],
   *       "redirect_url": "http://special.url",
   *       "active": true,
   *       "migrate": null,
   *       "id": 1807,
   *       "createdAt": "2016-09-09T19:18:37.000Z",
   *       "updatedAt": "2016-09-14T17:51:49.000Z"
   *     }
   *   ],
   *   "meta": {
   *     "total": 2,
   *     "skipped": 0,
   *     "perPage": "3",
   *     "page": 1,
   *     "pageCount": 1
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  list = (params?: PageListRequestParams) => {
    return this.apiRequest({ method: 'GET', params });
  };

  /**
   * @description Get details of a payment page on your integration
   * @param {string | number} idOrSlug - The page `ID` or `slug` you want to fetch
   * @example
   * Example usage of `fetch` method
   * ```js
   * paymentPage.fetch("5nApBwZkvY")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Page retrieved",
   *   "data": {
   *     "integration": 100032,
   *     "domain": "test",
   *     "name": "Offering collections",
   *     "description": "Give unto the Lord, and it shall be multiplied ten-fold to you.",
   *     "amount": null,
   *     "currency": "NGN",
   *     "slug": "5nApBwZkvY",
   *     "active": true,
   *     "id": 18,
   *     "createdAt": "2016-03-30T00:49:57.000Z",
   *     "updatedAt": "2016-03-30T00:49:57.000Z",
   *     "products": [
   *       {
   *         "product_id": 523,
   *         "name": "Product Four",
   *         "description": "Product Four Description",
   *         "product_code": "PROD_l9p81u9pkjqjunb",
   *         "page": 18,
   *         "price": 500000,
   *         "currency": "NGN",
   *         "quantity": 0,
   *         "type": "good",
   *         "features": null,
   *         "is_shippable": 0,
   *         "domain": "test",
   *         "integration": 343288,
   *         "active": 1,
   *         "in_stock": 1
   *       },
   *       {
   *         "product_id": 522,
   *         "name": "Product Five",
   *         "description": "Product Five Description",
   *         "product_code": "PROD_8ne9cxutagmtsyz",
   *         "page": 18,
   *         "price": 500000,
   *         "currency": "NGN",
   *         "quantity": 0,
   *         "type": "good",
   *         "features": null,
   *         "is_shippable": 0,
   *         "domain": "test",
   *         "integration": 343288,
   *         "active": 1,
   *         "in_stock": 0
   *       }
   *     ]
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  fetch = (idOrSlug: string | number) => {
    return this.apiRequest({ method: 'GET', url: `${idOrSlug}` });
  };

  /**
   * @description Update a payment page details on your integration
   * @param {string | number} idOrSlug - Page ID or slug
   * @example
   * Example usage of `update` method
   * ```js
   * paymentPage.update("5nApBwZkvY", {
   *   "name": "Buttercup Brunch",
   *   "description": "Gather your friends for the ritual that is brunch",
   *   "amount": 500000
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Page updated",
   *   "data": {
   *     "domain": "test",
   *     "name": "Buttercup Brunch",
   *     "description": "Gather your friends for the ritual that is brunch",
   *     "amount": null,
   *     "currency": "NGN",
   *     "slug": "5nApBwZkvY",
   *     "active": true,
   *     "id": 18,
   *     "integration": 100032,
   *     "createdAt": "2016-03-30T00:49:57.000Z",
   *     "updatedAt": "2016-03-30T04:44:35.000Z"
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  update = (idOrSlug: string, data: PageUpdateRequestData) => {
    return this.apiRequest({ method: 'PUT', url: `${idOrSlug}`, data });
  };

  /**
   * @description Check the availability of a slug for a payment page
   * @param {string} slug - URL slug to be confirmed
   * @example
   * Example usage of `checkSlugAvailability` method
   * ```js
   * paymentPage.checkSlugAvailability("5nApBwZkvY")
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Slug is available"
   * }
   * ```
   * @returns {Promise<any>}
   */
  checkSlugAvailability = (slug: string) => {
    return this.apiRequest({ method: 'GET', url: `check_slug_availability/${slug}` });
  };

  /**
   * @description Add products to a payment page
   * @param {string | number} pageId - Id of the payment page
   * @param {PageAddProductsRequestData} data - The body of the API request
   * @example
   * Example usage of `addProducts` method
   * ```js
   * paymentPage.addProducts("102859", {
   *   "products": [473, 292]
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   * ```
   * ***
   * Sample default response:
   * ```json
   * {
   *   "status": true,
   *   "message": "Products added to page",
   *   "data": {
   *     "integration": 343288,
   *     "plan": null,
   *     "domain": "test",
   *     "name": "Demo Products Page",
   *     "description": "Demo Products Page",
   *     "amount": null,
   *     "currency": "NGN",
   *     "slug": "demoproductspage",
   *     "custom_fields": [],
   *     "type": "product",
   *     "redirect_url": null,
   *     "success_message": null,
   *     "collect_phone": false,
   *     "active": true,
   *     "published": true,
   *     "migrate": true,
   *     "notification_email": null,
   *     "metadata": {},
   *     "id": 102859,
   *     "createdAt": "2019-06-29T16:21:24.000Z",
   *     "updatedAt": "2019-06-29T16:28:11.000Z",
   *     "products": [
   *       {
   *         "product_id": 523,
   *         "name": "Product Four",
   *         "description": "Product Four Description",
   *         "product_code": "PROD_l9p81u9pkjqjunb",
   *         "page": 102859,
   *         "price": 500000,
   *         "currency": "NGN",
   *         "quantity": 0,
   *         "type": "good",
   *         "features": null,
   *         "is_shippable": 0,
   *         "domain": "test",
   *         "integration": 343288,
   *         "active": 1,
   *         "in_stock": 1
   *       }
   *     ]
   *   }
   * }
   * ```
   * @returns {Promise<any>}
   */
  addProducts = (pageId: string | number, data: PageAddProductsRequestData) => {
    return this.apiRequest({ method: 'POST', url: `${pageId.toString()}/product`, data });
  };
}

export default Page;
