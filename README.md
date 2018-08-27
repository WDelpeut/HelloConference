# helloConference

Requires MongoDB server running
- mongod (run mongodb server)

Seed database:
- mongoimport --db hello-conference-dev --collection events --type json --file server/events-seed.json --jsonArray --drop

Developing:
- npm install
- gulp watch
- node server/server.js
- mongo (access server through mongo (shell))