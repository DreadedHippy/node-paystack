export interface ChargeCreateRequestData {
	/** Customer's email address */
	email: string;
	/** Amount should be in kobo if currency is NGN, pesewas, if currency is GHS, and cents, if currency is ZAR */
	amount: number;
	/** Bank account to charge (don't send if charging an authorization code) */
	bank?: object;
	/** An authorization code to charge (don't send if charging a bank account) */
	authorization_code?: string;
	/** 4-digit PIN (send with a non-reusable authorization code) */
	pin?: string;
	/** A JSON object */
	metadata?: object;
	/** Unique transaction reference. Only `-`, `.`, `=` and alphanumeric characters allowed. */
	reference?: string;
	/** USSD type to charge (don't send if charging an authorization code, bank or card) */
	ussd?: object;
	/** Mobile details (don't send if charging an authorization code, bank or card) */
	mobile_money?: object;
	/** This is the unique identifier of the device a user uses in making payment. Only `-`, `.`, `=` and alphanumeric characters allowed. */
	device_id?: string
}

export interface ChargeSubmitPinRequestData {
	/** PIN submitted by user */
	pin: string;
	/** Reference for transaction that requested pin */
	reference: string;
}

export interface ChargeSubmitOTPRequestData {
	/** OTP submitted by user */
	otp: string;
	/** Reference for ongoing transaction */
	reference: string;
}

export interface ChargeSubmitPhoneRequestData {
	/** Phone number submitted by user */
	phone: string;
	/** Reference for ongoing transaction */
	reference: string;
}

export interface ChargeSubmitBirthdayRequestData {
	/** Birthday submitted by user */
	birthday: string;
	/** Reference for ongoing transaction */
	reference: string;
}

export interface ChargeSubmitAddressRequestData {
	/** Address submitted by user */
	address: string;
	/** City submitted by user */
	city: string;
	/** State submitted by user */
	state: string;
	/** Zip code submitted by user */
	zip_code: string;
	/** Reference for ongoing transaction */
	reference: string;
}
