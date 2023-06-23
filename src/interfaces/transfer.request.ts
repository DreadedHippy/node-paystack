export interface TransferInitiateRequestData {
  /** Where should we transfer from? Only `balance` for now */
  source: `balance` | string;
  /** Amount to transfer in kobo if **currency** is `NGN` and **pesewas** if currency is `GHS` */
  amount: number;
  /** Code for transfer recipient */
  recipient: string;
  /** The reason for the transfer */
  reason?: string;
  /** Specify the currency of the transfer. Defaults to `NGN` */
  currency?: string;
  /** If specified, the field should be a unique identifier (in lowercase) for the object. Only `-`,`_` and alphanumeric characters allowed. */
  reference?: string;
}

export interface TransferFinalizeRequestData {
  /** The transfer code you want to finalize */
  transfer_code: string;
  /** OTP sent to business phone to verify transfer */
  otp: string;
}

export interface TransferBulkInitiateRequestData {
  /** Where should we transfer from? Only `balance` for now */
  source: `balance` | string;
  /** A list of transfer object. Each object should contain `amount`, `recipient`, and `reference` */
  transfers: {
    amount: number;
    recipient: string;
    reference: string;
    reason?: string;
  }[];
}

export interface TransfersListRequestParams {
  /** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
  perPage?: number;
  /** Specify exactly what page you want to retrieve. If not specify we use a default value of 1. */
  page?: number;
  /** Filter by customer ID */
  customer?: number;
  /** A timestamp from which to start listing transfers e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
  from?: string;
  /** A timestamp at which to stop listing transfers e.g. `2016-09-24T00:00:05.000Z`, `2016-09-21` */
  to?: string;
}
