#!/bin/bash
#script to deploy in uat
cd /home/optimalr/development && git checkout uat && git pull origin uat && cd

cd /home/optimalr/development/optimalrating && npm install && npm run build && cd

cd /home/optimalr/development/panel.optimalrating && npm install && npm run build && cd

cd /home/optimalr/development/server.optimalrating && composer install && php artisan migrate && cd

exit