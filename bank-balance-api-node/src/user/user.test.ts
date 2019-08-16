import { CreateUser } from './user';

const id = '1';
const user = CreateUser(id);

test('Create user', () => {
  expect(user).toBeDefined();
  expect(user.balance).toBe(0);
  expect(user.userID).toBe(id);
});
