import node_paystack from '../index';

test('Paystack class', () => {
  const newClass = node_paystack('Carl');
  // expect(newClass.showKey()).toBe('Carl');
});

test('Test transaction class', () => {
  const newClass = node_paystack('Carl');
  expect(newClass.transaction.list()).toBe('list');
});
