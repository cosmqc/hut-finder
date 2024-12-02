# `hut-finder-api`

A RESTful API written in Golang


## Configuration
To get the server running, you will need a configuration file (`.env`).
This configuration file consists of:
```
DB_URL=postgres://<hostname>/<db-name>?user=<username>&password=<password>
PORT=<server-port>
```
`PORT` is optional, and will default to `8080` if none is specified.

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