(ns bank-balance-api.accounts-service
  (:require [bank-balance-api.db :as db]
            [bank-balance-api.utils :refer :all]))

(defn now [] (new java.util.Date))

; DEFAULT MESSAGES
(def user-not-found "User was not found - Execute a deposit to automatically register")
(def invalid-deposit "Sorry - Please provide a valid deposit to open an account")

; POSSIBLE OPERATIONS
(defn deposit [value] {:operation "DEPOSIT" :value value :date (now)})
(defn withdraw [value] {:operation "WITHDRAW" :value value :date (now)})
(defn declined [value] {:operation "DECLINED" :value value :date (now)})

; ONLY POINT TO EXECUTE CHANGE ON THE ACCOUNTS DB
(defn mutate [idKey newRecord] (swap! db/accounts assoc idKey newRecord))

; CONSULT BALANCE
(defn get-balance [id]
  (let [idKey (keyword id)]
    (if (contains? @db/accounts idKey) {:balance (get-in @db/accounts [idKey :balance])} {:message user-not-found})))

(defn get-history [id]
  (let [idKey (keyword id)]
    (if (contains? @db/accounts idKey) {:history (get-in @db/accounts [idKey :history])} {:message user-not-found})))

; INIT A NEW ACCOUNT WITH AN VALID DEPOSIT
(defn create-new-account [id value]
  (let [decimalValue (to-decimal (double value))]
    {:id id :balance decimalValue :history [(deposit decimalValue)]}))

(defn deposit-or-withdraw [account value]
  (let [finalBalance (+ value (Double. (account :balance)))
        decimalValue (to-decimal value)
        operation (if (<= 0 value)
                    (deposit decimalValue)
                    (withdraw decimalValue))]
    (if (<= 0 finalBalance)
      (assoc account :balance (to-decimal finalBalance) :history (conj (account :history) operation))
      (assoc account :history (conj (account :history) (declined value))))))

(defn process-transaction [id value]
  (let [idKey (keyword (str id))
        account (get @db/accounts idKey)]
    (if (nil? account)
      (if (<= 0 value)
        {:account (get (mutate idKey (create-new-account id value)) idKey)}
        {:message invalid-deposit})
      {:account (get (mutate idKey (deposit-or-withdraw account value)) idKey)})))

