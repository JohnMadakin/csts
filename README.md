# CSTS

## Description

**CSTS** is a small Customer Support Ticketing System.

## Table of Contents

- [Documentation](#documentation)
- [Setup](#setup)
  - [Database and ODM](#database-and-odm)
- [Testing](#testing)
- [Contribute](#contribute)
- [Deployment](#deployment)
- [License](#license)

## Documentation

https://documenter.getpostman.com/view/4919621/SzKPWhCo?version=latest

## Setup

### Dependencies

- [NodeJS](https://github.com/nodejs/node) - A JavaScript runtime environment
- [TypeScript](https://www.typescriptlang.org/docs/home.html) - A JavaScript superset that brings optional static type-checking along with the latest ECMAScript features
- [Express](https://github.com/expressjs/express) - A web application framework for NodeJS
- [Mongodb](https://github.com/mongodb/mongo) - A Document-based database management system
- [Mongoose](https://github.com/Automattic/mongoose) - A promise-based ODM for NodeJS

### Getting Started

Follow these steps to set up the project in development mode

- Install [Nodejs](https://nodejs.org/en/download/)
- Install and setup [Mongodb](https://www.mongodb.com/)
- Clone the repository by running the command

  ```[bash]
  git clone https://github.com/JohnMadakin/csts.git
  ```

- Run `cd we-twit` to enter the application's directory
- Install the application's dependencies by running the command
  ```
  npm install
  ```
- Create a `.env` file in the root of your directory using the `.env.example` file in the repository
- Setup the database(**_see [database setup](https://www.mongodb.com)_**)
- Start the application by running
  ```
  npm run start:dev
  ```
  The application should now be running at `http://127.0.0.1:6000`

#### Database and ODM

- Create a database with `MongoDB Shell` and name it `csts`
- Set the following environment variables in `.env`:

  - `DATABASE_NAME` - this is the database name
  - `DEV_DB_URI` - this is the test database connection uri
  - `PROD_DB_URI` - this is the prod database connection uri

- once you start the app, a database connection is setup and database created

### More about environmental variables

After setting up your `.env` from the template provided in the `.env.sample` file,
to use these variables anywhere in the app;

- import the `dotenv` package

```[js]
import dotenv from 'dotenv'
```

- Make it available for use as early as possible in that file

```[js]
dotenv.config()
```

- Access any variable in the `.env`

```[js]
process.env.MY_ENV_VARIABLE
```

## Testing

[Jest](https://jestjs.io) is used as the testing framework for both the unit tests.


```
  npm run test 
```

## Deployment




