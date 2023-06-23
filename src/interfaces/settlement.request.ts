export interface SettlementListRequestParams {
  /** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
  perPage?: number;
  /** Specify exactly what page you want to retrieve. If not specify we use a default value of 1. */
  page?: number;
  /** A timestamp from which to start listing settlements e.g. `2016-09-21` */
  from?: string;
  /** A timestamp at which to stop listing settlements e.g. `2016-09-21` */
  to?: string;
  /** Fetch settlements based on their state. Value can be one of `success`, `processing`, `pending` or `failed`. */
  status?: `success` | `processing` | `pending` | `failed`;
  /** Provide a subaccount ID to export only settlements for that subaccount. Set to none to export only transactions for the account. */
  subaccount?: string;
}

export interface SettlementListTransactionsRequestParams {
  /** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
  perPage?: number;
  /** Specify exactly what page you want to retrieve. If not specify we use a default value of 1. */
  page?: number;
  /** A timestamp from which to start listing settlement transactions e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
  from?: string;
  /** A timestamp at which to stop listing settlement transactions e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
  to?: string;
}
