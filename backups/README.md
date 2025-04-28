# Database Backups
Store your backups in this directory.
Database backups are ignored, for obvious reasons.

They should end with `*.backup`.
Ideally, you'd have the file format
```
<db-name>-<major-version>-<minor-version>.backup
```

# Usage
There are two main use cases for this:
- Creating a fresh setup, including creating a new user, new database, and restoring from a backup file, or
- Dropping the old database and restoring from a backup file.
```bash
# Remove the old data from the container 
sudo docker compose down -v

# Build and run the container
sudo docker compose up -d --build

# Execute database restore on the container
sudo docker exec -i hut-finder-hut-finder-db-1 pg_restore -U <POSTGRES_USER> -d <DATABASE_NAME> < /path/to/*.backup 
```
