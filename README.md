# OPTIMAL RATING PROJECT

Optimal Rating project is build in different Frontend and Backend techstacks

** Front End **
This projects consists of two frontend technologies namely Vue js and React js. Admin panel namely panel.optimalrating is developed over Vue js technology and Client Site namely optimalrating is developed over React js technology

```
git clone git@bitbucket.org:muratdinler/optimalrating.git
cd optimalrating/optimalrating
cd optimalrating/panel.optimalrating
npm install
npm start
```

** Back End **
The backedn part of this project is developed over PHP technology using Laravel framework.

```
git cd optimalrating/server.optimalrating
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```