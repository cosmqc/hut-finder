#!/bin/bash
set -e

if [ "$1" = "new-user" ]; then
  echo "Creating a new user and database from backup."
  psql <<-EOSQL
    CREATE USER postgres with PASSWORD 'postgres';
    CREATE DATABASE "$POSTGRES_DB";
    GRANT ALL PRIVILEGES ON DATABASE "$POSTGRES_DB" TO $POSTGRES_USER;
EOSQL
else
  echo "Dropping database and restoring from backup."
  psql <<-EOSQL
    DROP DATABASE IF EXISTS "$POSTGRES_DB";
    CREATE DATABASE "$POSTGRES_DB";
    GRANT ALL PRIVILEGES ON DATABASE "$POSTGRES_DB" TO $POSTGRES_USER;
EOSQL
fi
backup_files=(/docker-entrypoint-initdb.d/backups/*.backup)
pg_restore -d "$POSTGRES_DB" -j 4 -v ${backup_files[-1]}

