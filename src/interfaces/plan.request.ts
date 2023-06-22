export interface PlanCreateRequestData {
  /** Name of Plan */
  name: string;
  /** Amount should be in **kobo** if currency is `NGN`, **pesewas**, if currency is `GHS`, and **cents**, if currency is `ZAR` */
  amount: number;
  /** Interval in words. Valid intervals are: `daily`, `weekly`, `monthly`, `quarterly`, `biannually` (every 6 months), `annually`. */
  interval: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'biannually' | 'annually';
  /** A description for this plan */
  description?: string;
  /** Set to `false` if you don't want invoices to be sent to your customers */
  send_invoices?: boolean;
  /** Set to `false` if you don't want SMS to be sent to your customers */
  send_sms?: boolean;
  /** Currency in which amount should be charged. Allowed values are `NGN`, `GHS`, `ZAR` or `USD`. */
  currency?: string;
  /** Number of invoices to raise during subscription to this plan. Can be overridden by specifying an `invoice_limit` while subscribing. */
  invoice_limit?: number;
}

export interface PlanListRequestParams {
  /** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
  perPage?: number;
  /** Specify exactly what page you want to retrieve. If not specify we use a default value of 1. */
  page?: number;
  /** Filter list by plans with specified status */
  status?: string;
  /** Filter list by plans with specified interval */
  interval?: string;
  /** Filter list by plans with specified amount ( **kobo** if currency is `NGN`, **pesewas**, if currency is `GHS`, and **cents**, if currency is `ZAR`) */
  amount?: number;
}

export type PlanUpdateRequestData = Partial<PlanCreateRequestData>;
