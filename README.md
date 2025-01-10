# `hut-finder 0.1.0`

A hut-bagging tracker for New Zealand's back country.

Contains:
- `hut-finder-api`, a RESTful API to fetch data about New Zealand's huts;
- `hut-finder-client`, a client side webpage that displays hut data;
- `hut-finder-utilities`, which has utilities to get `hut-finder` running.

Instructions for each component are in the individual READMEs, Quickstart for API/DB (from root dir):

```bash
docker compose up --build
```

Setting up environment:
```python
# .env

# The port the API listens on, defaults to 8080 if unset.
API_PORT=1337
# The username of the user postgres creates
POSTGRES_USER="example"
# The password of the user postgres creates
POSTGRES_PASSWORD="example"
# The postgres database name. Cannot include hyphens (postgres commits oof)
POSTGRES_DB="example"
```

```python
# hut-finder-api/.env - must be created but can be empty

# The port the API listens on, serves as a backup if the root .env isn't set
PORT=1337
```

## Authors 
- Yunu Cho
- Jake Dalton