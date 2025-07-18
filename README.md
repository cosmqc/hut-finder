# `hut-finder 0.1.0`

A hut-bagging tracker for New Zealand's back country.

Contains:
- `hut-finder-api`, a RESTful API to fetch data about New Zealand's huts;
- `hut-finder-client`, a client side webpage that displays hut data;
- `hut-finder-utilities`, which has utilities to get `hut-finder` running.

Instructions for each component are in the individual READMEs.

Setting up environment:
```bash
# .env

# The username of the postgres root user
POSTGRES_USER=postgres
# The password of the POSTGRES_USER
POSTGRES_PASSWORD=postgres
# The postgres database name. Cannot include hyphens
POSTGRES_DB=example
```

```bash
# hut-finder-api/.env - `PORT`, `TOKEN_EXPIRY_HOURS`, and EXTERNAL_API_KEY can be left empty

# The port the API listens on, serves as a backup if the root .env isn't set
PORT=1337
# The key used to sign the session token
SIGNING_KEY=example
# The time until session token expires, defaults to 12 if missing
TOKEN_EXPIRY_HOURS=12
# The database URL
DB_URL=postgresql://localhost:5432/...
EXTERNAL_API_BASE_URL=https://api.doc.govt.nz/v2/
EXTERNAL_API_KEY=key
```

## Authors 
- Yunu Cho
- Jake Dalton
