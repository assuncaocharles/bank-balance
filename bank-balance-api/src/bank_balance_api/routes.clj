(ns bank-balance-api.routes
  (:require [bank-balance-api.accounts-service :as account]
            [compojure.core :refer :all]
            [ring.util.http-response :refer [ok]]
            [ring.util.http-status :as status]
            [compojure.route :as route]))



(defroutes app-routes
  (GET "/balance/:id" [id]  (ok (account/get-balance id)))
  (GET "/history/:id" [id]  (ok (account/get-history id)))
  (POST "/transaction" {body :body}
    (let [id (body :id) value (body :value)]
      (ok (account/process-transaction id value))))
  (route/resources "/")
  (route/not-found (status/status 404)))