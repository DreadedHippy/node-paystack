export interface ProductCreateRequestData {
  /** Name of product */
  name: string;
  /** A description for this product */
  description: string;
  /** Price should be in **kobo** if currency is `NGN`, **pesewas**, if currency is `GHS`, and **cents**, if currency is `ZAR` */
  price: number;
  /** Currency in which price is set. Allowed values are: `NGN`, `GHS`, `ZAR` or `USD` */
  currency: string;
  /** Set to true if the product has unlimited stock. Leave as false if the product has limited stock */
  unlimited?: boolean;
  /** Number of products in stock. Use if unlimited is false */
  quantity?: number;
}

export interface ProductListRequestParams {
  /** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
  perPage?: number;
  /** Specify exactly what page you want to retrieve. If not specify we use a default value of 1. */
  page?: number;
  /** A timestamp from which to start listing product e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
  from?: string;
  /** A timestamp at which to stop listing product e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
  to?: string;
}

export type ProductUpdateRequestData = Partial<ProductCreateRequestData>;
