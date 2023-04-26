# Deployment of the User Management Microservice

The Auroral User Management Microservice is deployed to AWS using Serverless framework. It will be hosted on AWS as a CloudFormation stack.

## Requirements

- Node v16
  - Make sure you are using Node v16 when you are deploying
- [AWS CLI is installed](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- Access key for a deployment agent user
  - Create one [here](https://us-east-1.console.aws.amazon.com/iam/home#/users/sls-deployment-agent?section=security_credentials)
- Configure AWS using the access key
  - `aws configure`

Make sure that all the required packages have been installed.

```shell
> npm install
```

In `src/lambda.ts` you need to uncomment the section with `nestApp.enableCors...`.

In `src/adapters/inbound/auth.controller.ts` the cookie response needs to be replace with the commented one including the domain setting.

In `serverless.yaml` you need to replace all `configs.js` with `configs.aws.dev.js`.

### Environment

Bitbucket has pipelines to deploy the backend with a single click. This pipeline builds and deploys the serverless main function (the whole nestjs application) and retrieves the .env variables from the proper environment.

The pipeline doesn't deploy the whole stack, meaning one needs to manually deploy the initial stack. For this, refer to the instructions below.

## Deployment using Serverless Framework

To deploy a new CloudFormation stack, run

```shell
> npx serverless deploy
```

You should do this only once and from there on only update the Lambda function, unless you absolutely have to create the whole stack again. Deploying the CloudFormation recreates the API Gateway, which means that the domain for the gateway has to be configured again. See [Cloud Configuration](#cloud-configuration) for more information on that.

To update only the Nestjs function (this is the same as the bitbucket pipeline does), run

```
> npx serverless deploy function -f main
```

If the deployment fails or for some reason you want to redeploy, remove the previous deployment first:

```shell
> npx serverless remove
```

> You may need to remove all permission policies from the `users-dev-eu-central-1-lambdaRole` before removing the CloudFormation. There seems to be some issue which prevents Serverless framework from removing it automatically.

## Cloud Configuration

The API Gateway should be configured to point to `api.pyoraily.fi` and the same domain name should respectively be configured to point to the correct CloudFront URL in [Route 53](https://us-east-1.console.aws.amazon.com/route53/v2/hostedzones#ListRecordSets/Z08449381WPWSEJIZAQJX). This needs to be done every time a new CloudFormation is deployed. If unsure, please ask the project manager for more information.

## Resources

- More on the Serverless `deploy` function [here](https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy-function).
