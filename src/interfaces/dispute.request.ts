export interface DisputeListRequestParams {
	/** Specify how many records you want to retrieve per page. If not specify we use a default value of 50 */
	perPage?: number;
	/** Specify exactly what page you want to retrieve. If not specify we use a default value of 1 */
	page?: number;
	/** A timestamp from which to start listing dispute e.g. `2016-09-21` */
	from?: string;
	/** A timestamp at which to stop listing dispute e.g. `2016-09-21` */
	to?: string;
	/** Transaction Id */
	transaction?: string;
	/** Dispute Status. Acceptable values: { `awaiting-merchant-feedback` | `awaiting-bank-feedback` | `pending` | `resolved` } */
	status?: `awaiting-merchant-feedback` | `awaiting-bank-feedback` | `pending` | `resolved`;
}

export interface DisputeUpdateRequestData {
	/** the amount to refund, in **kobo** if currency is `NGN`, **pesewas**, if currency is `GHS`, and **cents**, if currency is `ZAR` */
	refund_amount?: number;
	/** filename of attachment returned via response from upload url(`GET /dispute/:id/upload_url` | `dispute.getUploadUrl()`) */
	uploaded_filename?: string;
}

export interface DisputeAddEvidenceRequestData {
	/** Customer's email */
	customer_email: string;
	/** Customer's name */
	customer_name: string;
	/** Customer's phone number */
	customer_phone: string;
	/** Details of service involved */
	service_details: string;
	/** Delivery address */
	delivery_address?: string;
	/** ISO 8601 representation of delivery date (YYYY-MM-DD) */
	delivery_date?: string;
}

export interface DisputeGetUploadURLRequestParams {
	/** The file name, with its extension, that you want to upload. e.g `filename.pdf` */
	upload_filename: string;
}

export type DisputeResolveRequestData = {
	/** Dispute resolution. Accepted values: { `merchant-accepted` | `declined` }. */
	resolution: `merchant-accepted` | `declined`;
	/** Reason for resolving */
	message: string;
	/** the amount to refund, in **kobo** if currency is `NGN`, **pesewas**, if currency is `GHS`, and **cents**, if currency is `ZAR` */
	refund_amount?: string;
	/** filename of attachment returned via response from upload url(`GET /dispute/:id/upload_url` | `dispute.getUploadUrl()`) */
	uploaded_filename?: string;
	/** Evidence Id for fraud claims */
	evidence?: number
}
