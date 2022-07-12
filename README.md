# Valex API
In this project was developed an back-end API Benefits Card manager.

## About

This application will help the companies and the clients to manager the benefits cards. The companies can create, recharge and manage the payments, 
while the employees can active, block, unblock their cards and manage their purchases.

- Input's validations with [JOI API](https://github.com/sideway/joi)
- Express
- NodeJS linked to Postgres database
- 

## Technologies
The following tools, frameworks and languages were used in this project:<br>

<div>
  <img style='margin: 5px;' src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/typescript-%233178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white" />
  <img style='margin: 5px;' src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/postgresql-%23336791.svg?&style=for-the-badge&logo=postgresql&logoColor=white" />
  <img style='margin: 5px;' src="https://img.shields.io/badge/joi-%23323330.svg?style=for-the-badge&color=990000"/>
</div>

## How to run

```bash
$ git clone https://github.com/bruno-ruotolo/valex

$ cd valex

$ npm install

$ npm run dev
```

API:

```
- POST /card/create (companie authentication)
    - Route to the companie create a new card
    - headers: { "x-api-key": "$apiKey"}
    - body: {
    "employeeId": 0,
    "type": "loremipsum"
    }

- POST /card/activate
    - Route to the employee active the card
    - headers: {}
    - body: {
    cardId: 0,
    securityCode: "000",
    password: "loremipsum"
    }

- POST /card/activate
    - Route for the employee active the card
    - headers: {}
    - body: {
    cardId: 0,
    securityCode: "000",
    password: "loremipsum"
    }

- POST /card/block
    - Route for employee blocks the card
    - headers: {}
    - body: {
    cardId: 0,
    password: "loremipsum"
    }

- POST /card/unblock
    - Route for employee unblocks the card
    - headers: {}
    - body: {
    cardId: 0,
    password: "loremipsum"
    }

- POST /payment
    - Route for employee make payments
    - headers: {}
    - body: {
    cardId: 0,
    password: "loremipsum",
    businessId: 0,
    amount: 1
    }

- POST /recharge (companie authentication)
    - Route for companies recharge their employees' cards
    - headers: {"x-api-key": "$apiKey"}
    - body: {
    cardId: 0,
    amount: 1
    }

```

## Authors

- [@brunoruotolo](https://github.com/bruno-ruotolo)
