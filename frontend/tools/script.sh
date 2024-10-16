#!/bin/bash


cp -rfu /cache/node_modules/. /app/node_modules/
npm --prefix /app/ run dev