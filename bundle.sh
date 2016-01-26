#!/bin/bash
react-native bundle --entry-file $1 --bundle-output $2 --root --platform $3
cp -fp $2 ./assets/index.bundle
echo 'input 192.168.XXX.XXX:8000, show you the View on your phone'
(cd assets ; python -m SimpleHTTPServer)
