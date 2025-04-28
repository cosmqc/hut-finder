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
```
sudo docker compose exec hut-finder-db /docker-entrypoint-initdb.d/restore.sh
```
while the container is running.

You can supply the `new-user` flag to create a fresh setup from scratch. 

This assumes it is your first time creating this container.