import axios from 'axios';
import Transaction from './routes/transactions';

class Paystack {
  constructor(private key: string) {}

  paystackInstance = axios.create({
    baseURL: 'https://api.paystack.co',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.key}`,
    },
  });

  transaction = new Transaction(this.paystackInstance);
}

function node_paystack(key: string) {
  return new Paystack(key);
}

export default node_paystack;
