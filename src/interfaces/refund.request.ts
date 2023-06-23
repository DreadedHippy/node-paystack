export interface RefundCreateRequestData {
  /** Transaction reference or id */
  transaction: string;
  /**
   * Amount ( in **kobo** if currency is `NGN`, **pesewas**, if currency is `GHS`, and **cents**, if currency is `ZAR` ) to be refunded to the customer.
   * Amount is optional(defaults to original transaction amount) and cannot be more than the original transaction amount.
   */
  amount?: number;
  /** Three-letter ISO currency. Allowed values are: `NGN`, `GHS`, `ZAR` or `USD` */
  currency?: string;
  /** Customer's reason for refund */
  customer_note?: string;
  /** Merchant reason for refund */
  merchant_note?: string;
}

export interface RefundListRequestParams {
  /** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
  perPage?: number;
  /** Specify exactly what page you want to retrieve. If not specify we use a default value of 1. */
  page?: number;
  /** A timestamp from which to start listing refund e.g. `2016-09-21` */
  from?: string;
  /** A timestamp at which to stop listing refund e.g. `2016-09-21` */
  to?: string;
  /** Identifier for transaction to be refunded */
  reference?: string;
  /** Three-letter ISO currency. Allowed values are: `NGN`, `GHS`, `ZAR` or `USD` */
  currency?: string;
}
