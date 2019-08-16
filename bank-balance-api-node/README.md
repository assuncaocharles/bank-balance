# Bank Balance Challenge

This project is an node API to allow 3 basic operations simulating user accounts:

- Check balance `GET /api/balance/{USER_ID}`
- Deposit or Withdraw `POST /api/transaction`

An Postman Collection with requests examples can be found on the folder `./Postman collection`

This project uses (prettier)[https://prettier.io/], (tslint)[https://palantir.github.io/tslint/], (lint-staged)[https://github.com/okonet/lint-staged] and (husky)[https://github.com/typicode/husky] to keep the code clean and enforce the code standard.

## Install

To install all dependencies run `npm install` on the project root

## Run

To initiate the server run `npm start`. You can change the PORT ( It's configured to use 8080 ) on the file `./.env` if needed

## Tests

To execute the test suits just run `npm test`

## STACK

This project is a written using the following main tech:

- [TypeScript](https://www.typescriptlang.org/)

- [tslint-functional](https://github.com/adieuadieu/tslint-functional-preset) To force a more functional code

- [Level](https://www.npmjs.com/package/level) - It's a LevelDB (an simple key-value storage library) wrapper for Node.js

- [level-transaction](https://github.com/cshum/level-transactions) - It allow transaction operations on top of Level DB (Key based operations perform exclusive lock on keys applied. Under the hood, it maintains an internal queue such that operations within transaction executed sequentially.)
