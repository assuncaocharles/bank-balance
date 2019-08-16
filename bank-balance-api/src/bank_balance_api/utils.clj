(ns bank-balance-api.utils)

(defn to-decimal [num] (Double. (format "%.2f" (double num))))