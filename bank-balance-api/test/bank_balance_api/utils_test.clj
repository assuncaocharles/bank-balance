(ns bank-balance-api.utils-test
  (:require [clojure.test :refer :all]
            [bank-balance-api.utils :refer :all]))

(deftest test-app
  (testing "it format a int to decimal with 2 places"
    (is (= (to-decimal 10) 10.0)))
  (testing "it format to decimal with 2 places"
    (is (= (to-decimal 10.543) 10.54))))
