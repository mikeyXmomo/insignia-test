# Insignia Fullstack Test

## Installation Back End

This Projects requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd insignia-be
npm i
npm start
```

Using PORT 8000

API LIST
| method  | API  | function  |
|---|---|---|
| GET  | /orders  | Get All Orders  |
| POST  | /order/create  | Create Order  |

## Installation Front End

This Projects requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd insignia-fe
npm i
npm start
touch .env
Create 'REACT_APP_URL'='http://localhost:8000' in .env files
Change the port in .env if you using another port of Backend API
```

Using PORT 3000

## Live URL
Frontend
https://insignia-test.vercel.app/

Backend
https://insignia-test.herokuapp.com/
