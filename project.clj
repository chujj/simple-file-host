(defproject simple-file-host "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [me.raynes/fs "1.4.6"] ; https://github.com/Raynes/fs
                 [ring/ring-core "1.4.0"]  ; ring
                 [ring/ring-jetty-adapter "1.4.0"]
                 ]
  :plugins [[lein-ring "0.9.7"]]
  :ring {:handler simple-file-host.core/handler}
  :main ^:skip-aot simple-file-host.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}})
