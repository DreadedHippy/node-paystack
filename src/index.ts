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

class Paystack {
  constructor(private key: string) {}
  axiosConfig = {
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
}

function node_paystack(key: string) {
  return new Paystack(key);
}

export default node_paystack;
