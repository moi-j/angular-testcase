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

Authorization
=============

The OAuth token generated on the client side must be sent with each request to the server in the Authorization header.

```Authorization: Token thisIsMyOAuthToken```

API endpoints
=============

The API provides GET, PUT, POST, PATCH, DELETE and OPTIONS to manage all user related needs

http://angular-test.rh-dev.eu:8000/api/users to list and http://angular-test.rh-dev.eu:8000/api/users/{id} to manage single users