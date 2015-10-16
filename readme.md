# order-notification-service

[![Build Status](https://travis-ci.org/devos-2015/order-notification-service.svg)](https://travis-ci.org/devos-2015/order-notification-service)
[![Dependencies](https://david-dm.org/devos-2015/order-notification-service.svg)](https://david-dm.org/badges/shields)

This is an example of a node.js microservice

## Run it on your local node.js installation

* Run `npm install` inside the root folder to restore all packages
* Run the service with `node index.js` (or `npm start`)
* Browse to [http://localhost:3000/](http://localhost:3000/) to see the output

## Build the Docker container

~~~ sh
docker build -t order-notification-service .
~~~

## Run the Docker container locally

~~~ sh
docker run -it -p 3000:3000 order-notification-service
~~~

## Push the Docker container into the private registry

~~~ sh
docker tag order-notification-service 46.101.193.82:5000/order-notification-service:1.0.0
docker push 46.101.193.82:5000/order-notification-service:1.0.0
~~~
