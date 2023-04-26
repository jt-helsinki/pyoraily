# Deployment of the Auroral Shell

The Auroral Shell is deployed manually on AWS CloudFront and S3 bucket.

## Requirements

- Node v16
  - Make sure you are using Node v16 when you are deploying

Make sure that all the required packages have been installed.

```shell
> npm install
```

### Environment

Create a file named `.env.production.local` for production specific environment variables. These should be the following:

```
LOGIN_REMOTE_DOMAIN=https://d24l8rk6g8hdee.cloudfront.net
REACT_APP_LOGIN_REMOTE_DOMAIN=https://d24l8rk6g8hdee.cloudfront.net
REACT_APP_SAMPO_REMOTE_DOMAIN=https://some-s3-bucket/remoteEntry.js
REACT_APP_LIGHTNING_REMOTE_DOMAIN=https://d9tfmajm1dmb2.cloudfront.net/remoteEntry.js
```

## Deployment using Serverless Framework

First build the shell:

```shell
> npm run build
```

Open the `auroral-main` S3 bucket and remove all old files. Then copy over everything from `./build` folder to the root of the bucket.

You may have to do an invalidation in the corresponding CloudFront instance to clear the cache from old files.

## Cloud Configuration

The corresponding CloudFront instance is [here](https://us-east-1.console.aws.amazon.com/cloudfront/v3/home?region=eu-central-1#/distributions/EKK6AEKOYGOXJ/origins). There should be an origin pointing to the `auroral-main` bucket.
