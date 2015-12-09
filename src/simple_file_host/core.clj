(ns simple-file-host.core
  (:gen-class))

(require '(clojure.java [io :as io]))
(require '(me.raynes [fs :as fs]))

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

(defn file-path-founded
  [path]
  (format "<html>
<title>SimpleFileHost %s Founded</title>
<body>
%s Founded
</body>
</html>" path path))

(defn get-path-as-html
  "get-content of given path. Current Working Dir as root('/') "
  [query-path]
  (let [local-path (str fs/*cwd* query-path)]
    (if (fs/exists? local-path)
      (   ;exist
       if (fs/directory? local-path)
        (build-dir-html-content local-path) ; diretory
        (file-path-founded query-path)  ; file
       )
      ; not exist
      (path-not-found query-path))))
