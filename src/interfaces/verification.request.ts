interface BaseRequest {
  [key: string]: string | number | undefined | string[] | boolean | object;
}

export interface VerificationRouteRequestData extends BaseRequest{
	account_name: string;
	account_type: string;
	account_number: string;
	bank_name: string;
	country_code: string;
	document_type: string;
	document_number?: string;
}