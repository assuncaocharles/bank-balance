(ns bank-balance-api.handler-test
  (:require [clojure.test :refer :all]
            [cheshire.core :as cheshire]
            [bank-balance-api.accounts-service :as accounts]
            [ring.mock.request :as mock]
            [bank-balance-api.handler :refer :all]))

(defn parse-body [body]
  (cheshire/parse-string body true))

(defn gen-post-request [route params] (app (->
                                            (mock/request :post route)
                                            (mock/content-type "application/json")
                                            (mock/body  (cheshire/generate-string params)))))

(deftest test-app
  (testing "it should create new user"
    (let [response (gen-post-request "/transaction" {:id 1 :value 10.0})
          body (parse-body (:body response))]
      (is (= (:status response) 200))
      (is (= (:balance (:account body)) 10.0))))

  (testing "it shouldn't allow create new user with negative value"
    (let [response (gen-post-request "/transaction" {:id 2 :value -10.0})
          body (parse-body (:body response))]
      (is (= (:status response) 200))
      (is (= (:message body) accounts/invalid-deposit))))

  (testing "it should get the balance from an user"
    (let [response (app (mock/request :get "/balance/1"))
          body (parse-body (:body response))]
      (is (= (:status response) 200))
      (is (= (:balance body) 10.0))))

  (testing "it should withdraw money"
    (let [response (gen-post-request "/transaction" {:id 1 :value -10.0})
          body (parse-body (:body response))]
      (is (= (:status response) 200))
      (is (= (:balance (:account body)) 0.0))))

  (testing "it should execute a deposit"
    (let [response (gen-post-request "/transaction" {:id 1 :value 10})
          body (parse-body (:body response))]
      (is (= (:status response) 200))
      (is (= (:balance (:account body)) 10.0))))

  (testing "it should return not found user message"
    (let [response (app (mock/request :get "/balance/123"))
          body (parse-body (:body response))]
      (is (= (:status response) 200))
      (is (= (:message body) accounts/user-not-found))))

  (testing "not-found route"
    (let [response (app (mock/request :get "/invalid"))]
      (is (= (:status response) 404)))))
