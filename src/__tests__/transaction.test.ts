import node_paystack from '../index';

describe('Transaction tests', () => {
  const newClass = node_paystack('sk_test_d2886236338ec9193406e6435d48b5336ed9dc7d');

  test('Test: Transaction initialization', (done) => {
    newClass.transaction
      .initialize({
        email: 'test@mail.com',
        amount: '1000',
      })
      .then((result) => {
        expect(result).toEqual(
          expect.objectContaining({
            status: expect.any(Boolean),
            message: expect.any(String),
            data: expect.any(Object),
          }),
        );
      })
      .catch((error) => {
        expect(error).toEqual(
          expect.objectContaining({
            status: expect.any(Boolean),
            message: expect.any(String),
          }),
        );
      });
    done();
  });

  test('Test: Transaction verification', (done) => {
    newClass.transaction
      .verify('1taultm45dixcsl')
      .then((result) => {
        expect(result).toEqual(
          expect.objectContaining({
            status: expect.any(Boolean),
            message: expect.any(String),
            data: expect.any(Object),
          }),
        );
      })
      .catch((error) => {
        expect(error).toEqual(
          expect.objectContaining({
            status: expect.any(Boolean),
            message: expect.any(String),
          }),
        );
      });
    done();
  });
});
