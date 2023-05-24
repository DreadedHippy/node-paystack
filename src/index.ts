import axios from 'axios';
import Transaction from './routes/transaction';
import { baseURL } from './static/variables';
import Split from './routes/split';

class Paystack {
  constructor(private key: string) {}

  private paystackClient = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.key}`,
    },
  });

  transaction = new Transaction(this.paystackClient);
  split = new Split(this.paystackClient);
}

function node_paystack(key: string) {
  return new Paystack(key);
}

export default node_paystack;
