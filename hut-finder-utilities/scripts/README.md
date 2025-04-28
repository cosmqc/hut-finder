# Database Setup Guide
This guide runs you through the setup process of creating a database.\
Note that this is ONLY required if you don't want to Dockerise your database instance.\
This assumes you have `postgres` installed.

## Database Creation

1) ### Log into user `postgres`
    ```
    sudo su - postgres
    ```
2) ### Create a user `hutfinder`
    ```
    createuser hutfinder
    ```
3) ### Create a password for `hutfinder`
    ```
    psql
    ```
    Note that you may need to enter your postgres password here. The default password is `postgres`.
    ```
    ALTER USER hutfinder WITH ENCRYPTED PASSWORD <password>;
    ```
    Where `<password>` is the password you want to set as the user's password.
    
    Then exit `psql` with:
    ```
    \q
    ```
4) ### Creating the `hut-finder` database
    Create the database, and we set it to be owned by the `hutfinder` user.
    ```
    createdb -O hutfinder hut-finder
    ```
    Then we can log out of the `postgres` user.
    ```
    logout
    ```
## Database Tables
After creating the database, we can log into it:
```
psql -U hutfinder hut-finder
```
Then we can run the scripts in `init.sql` in order.

## `pg_hba.conf` Issues
When running the program, you may have issues connecting. If so,
you'll have to change some configurations in your `pg_hba.conf` file. To locate where this file is:
1) ### Log into the `postgres` user
    ```
    sudo su - postgres
    ```
2) ### Open `psql` and run `show hba_file;`
    ```
    psql
    show hba_file;
    ```
    Then you'll have some result such as:
    ```
                hba_file             
    ---------------------------------
    /var/lib/pgsql/data/pg_hba.conf
    (1 row)
    ```
    Copy that value, then exit `psql` and log out
    
    ```
    \q
    logout
    ```

3) ### Edit `pg_hba.conf` File
    ```
    sudo vim /path/to/pg_hba.conf
    ```
    And change `peer` to `md5`:

    ```
    # "local" is for Unix domain socket connections only
    local   all             all                                     md5 
    # IPv4 local connections:
    host    all             all             127.0.0.1/32            md5 
    # IPv6 local connections:
    host    all             all             ::1/128                 md5
    ```
    And if all goes well, it should work.