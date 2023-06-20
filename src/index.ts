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

class Paystack {
  constructor(private key: string, private config: ClientConfig) {}
  private axiosConfig = {
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.key}`,
    },
  };

  transaction = new Transaction(this.axiosConfig, this.config);
  split = new Split(this.axiosConfig, this.config);
  terminal = new Terminal(this.axiosConfig, this.config);
  subaccount = new Subaccount(this.axiosConfig, this.config);
  plan = new Plan(this.axiosConfig, this.config);
  customer = new Customer(this.axiosConfig, this.config);
  miscellaneous = new Miscellaneous(this.axiosConfig, this.config);
  verification = new Verification(this.axiosConfig, this.config);
  dedicatedAccount = new DedicatedAccount(this.axiosConfig, this.config);
  subscription = new Subscription(this.axiosConfig, this.config);
  product = new Product(this.axiosConfig, this.config);
  paymentPage = new Page(this.axiosConfig, this.config);
  paymentRequest = new PaystackPaymentRequest(this.axiosConfig, this.config);
  settlement = new Settlement(this.axiosConfig, this.config);
  transferRecipient = new TransferRecipient(this.axiosConfig, this.config);
  transfer = new Transfer(this.axiosConfig, this.config);
  transfersControl = new TransfersControl(this.axiosConfig, this.config);
  bulkCharge = new BulkCharge(this.axiosConfig, this.config);
  integration = new Integration(this.axiosConfig, this.config);
  charge = new Charge(this.axiosConfig, this.config);
  dispute = new Dispute(this.axiosConfig, this.config);
  refund = new Refund(this.axiosConfig, this.config);
  applePay = new ApplePay(this.axiosConfig, this.config);
}

function node_paystack(key: string, config: ClientConfig = {showRaw: false, hideHttpErrorStatus: false}) {
  config.showRaw ? config.showRaw : config.showRaw = false;
  config.hideHttpErrorStatus ? config.hideHttpErrorStatus : config.hideHttpErrorStatus = false;
  
  return new Paystack(key, config);
}

export default node_paystack;
