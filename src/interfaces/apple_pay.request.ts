export interface ApplePayRegisterDomainRequestData {
	domain_name: string;
}

export interface ApplePayListDomainsRequestParams {
	use_cursor?: boolean;
	next?: string;
	previous?: string;
}

export interface ApplePayUnregisterDomainRequestData {
	domain_name: string;
}
