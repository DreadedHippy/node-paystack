interface BaseRequest {
  [key: string]: string | number | undefined | string[] | boolean | object;
}

export interface CustomerRouteRequestData extends BaseRequest {
	email: string;
	first_name: string;
	last_name: string;
	phone?: string;
	metadata?: object;
}

export interface CustomerRouteRequestParams extends BaseRequest {
	perPage?: number;
	page?: number;
	from: string;
	to: string;
}
