(ns bank-balance-api.handler
  (:require [bank-balance-api.routes :refer :all]
            [compojure.core :refer :all]
            [compojure.handler :as handler]
            [ring.middleware.json :as middleware]
            [ring.middleware.cors :refer [wrap-cors]]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]))

(def app
  (-> (handler/site app-routes)
      (wrap-cors :access-control-allow-origin [#".*"] :access-control-allow-methods [:get :post])
      (middleware/wrap-json-body {:keywords? true})
      middleware/wrap-json-response))
