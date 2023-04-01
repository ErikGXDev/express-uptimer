# Express Uptimer

Simple password protected uptimer to check the status of your websites and to keep them alive.

## Set up

Clone the repository and make a .env file like this:

```
MASTER_PASSWORD=abc123
PING_INTERVAL_MINUTES=2
PORT=3000
```

`MASTER_PASSWORD` is your password you need to enter to add/remove URLs

`PING_INTERVAL_MINUTES` is the minutes between URL pings

`PORT` is the port of the webserver

Run the webserver using `npm run start`
or test it using nodemon with `npm run test`

Open the website and add/remove URLs using the buttons and input fields.
