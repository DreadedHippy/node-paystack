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

class Paystack {
  constructor(private key: string) {}
  private axiosConfig = {
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.key}`
    },
  }

  transaction = new Transaction(this.axiosConfig);
  split = new Split(this.axiosConfig);
  terminal = new Terminal(this.axiosConfig);
  subaccount = new Subaccount(this.axiosConfig);
  plan = new Plan(this.axiosConfig);
  customer = new Customer(this.axiosConfig);
  miscellaneous = new Miscellaneous(this.axiosConfig);
  verification = new Verification(this.axiosConfig);
  dedicatedAccount = new DedicatedAccount(this.axiosConfig);
  subscription = new Subscription(this.axiosConfig);
  product = new Product(this.axiosConfig);
  paymentPage = new Page(this.axiosConfig);
  paymentRequest = new PaystackPaymentRequest(this.axiosConfig);
  settlement = new Settlement(this.axiosConfig);
  transferRecipient = new TransferRecipient(this.axiosConfig);
  transfer = new Transfer(this.axiosConfig);
  transfersControl = new TransfersControl(this.axiosConfig);
  bulkCharge = new BulkCharge(this.axiosConfig);
  integration = new Integration(this.axiosConfig);
  charge = new Charge(this.axiosConfig);
  dispute = new Dispute(this.axiosConfig);
  refund = new Refund(this.axiosConfig);
  applePay = new ApplePay(this.axiosConfig);
  
}

function node_paystack(key: string) {
  return new Paystack(key);
}

export default node_paystack;
