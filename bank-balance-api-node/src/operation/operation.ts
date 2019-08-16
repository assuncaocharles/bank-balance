import { cloneDeep } from 'lodash';
import { HTTP_RESPONSE_CODES, MESSAGES } from '../server-messages';
import { User } from './../user/user';

export enum OperationType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  CONSULT = 'CONSULT',
  CANCEL = 'CANCEL'
}

export interface Operation {
  readonly type: OperationType;
  readonly value: number;
  readonly operation?: Operation;
}

export interface OperationResult {
  readonly user: User;
  readonly response: {
    readonly code: HTTP_RESPONSE_CODES;
    readonly message: MESSAGES;
  };
}

export function processOperation(user: User, operation: Operation): OperationResult {
  const userClone = cloneDeep(user);
  const finalUser = { ...userClone, history: [...userClone.history, operation] };

  switch (operation.type) {
    case OperationType.WITHDRAW:
    case OperationType.DEPOSIT:
      return withdrawOrDeposit(finalUser, operation);
    case OperationType.CONSULT:
      return {
        response: { code: HTTP_RESPONSE_CODES.SUCCESS, message: MESSAGES.SUCCESS_OPERATION },
        user: finalUser
      };
    default:
      return {
        response: { code: HTTP_RESPONSE_CODES.FORBIDDEN, message: MESSAGES.NOT_ALLOWED },
        user: finalUser
      };
  }
}

function withdrawOrDeposit(user: User, operation: Operation): OperationResult {
  const newBalance = user.balance + operation.value;
  const allowedOperation = newBalance < 0;
  const finalUser = allowedOperation
    ? { ...user, history: [...user.history, { operation, type: OperationType.CANCEL, value: NaN }] }
    : { ...user, balance: newBalance };

  return allowedOperation
    ? { user: finalUser, response: { code: HTTP_RESPONSE_CODES.FORBIDDEN, message: MESSAGES.NEGATIVE_BALANCE } }
    : {
        response: { code: HTTP_RESPONSE_CODES.SUCCESS, message: MESSAGES.SUCCESS_OPERATION },
        user: finalUser
      };
}
