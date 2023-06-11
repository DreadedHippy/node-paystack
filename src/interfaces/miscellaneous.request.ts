interface BaseRequest {
  [key: string]: string | number | undefined | string[] | boolean | object;
}

export interface MiscellaneousRouteRequestData extends BaseRequest {
	country?: string;
	use_cursor?: boolean;
	per_page?: number;
	pay_with_bank_transfer?: boolean;
	pay_with_bank?: boolean;
	next?: string;
	previous?: string;
	gateway?: string;
	type?: string;
	currency?: 'NGN' | 'USD' | 'GHS' | 'ZAR';

}