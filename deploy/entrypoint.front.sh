#!/bin/sh

yarn db:generate
# requires connection to db, so cannot be done at build time
yarn build
yarn export

cp /app/out /usr/share/nginx/html

nginx -g 'daemon off;'