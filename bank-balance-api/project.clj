(defproject bank-balance-api "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.10.0"]
                 [compojure "1.6.1"]
                 [ring/ring-json "0.4.0"]
                 [ring/ring-defaults "0.3.2"]
                 [cheshire "5.8.1"]
                 [ring-cors "0.1.13"]
                 [metosin/compojure-api "2.0.0-alpha26"]
                 [clojurewerkz/money "1.10.0"]]
  :main ^:skip-aot bank-balance-api.handler
  :plugins [[lein-ring "0.12.5"]]
  :ring {:handler bank-balance-api.handler/app}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring/ring-mock "0.3.2"]]}})
