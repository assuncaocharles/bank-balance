import { Operation } from '../operation';

export function CreateUser(userID: string): User {
  return {
    balance: 0.0,
    history: [],
    userID
  };
}

export interface User {
  readonly userID: string;
  readonly history: ReadonlyArray<Operation>;
  readonly balance: number;
}
