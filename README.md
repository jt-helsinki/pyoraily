# HPY Portal

The HPY Portal project contains

- the Shell (`./shell`), which is the front-end for hosting other micro front-ends, and
- login application (`./shell-ms`), a backend micro-service which provides authentication and user management functionality.

## Requirements

To develop and run the project, you need a Bourne compatible shell (bash, zsh, ksh, sh). For Windows it is recommended to develop in WSL.

### Node & NPM

Required NodeJS version: v16.15.\*

## Auth0

You will need the Auth0 keys set in your `shell-ms/.env` file. 

### Setup `.env` files

Setup the `.env` files acording to the instructions in each module of this project.

### Husky

After having setup Node and NPM, in the root of this project run:
```shell
> npm i
> npm run prepare
```

This will install and setup `husky` to run pre-commit linting.

## Recommendations

## Running the shell

Start shell micro-service and shell by running

```shell
npm start
```

To start user management micro-service and shell separately, follow the steps under:

- Shell-ms
- Shell

### Shell Microservice

Assuming at the project root:

See instructions in the `./shell-ms` directory.

```shell


# install local dynamodb on first run
npx serverless dynamodb install

# run app in serverless mode
npm run start:sls
```

### Shell

See instructions in the `./shell` directory.

## NVM

If you use NVM to manage your node versions, be aware that Husky may cause issues with Github Desktop.

To solve problem this, create a `.huskyrc` in this root project directy and add the following to it:

```shell
# ~/.huskyrc
# This loads nvm.sh and sets the correct PATH before running hook
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

## Troubleshooting
If you are getting the below error, you may have to delete the `users` table in DynamoDB. You can use `dynamodb-admin` to do this.
```
ResourceNotFoundException: Invalid ShardId in ShardIterator
```
