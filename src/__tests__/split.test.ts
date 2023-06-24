import node_paystack from '..';

describe('Split tests', () => {
  const paystack = node_paystack(process.env.KEY as string);
  // test('Update name of split', async () => {
  //   paystack.split
  //     .update('760472', { name: 'Updated name' })
  //     .then((result) => {
  //       expect(result.data.name).toBe('Updated name');
  //     })
  //     .catch((error) => {
  //       expect(error).toEqual(
  //         expect.objectContaining({
  //           status: false,
  //           message: expect.any(String),
  //           httpStatus: expect.any(Object),
  //         }),
  //       );
  //     });
  // });

  test('Test id as number instead of string', async () => {
    const result = await paystack.split.update(760472, { name: 'Numbered ID' })
    expect(result.data.name).toBe('Numbered ID');
    if(result.status === true){
      expect(result.data.name).toEqual('Numbered ID');
    } else {
      expect(result.status).toEqual(false);
    }
  });

  test('Update bearer type to all', async () => {
    const result = await paystack.split.update('760472', { bearer_type: 'all' })
    if(result.status === true){
      expect(result.data.bearer_type).toBe('all');
    } else {
      expect(result.status).toBe(false);
    }
  });

  // test('Update active state', async () => {
  //   paystack.split
  //     .update('760472', { active: false })
  //     .then((result) => {
  //       expect(result.data.active).toBe(false);
  //     })
  //     .catch((error) => {
  //       expect(error).toEqual(
  //         expect.objectContaining({
  //           status: false,
  //           message: expect.any(String),
  //           httpStatus: expect.any(Object),
  //         }),
  //       );
  //     });
  // });
});
