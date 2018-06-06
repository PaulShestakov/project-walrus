1) Use 'dev' branch
2) Install nodejs > 6
3) In ./config folder create a file default.json with next configuration (this points to production DB clone on a separate server)
{
  "dbClone": {
    "database": "wikipetby",
    "user": "root",
    "password": "mypassword",
    "host": "159.65.206.88",
    "port": "3307"
  },
  "mail": {
    "senderEmail": "dumbEmail",
    "senderPassword": "dumbPassw"
  }
}
3) Build a client
> npm run build-client-dev
4) Build a server
> npm run build-server-dev
5) Start server
> npm run server
6) Open http://localhost:3000/

* Use
> npm run server-stop
to stop server