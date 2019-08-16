(ns bank-balance-api.accounts-service-test
  (:require [clojure.test :refer :all]
            [bank-balance-api.accounts-service :refer :all]))
(def operation-deposit (deposit 10.0))
(def operation-withdraw (withdraw -10.0))
(def operation-declined (declined -10.0))
(def base-account {:id 9 :balance 0.0 :history []})

(deftest test-app
  (testing "it should create an account"
    (let [account (create-new-account 9 10)]
      (is (= (account :id) 9))
      (is (= (account :balance) 10.0))))
  (testing "it should deposit a value in some account"
    (let [account (deposit-or-withdraw base-account 10)]
      (is (= (account :balance) 10.0))
      (is (= (count (account :history)) 1))))
  (testing "it should withdraw a value in some account"
    (let [account (deposit-or-withdraw (merge base-account {:balance 10.0}) -10)]
      (is (= (account :balance) 0.0))))
  (testing "it should decline an not authorized operation"
    (let [account (deposit-or-withdraw (merge base-account) -10.0)]
      (is (= (account :balance) 0.0))
      (is (= ((nth (account :history) 0) :operation) "DECLINED")))))