export interface PageCreateRequestData {
  /** Name of the page */
  name: string;
  /** A description for this page */
  description?: string;
  /** The type of the page to be created */
  type: string
  /** Amount should be in **kobo** if currency is `NGN`, **pesewas**, if currency is `GHS`, and **cents**, if currency is `ZAR` */
  amount?: number;
  /** The split code of the transaction split. e.g. `SPL_98WF13Eb3w` */
  split_code?: string;
  /** URL slug you would like to be associated with this page. Page will be accessible at https://paystack.com/pay/[slug] */
  slug?: string;
  /** Extra data to configure the payment page including subaccount, logo image, transaction charge */
  metadata?: object;
  /** If you would like Paystack to redirect someplace upon successful payment, specify the URL here. */
  redirect_url?: string;
  /** If you would like to accept custom fields, specify them here. */
  custom_fields?: object[];
}

export interface PageListRequestParams {
  /** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
  perPage?: number;
  /** Specify exactly what page you want to retrieve. If not specify we use a default value of 1. */
  page?: number;
  /** A timestamp from which to start listing page e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
  from?: string;
  /** A timestamp at which to stop listing page e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
  to?: string;
}

export interface PageUpdateRequestData {
  /** Name of page */
  name?: string;
  /** A description for this page */
  description?: string;
  /** Default amount you want to accept using this page. If none is set, customer is free to provide any amount of their choice. The latter scenario is useful for accepting donations */
  amount?: string;
  /** Set to false to deactivate page url */
  active?: boolean;
}

export interface PageAddProductsRequestData {
  /** Ids of all the products */
  products: number[];
}
