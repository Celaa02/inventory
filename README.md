<!--
title: 'Serverless Framework Node Express API on AWS'
description: 'This template demonstrates how to develop and deploy a simple Node Express API running on AWS Lambda using the Serverless Framework.'
layout: Doc
framework: v4
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, Inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework Node Express API on AWS

This template demonstrates how to develop and deploy a simple Node Express API service running on AWS Lambda using the Serverless Framework.

This template configures a single function, `api`, which is responsible for handling all incoming requests using the `httpApi` event. To learn more about `httpApi` event configuration options, please refer to [httpApi event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/). As the event is configured in a way to accept all incoming requests, the Express.js framework is responsible for routing and handling requests internally. This implementation uses the `serverless-http` package to transform the incoming event request payloads to payloads compatible with Express.js. To learn more about `serverless-http`, please refer to the [serverless-http README](https://github.com/dougmoscrop/serverless-http).

## Usage

### Deployment

Install dependencies with:

```
npm install
```

and then deploy with:

```
serverless deploy
```

After running deploy, you should see output similar to:

```
Deploying "aws-node-express-api" to stage "dev" (us-east-1)

✔ Service deployed to stack aws-node-express-api-dev (96s)

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: aws-node-express-api-dev-api (2.3 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [`httpApi` event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/).

### Invocation

After successful deployment, you can call the created application via HTTP:

```
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Which should result in the following response:

```json
{ "message": "Inventory API" }
```

### Local development

The easiest way to develop and test your function is to use the `dev` command:

```
serverless dev
```

This will start a local emulator of AWS Lambda and tunnel your requests to and from AWS Lambda, allowing you to interact with your function as if it were running in the cloud.

Now you can invoke the function as before, but this time the function will be executed locally. Now you can develop your function locally, invoke it, and see the results immediately without having to re-deploy.

When you are done developing, don't forget to run `serverless deploy` to deploy the function to the cloud.


# Microservice with Serverless Framework and AWS Lambda
This repository contains a microservice created using the Serverless framework and AWS Lambda, 
configured with Node.js and Express. The project structure is designed to handle inventory
 management and user authentication.

## Project Structure
The project is organized as follows:

_src/_: Contains all the source files for the microservice.
_models/_: Definition of data models.
_middleware/_: Contains middleware for validations and other functionalities.
_routes/_: Definition of routes for service operations.
_sql/_: Contains SQL queries used to interact with the database.

# Features
The microservice offers the following functionalities:

_Inventory Management_: Queries and operations related to inventory.
_User Authentication_: Mechanisms for authenticating and authorizing users.

# Routes
The available routes for the microservice are detailed below:

## API Root:
GET https://odbygursl9.execute-api.us-east-2.amazonaws.com/dev/

## Database:
GET https://odbygursl9.execute-api.us-east-2.amazonaws.com/dev/db

## Inventory:
Get list of inventories:
GET https://odbygursl9.execute-api.us-east-2.amazonaws.com/dev/api/inventory

Get inventory by ID:
GET https://odbygursl9.execute-api.us-east-2.amazonaws.com/dev/api/inventory/{id}

Create new inventory:
POST https://odbygursl9.execute-api.us-east-2.amazonaws.com/dev/api/inventory

Update inventory by ID:
PUT https://odbygursl9.execute-api.us-east-2.amazonaws.com/dev/api/inventory/{id}

Delete inventory by ID:
DELETE https://odbygursl9.execute-api.us-east-2.amazonaws.com/dev/api/inventory/{id}

Outflow
POST https://odbygursl9.execute-api.us-east-2.amazonaws.com/dev/api/inventory/salida

Authentication:
## User registration:
POST https://odbygursl9.execute-api.us-east-2.amazonaws.com/dev/api/register
User login:
POST https://odbygursl9.execute-api.us-east-2.amazonaws.com/dev/api/login

# Configuration
## AWS Credentials: 
Make sure you have your AWS instance credentials configured. You can obtain them from the AWS console.

## API Deployment: 
The API is created and deployed using the Serverless framework. Ensure you have the Serverless CLI installed and configured.

# Installation and Deployment
Clone the repository:

bash
Copiar código
git clone <repository-URL>
cd <repository-name>

# Install the dependencies:
## bash
  npm install

## bash
  aws configure

## bash

serverless deploy

# Usage
_Routes_: Refer to the routes section for information on how to interact with the API.
_SQL Queries_: SQL queries are defined in src/sql/ and are used to interact with the database.

