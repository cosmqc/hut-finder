# Database Backups
Store your backups in this directory.
Database backups are ignored, for obvious reasons.

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
cat <file-name>.sql | docker exec -i hut-finder-hut-finder-db-1 psql -U postgres
```
# Backup
If you ever want to back up, then run:
```bash
pg_dumpall -c -U postgres > /<file-name>.sql
```
