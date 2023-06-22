import Transaction from './routes/transaction';
import { baseURL } from './static/variables';
import Split from './routes/split';
import Terminal from './routes/terminal';
import Customer from './routes/customer';
import Subaccount from './routes/subaccount';
import Miscellaneous from './routes/miscellaneous';
import Verification from './routes/verification';
import Plan from './routes/plan';
import DedicatedAccount from './routes/dedicated_account';
import Subscription from './routes/subscription';
import Product from './routes/product';
import Page from './routes/page';
import PaystackPaymentRequest from './routes/payment_request';
import Settlement from './routes/settlement';
import TransferRecipient from './routes/transfer_recipient';
import TransfersControl from './routes/transfers_control';
import Transfer from './routes/transfer';
import BulkCharge from './routes/bulk_charge';
import Integration from './routes/integration';
import Charge from './routes/charge';
import Dispute from './routes/dispute';
import Refund from './routes/refund';
import ApplePay from './routes/apple_pay';
import { ClientConfig } from './interfaces/global';


/**
 * Creates a new instance of a Paystack API Wrapper class
 * @class
 * @constructor
 * @public
 */
class Paystack {
  /**
   * Creates a new Paystack API Wrapper instance
   * @param {string} key - Paystack API key
   * @param {ClientConfig} config - Configuration options for the Paystack API Wrapper
   */
  constructor(private key: string, private config: ClientConfig) {}
  private axiosConfig = {
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.key}`,
    },
  };

  /**
   * Transaction route of The Paystack API. [See here](https://paystack.com/docs/api/transaction/)
   * @description The Transactions API allows you create and manage payments on your integration.
   */
  transaction = new Transaction(this.axiosConfig, this.config);

  /**
   * Split route of the Paystack API. [See Here](https://paystack.com/docs/api/split/)
   * @description The Transaction Splits API enables merchants split the settlement for a transaction across their payout account, and one or more subaccounts.
   */
  split = new Split(this.axiosConfig, this.config);
  
  /**
   * Terminal route of the Paystack API [See Here](https://paystack.com/docs/api/terminal/)
   * @description The Terminal API allows you to build delightful in-person payment experiences.
   */
  terminal = new Terminal(this.axiosConfig, this.config);
  
  /**
   * Subaccount route of the Paystack API. [See Here](https://paystack.com/docs/api/subaccount/)
   * @description The Subaccounts API allows you create and manage subaccounts on your integration. Subaccounts can be used to split payment between two accounts (your main account and a sub account).
   */
  subaccount = new Subaccount(this.axiosConfig, this.config);

  /**
   * Plan route of the Paystack API. [See Here](https://paystack.com/docs/api/plan/)
   * @description The Plans API allows you create and manage installment payment options on your integration.
   */
  plan = new Plan(this.axiosConfig, this.config);
  
  /**
   * Customer route of the Paystack API. [See Here](https://paystack.com/docs/api/customer/)
   * @description The Customers API allows you create and manage customers on your integration.
   */
  customer = new Customer(this.axiosConfig, this.config);
  
  /**
   * Miscellaneous Paystack API routes. [See Here](https://paystack.com/docs/api/miscellaneous/)
   * @description The Miscellaneous API are supporting APIs that can be used to provide more details to other APIs.
   */
  miscellaneous = new Miscellaneous(this.axiosConfig, this.config);

  /**
   * Verification route of The Paystack API. [See here](https://paystack.com/docs/api/verification/)
   * @description The Verification API allows you perform KYC processes.
   */
  verification = new Verification(this.axiosConfig, this.config);
  
  /**
   * Paystack API route for Dedicated Virtual Accounts(DVA). [See here](https://paystack.com/docs/api/dedicated-virtual-account/)
   * @description The Dedicated Virtual Account API enables Nigerian merchants to manage unique payment accounts of their customers.
   */
  dedicatedAccount = new DedicatedAccount(this.axiosConfig, this.config);
  
  /**
   * Subscription route of the Paystack API. [See here](https://paystack.com/docs/api/subscription/)
   * @description The Subscriptions API allows you create and manage recurring payment on your integration.
   */
  subscription = new Subscription(this.axiosConfig, this.config);
  
  /**
   * Product route of the Paystack API. [See here](https://paystack.com/docs/api/product/)
   * @description The Products API allows you create and manage inventories on your integration.
   */
  product = new Product(this.axiosConfig, this.config);
  
  /**
   * Paystack API route for Payment Pages. [See here](https://paystack.com/docs/api/page/)
   * @description The Payment Pages API provides a quick and secure way to collect payment for products.
   */
  paymentPage = new Page(this.axiosConfig, this.config);
  
  /**
   * Paystack API route for Payment Requests. [See here](https://paystack.com/docs/api/payment-request/)
   * @description The Payment Requests API allows you manage requests for payment of goods and services.
   */
  paymentRequest = new PaystackPaymentRequest(this.axiosConfig, this.config);
  
  /**
   * Settlement route of the Paystack API. [See here](https://paystack.com/docs/api/settlement/)
   * @descriptionThe Settlements API allows you gain insights into payouts made by Paystack to your bank account.
   */
  settlement = new Settlement(this.axiosConfig, this.config);
  
  /**
   * Paystack API route for Transfer Recipients. [See here](https://paystack.com/docs/api/transfer-recipient/)
   * @descriptionThe Transfer Recipients API allows you create and manage beneficiaries that you send money to.
   */
  transferRecipient = new TransferRecipient(this.axiosConfig, this.config);
  
  /**
   * Transfer route of the Paystack API. [See here](https://paystack.com/docs/api/transfer/)
   * @description The Transfers API allows you automate sending money to your customers.
   */
  transfer = new Transfer(this.axiosConfig, this.config);
  
  /**
   * Transfers Control route of the Paystack API. [See here](https://paystack.com/docs/api/transfer-control/)
   * @description The Transfers Control API allows you manage settings of your transfers.
   */
  transfersControl = new TransfersControl(this.axiosConfig, this.config);
  
  /**
   * Paystack API route for Bulk Charges. [See here](https://paystack.com/docs/api/bulk-charge/)
   * @description The Bulk Charges API allows you create and manage multiple recurring payments from your customers.
   */
  bulkCharge = new BulkCharge(this.axiosConfig, this.config);
  
  /**
   * Integration route of the Paystack API. [See here](https://paystack.com/docs/api/integration/)
   * @description The Integration API allows you manage some settings on your integration.
   */
  integration = new Integration(this.axiosConfig, this.config);
  
  /**
   * Charge route of the Paystack API. [See here](https://paystack.com/docs/api/charge/)
   * @description The Charge API allows you to configure payment channel of your choice when initiating a payment.
   */
  charge = new Charge(this.axiosConfig, this.config);
  
  /**
   * Dispute route of the Paystack API. [See here](https://paystack.com/docs/api/dispute/)
   * @description The Disputes API allows you manage transaction disputes on your integration.
   */
  dispute = new Dispute(this.axiosConfig, this.config);
  
  /**
   * Refund route of the Paystack API. [See here](https://paystack.com/docs/api/refund/)
   * @description The Refunds API allows you create and manage transaction refunds.
   */
  refund = new Refund(this.axiosConfig, this.config);
  
  /**
   * Paystack API route for Apple Pay. [See here](https://paystack.com/docs/api/apple-pay/)
   * @description The Apple Pay API allows you register your application's top-level domain or subdomain.
   */
  applePay = new ApplePay(this.axiosConfig, this.config);
}

/**
 * Properly sets up and returns a new instance of the Paystack API Wrapper class
 * @function
 * @param {string} key - Paystack API Key
 * @param {Object} config - Configuration options for the Paystack API Wrapper
 * @returns {Paystack} A new instance of the Paystack API Wrapper class
 */
function node_paystack(key: string, config: ClientConfig = {showRaw: false, hideHttpErrorStatus: false}) {
  config.showRaw ? config.showRaw : config.showRaw = false;
  config.hideHttpErrorStatus ? config.hideHttpErrorStatus : config.hideHttpErrorStatus = false;
  
  return new Paystack(key, config);
}

export default node_paystack;
