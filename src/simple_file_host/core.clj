(ns simple-file-host.core
  (:gen-class))

(require '(clojure.java [io :as io]))
(require '(me.raynes [fs :as fs]))
(require '(ring.util [response :as resp] [request :as require]))
(require '(ring.middleware [content-type :as content-type]))
(require '(ring.middleware multipart-params))


(defn relative-from-current-path
  [abspath]
  (clojure.string/replace-first abspath (str fs/*cwd*) ""))

(defn file-2-link
  "format file to href link"
  ([fullpath2file]
   (file-2-link (relative-from-current-path fullpath2file) (fs/base-name fullpath2file)))
  ([path filename]
   (format "<a href=\"%s\">%s</a>" path filename)))

(defn format-dir-content-2-links
  "return dir's children as html-href in Map"
  [& path2file]
  (let [abspath (apply io/file path2file)]
    (if (fs/file? abspath)
      ()
      (let [dir-content-list (fs/list-dir abspath)]
        (map file-2-link dir-content-list)))))

(defn build-dir-html-content
  "build html content"
  [abspath]
  (format "<html>
              <title>%s</title>
                 <body>\n
Choose file to upload<br>
<form ENCTYPE=\"multipart/form-data\" method=\"post\">
       <input name=\"file\" type=\"file\">
        <input type=\"submit\" value=\"upload\"/>
</form>
<br><br>
                   Content of %s:<br>\n
                   %s\n
                 </body>
           </html>"
          (str "SimpleFileHost " (relative-from-current-path abspath))
          (relative-from-current-path abspath)
          (reduce #(str %1 %2 "<br>") "" (format-dir-content-2-links abspath))))

(defn path-not-found
  [path]
  (format "<html>
<title>SimpleFileHost %s Not Found</title>
<body>
%s Not Found
</body>
</html>" path path))

(defn uri-2-relative-path
  "remove first '/' in uri-path"
  [uri-query-path]
  (if (fs/absolute? uri-query-path)
    (subs uri-query-path 1)
    uri-query-path))

(defn get-path-as-html
  "get-content of given path. Current Working Dir as root('/') "
  [query-path]
  (let [local-path (str fs/*cwd* query-path)]
    (if (fs/exists? local-path)         ;exist
      (if (fs/directory? local-path)
        (build-dir-html-content local-path) ; diretory
        (resp/file-response (uri-2-relative-path query-path)) ;file
        )
      (path-not-found query-path))))

(defn dump-request
  [request]
  (resp/response (reduce str request)))

(defn get-uri-content
  [request]
  (let [uri (get request :uri "/")
        resp (get-path-as-html uri)]
    (if (resp/response? resp)
      resp
      (resp/response resp))))



(defn post-file-under-uri-as-directory
  [request]
  (let [files (get-in request [:multipart-params "file"])
        file-name (get files :filename)
        file-size (get files :size)
        tmpfile (get files :tempfile)
        newfile (io/file fs/*cwd* (uri-2-relative-path (get request :uri "/")) file-name)
        dump-response  (str request)]
    (if (and (empty? file-name) (= 0 file-size))
      (resp/response "Select a file first")
                                        ;copy from tmpfile to destfile
      (let [copy-retval (fs/copy tmpfile newfile)]
        (if copy-retval
          (resp/response (format "Upload %s Success!" file-name))
          (resp/response "Something Wrong!"))))))

(defn handle-request
  [request]
  (if nil
    (dump-request)
    (let [post? (= :post (get request :request-method :get))]
      (if post?
        ((ring.middleware.multipart-params/wrap-multipart-params post-file-under-uri-as-directory) request)
        (get-uri-content request)))))

(def handler
  handle-request)

(require '(ring.adapter jetty))

(defn -main [& [port]]
  (ring.adapter.jetty/run-jetty handler
        {:port (if port (Integer/parseInt port) 
                   8000)}))
