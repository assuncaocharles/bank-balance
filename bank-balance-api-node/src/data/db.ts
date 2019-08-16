import level from 'level';
import transaction from 'level-transactions';

export const db = level('accounts', { valueEncoding: 'json' });

export const transactionOperator = transaction(db);
