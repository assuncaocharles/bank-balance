# bank-balance-api

This project is an clojure API to allow basic operations simulating user accounts:

* Check balance `GET /balance/{USER_ID}`
* Deposit or Withdraw `POST /transaction`
* Check user history `POST /history/{USER_ID}`

An Postman Collection with requests examples can be found on the folder `Postman collection`

## Run

To initiate the server run `lein ring server-headless`. The project will start on the port 3000 ( http://localhost:3000 ). A interface to work on the api was developed in react and its production version can be accessed [cliking here](http://localhost:3000/index.html) or just pasting http://localhost:3000/index.html in your browser.

## Tests

To execute the test suits just run `lein test`