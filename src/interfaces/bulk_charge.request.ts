export interface BulkChargeInitiateRequestData {
  authorization: string;
  amount: number;
  reference: string;
}

export interface BulkChargeListRequestParams {
  perPage?: number;
  page?: number;
  from?: Date | string;
  to?: Date | string;
}

export interface BulkChargeFetchChargeRequestParams {
  status?: 'pending' | 'success' | 'failed';
  perPage?: number;
  page?: number;
  from?: Date | string;
  to?: Date | string;
}
