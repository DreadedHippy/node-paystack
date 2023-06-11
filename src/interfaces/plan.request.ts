export interface CreatePlanRequestData {
	name: string;
	amount: number;
	interval: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'bianually' | 'anually';
	description?: string;
	send_invoices?: boolean;
	send_sms?: boolean;
	currency?: string;
	invoice_limit?: number;
}