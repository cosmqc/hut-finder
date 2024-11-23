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