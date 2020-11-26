#!/bin/bash
cd development && git checkout uat && git pull origin uat

cd optimalrating && npm install && npm run build && cd ..

cd panel.optimalrating && npm install && npm run build && cd ..

cd server.optimalrating && composer install && php artisan migrate && cd ..

exit