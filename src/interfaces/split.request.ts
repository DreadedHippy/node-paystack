export interface SplitCreateRequestData {
	/** Name of the transaction split. */
	name: string;
	/** The type of transaction split you want to create. You can use one of the following: `percentage` | `flat` */
	type: `percentage` | `flat`;
	/** Any of `NGN`, `GHS`, `ZAR`, or `USD` */
	currency: `NGN` | `GHS` | `ZAR` | `USD`;
	/** A list of object containing subaccount code and number of shares: `[{subaccount: ‘ACT_xxxxxxxxxx’, share: xxx},{...}]` */
	subaccounts: Array<{subaccount: string, share: number}>;
	/** Any of `subaccount` | `account` | `all-proportional` | `all` */
	bearer_type: `subaccount` | `account` | `all-proportional` | `all`;
	/** Subaccount code */
	bearer_subaccount: string;
}

export interface SplitListRequestParams {
	/** Number of splits per page. If not specify we use a default value of 50. */
	perPage?: number;
	/** Page number to view. If not specify we use a default value of 1. */
	page?: number;
	/** A timestamp from which to start listing splits e.g. `2019-09-24T00:00:05.000Z`, `2019-09-21` */
	from?: string;
	/** A timestamp at which to stop listing splits e.g. `2019-09-24T00:00:05.000Z`, `2019-09-21` */
	to?: string;
	/** Name of the split */
	name?: string;
	/** Any of `true` or `false` */
	active?: boolean;
	/** Sort by name, defaults to createdAt date */
	sort_by?: string;
}

export interface SplitUpdateRequestData {
	/** Name of the transaction split */
	name?: string;
	/** `true` or `false` */
	active?: boolean;
	/** Any of the following values: `subaccount` | `account` | `all-proportional` | `all` */
	bearer_type?: `subaccount` | `account` | `all-proportional` | `all`;
	/** Subaccount code of a subaccount in the split group. This should be specified only if the `bearer_type` is `subaccount` */
	bearer_subaccount?: string;
}

export interface SplitUpsertSubaccountRequestData {
	/** This is the sub account code */
	subaccount: string;
	/** This is the transaction share for the subaccount */
	share: number;
}

export interface SplitRemoveSubaccountRequestData {
	/** This is the sub account code */
	subaccount: string;
}