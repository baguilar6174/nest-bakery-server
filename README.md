# Nest Bakery Server

This project presents a bakery REST API built with Nest.js and TypeScript, it provides an efficient way to manage bakery orders and products. From querying the product catalog to placing custom orders. The Rest API has well defined endpoints and a robust architecture.

## Important

TODO: Create database db_bakery

## Installation

Clone this repository

```bash
git clone https://github.com/baguilar6174/node-natours-server.git
```

Install dependencies

```bash
yarn
```

## Running the app

If you need local Postgres database

- Install docker desktop
- Run `docker-compose up -d` This command create a local volumen in root project to save data.

**Postgres Database**: the volume of this database is allocated in the root of your project `./postgres` if you delete this folder you'll lose your data.

- Rename `.env.template` to `.env` and add your environment variables
- Run `yarn start:dev`

If your want to create build production, run `yarn build`

## My process

### Built with

- Nest JS
- Typescript
- Typeorm
- Postgres

## Improves

- Using object value pattern
- Implements a web client to consume this API
- Implement advanced authentication features
  - Confirm user email
  - Keep user logged in with refresh tokens
  - 2FA

## TODO

- Define interfaces to control domain

## Stay in touch

- Website - [www.bryan-aguilar.com](https://www.bryan-aguilar.com/)
- Medium - [baguilar6174](https://baguilar6174.medium.com/)
- LinkeIn - [baguilar6174](https://www.linkedin.com/in/baguilar6174)
