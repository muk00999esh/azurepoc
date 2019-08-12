#!/usr/bin/env bash 
set -xe 
: "${RANDOM_STR?Need an KEYWORD string}" 
sed -i.bak "s/RANDOM_STR/$RANDOM_STR/g" /www/src/environments/environment.ts 
npm start 
exec "$@" 
