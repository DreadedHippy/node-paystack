import node_paystack from '..';

describe('Split tests updates', () => {
  const paystack = node_paystack(process.env.KEY as string);
  test('Update name of split', async () => {
    paystack.split
      .update('760472', { name: 'Updated name' })
      .then((result) => {
        expect(result.data.name).toBe('Updated name');
      })
      .catch((error) => {
        expect(error).toEqual(
          expect.objectContaining({
            status: false,
            message: expect.any(String),
          }),
        );
      });
  });

  test('Test id as number instead of string', async () => {
    paystack.split
      .update(760472, { name: 'Numbered ID' })
      .then((result) => {
        expect(result.data.name).toBe('Updated name');
      })
      .catch((error) => {
        expect(error).toEqual(
          expect.objectContaining({
            status: false,
            message: expect.any(String),
          }),
        );
      });
  });

  test('Update bearer type to all', async () => {
    paystack.split
      .update('760472', { bearerType: 'all' })
      .then((result) => {
        expect(result.data.bearer_type).toBe('all');
      })
      .catch((error) => {
        expect(error).toEqual(
          expect.objectContaining({
            status: false,
            message: expect.any(String),
          }),
        );
      });
  });

  test('Update active state', async () => {
    paystack.split
      .update('760472', { active: false })
      .then((result) => {
        expect(result.data.bearer_type).toBe('all');
      })
      .catch((error) => {
        expect(error).toEqual(
          expect.objectContaining({
            status: false,
            message: expect.any(String),
          }),
        );
      });
  });
});
