export interface PaymentRequestCreateRequestData {
  /** Customer id or code */
  customer: string;
  /** Payment request amount. It should be used when line items and tax values aren't specified. */
  amount: number;
  /** ISO 8601 representation of request due date */
  due_date?: string;
  /** A short description of the payment request */
  description?: string;
  /** Array of line items in the format `[{"name":"item 1", "amount":2000, "quantity": 1}]` */
  line_items?: { name: string; amount: number; quantity?: number }[];
  /** Array of taxes to be charged in the format `[{"name":"VAT", "amount":2000}]` */
  tax?: { name: 'VAT'; amount: number }[];
  /** Specify the currency of the payment request. Allowed values are `NGN`, `GHS`, `ZAR` and `USD`. Defaults to `NGN` */
  currency?: `NGN` | `GHS` | `USD` | `ZAR`;
  /** Indicates whether Paystack sends an email notification to customer. Defaults to `true` */
  send_notification?: string;
  /** Indicate if request should be saved as draft. Defaults to false and overrides send_notification */
  draft?: boolean;
  /** Set to `true` to create a draft payment request (adds an auto incrementing payment request number if none is provided) even if there are no `line_items` or `tax` passed */
  has_invoice?: boolean;
  /** Numeric value of the payment request. Payment Requests will start from 1 and auto increment from there. This field is to help override whatever value Paystack decides. Auto increment for subsequent payment requests continue from this point. */
  invoice_number?: number;
  /** The split code of the transaction split. e.g. `SPL_98WF13Eb3w` */
  split_code?: string;
}

export interface PaymentRequestListRequestParams {
  /** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
  perPage?: number;
  /** Specify the page you want to fetch payment requests from. If not specify we use a default value of 1. */
  page?: number;
  /** Filter by customer ID */
  customer?: string;
  /** Filter by payment request status */
  status?: string;
  /** Filter by currency. Allowed values are `NGN`, `GHS`, `ZAR` and `USD`. */
  currency?: `NGN` | `GHS` | `USD` | `ZAR`;
  /** Show archived payment requests */
  include_archive?: string;
  /** A timestamp from which to start listing payment requests e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
  from?: string;
  /** A timestamp at which to stop listing payment requests e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
  to?: string;
}

export interface PaymentRequestFinalizeRequestData {
  /** Indicates whether Paystack sends an email notification to customer. Defaults to `true` */
  send_notification: boolean;
}

export type PaymentRequestUpdateRequestData = Partial<PaymentRequestCreateRequestData>;
