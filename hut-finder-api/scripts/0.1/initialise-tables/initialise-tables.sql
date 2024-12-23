SET ROLE 'hutfinder';

BEGIN;

CREATE TABLE hut (
    id SERIAL PRIMARY KEY,
    global_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    image_url TEXT,
    hut_url TEXT,
    facilities TEXT,
    x BIGINT NOT NULL,
    y BIGINT NOT NULL,
    bookable BOOLEAN NOT NULL
);

CREATE TABLE hut_user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(32) NOT NULL,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    email VARCHAR(254) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE hut_visit (
    user_id INT NOT NULL,
    hut_id INT NOT NULL,
    visited TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, hut_id, visited),
    FOREIGN KEY (user_id) REFERENCES hut_user (id) ON DELETE CASCADE,
    FOREIGN KEY (hut_id) REFERENCES hut (id) ON DELETE CASCADE
);

COMMIT;
