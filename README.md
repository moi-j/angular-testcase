Requirements
============

* virtualbox or libvirt (to run the virtual machine)
* vagrant (to manage the virtual machine)
* git
* nfs-kernel-server (Linux only)

Vagrant plugins
===============

* vagrant-hostmanager
* vagrant-vbguest (if you're using virtualbox)
* vagrant-libvirt (if you're using libvirt)

Setup
=====

* Copy the repository content (please don't fork it so that there is no link to forked repositories someone might look up the solution at)
* Start the virtual machine ```vagrant up``` (you might be asked for your password to update the hosts file, then take a short coffee break while the machine gets built)
* Log in to the virtual machine ```vagrant ssh```
* Initialize the database ```./manage.py migrate```
* Create a Google OAuth client ID (https://developers.google.com/identity/sign-in/web/devconsole-project) and add http://angular-test.rh-dev.eu:8001 to "Authorized JavaScript origins"
* Save the client ID in the Django settings file (backend/settings.py) to the variable GOOGLE_CLIENT_ID and use the same one in the frontend app
* Start the development webserver ```./manage.py runserver 0.0.0.0:8000```
* Implement the frontend against the API
* Extend the readme on how to build and run the frontend, the frontend webserver should run on port 8001 (http://angular-test.rh-dev.eu:8001)

Alternative Setup
================= 

If you don't want/can to run the application in the virtual machine, just use the instance deployed on Heroku: `https://angular-testcase.herokuapp.com/api/users`
* Google OAuth client id to be used: `396519560792-flahmhsg3n40gk0nnil821q7ma7rkca8.apps.googleusercontent.com`
* Authorized JavaScript origins: `http://localhost:9000`
* Authorized redirect URIs: 
  * `http://localhost:9000`
  * `http://localhost:9000/oauth2callback`

Authorization
=============

The OAuth token generated on the client side must be sent with each request to the server in the Authorization header.

```Authorization: Token thisIsMyOAuthToken```

API endpoints
=============

The API provides GET, PUT, POST, PATCH, DELETE and OPTIONS to manage all user related needs

http://angular-test.rh-dev.eu:8000/api/users to list and http://angular-test.rh-dev.eu:8000/api/users/{id} to manage single users

Frontend
========

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development Frontend server
Under `/frontend` run `npm install` and It will install all required dependencies for the project.
Once installed run `npm serve` and server will be running in `http://localhost:9000`. You can also run `ng serve --port 9000` and will get the same result. 
The app will automatically reload if you change any of the source files.

## Connecting with the API
The default app is connecting to the heroku deployed server, that means it is using the OAuth client id referenced under [alternative setup](#alternative-setup).
You can change it in enviroment files under `/enviroments`