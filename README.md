# Base Node.js API

Minimalistic implementation of a Node.js API with basic features and auth / Todo demo endpoints.

## Table of contents

- [Base Node.js API](#base-nodejs-api)
  - [Table of contents](#table-of-contents)
  - [Project Setup 🔧](#project-setup-)
    - [Database](#database)
    - [API](#api)
  - [Running the project 🚀](#running-the-project-)
    - [Watch / Debug (recommended for development)](#watch--debug-recommended-for-development)
    - [Using Docker (recommended for deployment / orchestration)](#using-docker-recommended-for-deployment--orchestration)
    - [Build and Run (without containerization)](#build-and-run-without-containerization)
  - [Features ✨](#features-)
    - [Express](#express)
    - [Logging](#logging)
    - [Authentication](#authentication)
    - [Todos](#todos)
    - [Security](#security)
    - [ESLint / Prettier / Husky](#eslint--prettier--husky)



## Project Setup 🔧

There are a few steps you must go through before running this project.

### Database

The API uses MongoDB to store data. The easiest way to get started is with Docker. To launch a MongoDB container, run the following command :

```sh
docker run --name mongo -p27017:27017 -d mongo
```

The previous command creates a mongo container (in detached mode) and exposes port **27017**.

### API

First, install all the dependencies :

```sh
npm i
```

Then, create a .env file based on the .env.example file (in the same directory). Here's a description of all the values you must specify :

-   **APP_PORT**: The port on which the API will be reachable.
-   **MONGO_HOST**: Endpoint through which your MongoDB is reachable (_localhost_ if your mongo instance runs on the same machine).
-   **MONGO_PORT**: Port through which your MongoDB is reachable (likely _27017_).
-   **MONGO_DB_NAME**: Database name.
-   **JWT_ALGORITHM**: Algorithm used for signing the JWT.
-   **JWT_ISSUER**: JWT issuer.
-   **JWT_AUDIENCE**: JWT audience.
-   **BCRYPT_SALT_ROUNDS**: Number of rounds for generating the salt used for encrypting passwords.

Finally, build both public and private keys under a _certs_ folder at the root of the project.

## Running the project 🚀

This API can be run multiple ways.

### Watch / Debug (recommended for development)

You can use either `npm run watch` or `npm run debug` to start the project in watch mode. The second command will allow you to debug the project (using VSCode debug tools for example).

### Using Docker (recommended for deployment / orchestration)

This project features a **Dockerfile** configuration. You can build an image using :
```
docker build -t [image-tag] .
```

You can then create a container using :
```
docker run -d --name [container-name] -p[port]:[port] [image-tag]
```

If your MongoDB instance is also running on a container, you must create a network on which both images will live so that they can communicate. To create a network, run :
```
docker network create [network-name]
```

You will have to add the `--network [network-name]` flag to both `docker run` commands.

### Build and Run (without containerization)

Running the following command will build the project and output the result to a _dist_ folder located at the root of the project :
```sh
npm run build
```

You can then run the project using :
```
npm run start
```

## Features ✨

Here's an overview of the features.

### Express

The API runs using Express.js.

### Logging

Logging is featured in this API using Winston. By default, two files are created :
- logs/error.log : Aggregates all errors thrown during runtime.
- logs/combined.log : Aggregates all logs that are at least _info_.

When running in a development environment, all logs are also appended to the console output.

### MongoDB

This API connects to a MongoDB database using mongoose and provides a template Todo model.

### Authentication

Authentication is managed using [Passport.js](https://www.passportjs.org/) and the [passport-jwt](https://www.passportjs.org/packages/passport-jwt/) strategy.

Authentication capabilities include :
- Log in
- Sign up
- Refresh JWT token
- Delete account
- Restricting routes to logged in requests

### Todos

This API provides endpoints for CRUD operations on Todo objects. Todos belong to users and trying to access other's throws an unauthorized response.

### Security

This API is protected my [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize) and [helmet](https://www.npmjs.com/package/helmet) middlewares to respectively :
- sanitize requests and avoid nosql injections;
- add /check security related HTTP headers (using **helmet**'s base configuration);

### ESLint / Prettier / Husky

Base configurations for eslint and prettier are provided. Husky has also been installed to check for linting errors before committing and formatting code on commit.