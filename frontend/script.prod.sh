#!/bin/sh
npm install --legacy-peer-deps

npm run build

# setuping nginx
mkdir -p "${ssl_path}"
openssl req -x509 -nodes -out "${ssl_crt}" -keyout "${ssl_key}" -subj "${ssl_data}"
nginx -g "daemon off;"