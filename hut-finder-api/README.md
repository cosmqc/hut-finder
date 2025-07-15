# `hut-finder-api`

A RESTful API written in Golang


## Configuration
To get the server running, you will need a configuration file (`.env`).
This configuration file consists of:
```
DB_URL=postgres://<hostname>/<db-name>?user=<username>&password=<password>
PORT=<server-port>
SIGNING_KEY=<key-to-sign-token>
TOKEN_EXPIRY_HOURS=<token-expiry>
EXTERNAL_API_BASE_URL=https://api.doc.govt.nz/v2/
EXTERNAL_API_KEY=<api-key>
```
- `PORT` is optional, and will default to `8080` if none is specified.
- `TOKEN_EXPIRY_HOURS` is also optional, and defaults to 12 hours if none specified, or invalid.
- `DB_URL` and `SIGNING_KEY` are required values, and the application will not run if these fields aren't provided.
- `EXTERNAL_API_BASE_URL` and `EXTERNAL_API_KEY` are optional, however, it is recommended for extra details to be shown, i.e., regional alerts, and facilities. 
  - The key can be sourced fairly easily on the DOC developer website. 

## How to compile and run
From the `hut-finder-api` directory...
```
go mod tidy
```
```
go build -o hut-finder-api ./cmd/server
```
```
./hut-finder-api
```
Or type
```
go run cmd/server/main.go
```

## Authors
- Yunu Cho
- Jake Dalton