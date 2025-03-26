-- Adds hut categories

SET ROLE = 'hut-finder';

BEGIN;

ALTER TABLE hut
    ADD COLUMN category INTEGER;

COMMIT;
