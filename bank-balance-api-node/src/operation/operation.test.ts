import { MESSAGES } from '../server-messages';
import { CreateUser } from './../user/user';
import { Operation, OperationType, processOperation } from './operation';

const user = () => CreateUser('1');

test('Consult operation', () => {
  const operation: Operation = {
    type: OperationType.CONSULT,
    value: NaN
  };
  const operationResult = processOperation(user(), operation);
  expect(operationResult.user.balance).toBe(0);
});

test('Deposit operation', () => {
  const operation: Operation = {
    type: OperationType.DEPOSIT,
    value: 100
  };
  const operationResult = processOperation(user(), operation);
  expect(operationResult.user.balance).toBe(100);
});

test('Withdraw operation', () => {
  const deposit: Operation = {
    type: OperationType.DEPOSIT,
    value: 100
  };
  const withdraw: Operation = {
    type: OperationType.WITHDRAW,
    value: -100
  };
  const userWithBalance = processOperation(user(), deposit).user;
  const operationResult = processOperation(userWithBalance, withdraw);
  expect(operationResult.user.balance).toBe(0);
});

test('Withdraw cancelled operation', () => {
  const withdraw: Operation = {
    type: OperationType.WITHDRAW,
    value: -100
  };
  const operationResult = processOperation(user(), withdraw);
  expect(operationResult.user.balance).toBe(0);
  expect(operationResult.user.history.length).toBe(2);
  expect(operationResult.response.message).toBe(MESSAGES.NEGATIVE_BALANCE);
});
