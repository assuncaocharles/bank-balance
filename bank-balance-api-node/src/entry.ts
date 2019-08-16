// tslint:disable:no-expression-statement
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import {isNil} from 'lodash';

import {db, transactionOperator} from './data';
import {OperationType, processOperation} from './operation';
import {Routes} from './routes';
import {HTTP_RESPONSE_CODES, MESSAGES} from './server-messages';
import {CreateUser, User} from './user/user';

dotenv.config();

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.get(Routes.balance, ({ params }, res) => {
  const { userID } = params;

  transactionOperator.commit(() => {
    db.get(userID, (err: { readonly [key: string]: any }, savedUser: User) => {
      const consultUserSuccess = () => {
        const { user, response } = processOperation(savedUser, {
          type: OperationType.CONSULT,
          value: NaN
        });
        res
          .status(response.code)
          .send({
            balance: user.balance,
            message: response.message
          })
          .end();
      };

      const consultUserErr = () =>
        res
          .status(HTTP_RESPONSE_CODES.NOT_FOUND)
          .send({
            message: MESSAGES.USER_NOT_FOUND
          })
          .end();

      return err ? consultUserErr() : consultUserSuccess();
    });
  });
});

server.post(Routes.transaction, ({ body }, res) => {
  const { userID, value } = body;

  transactionOperator.commit(() => {
    db.get(userID, (_readError: { readonly [key: string]: any }, savedUser: User) => {
      const currentUser: User = isNil(savedUser) ? CreateUser(userID) : savedUser;

      const type = value > 0 ? OperationType.DEPOSIT : OperationType.WITHDRAW;

      const { user, response } = processOperation(currentUser, {
        type,
        value
      });

      transactionOperator.commit(() => {
        db.put(userID, user, (err: { readonly [key: string]: any }, _userUpdated: User) => {
          const updateUserSuccess = () =>
            res
              .status(response.code)
              .send({
                message: response.message,
                result: user
              })
              .end();

          const internalError = () =>
            res
              .status(HTTP_RESPONSE_CODES.INTERNAL_ERROR)
              .send({
                message: MESSAGES.INTERNAL_ERROR
              })
              .end();

          return err ? internalError() : updateUserSuccess();
        });
      });
    });
  });
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server running on port ${PORT}`);
});

export default server;
