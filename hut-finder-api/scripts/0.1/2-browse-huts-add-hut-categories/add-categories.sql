-- Adds hut categories

SET ROLE = 'hut-finder';

BEGIN;

ALTER TABLE hut
    ADD COLUMN category INTEGER;
-- INDIVIDUALLY_PRICED
UPDATE hut
SET category = 1
WHERE name IN (
               'Peach Cove Hut',
               'Puketi Forest Hut',
               'Pahautea Hut',
               'Pinnacles Hut (Coromandel)',
               'Crosbies Hut',
               'Waitawheta Hut',
               'Sunrise Hut',
               'Atiwhakatu Hut',
               'Powell Hut',
               'Angelus Hut',
               'Welcome Flat Hut',
               'Hooker Hut',
               'Otamahua Hut',
               'Packhorse Hut',
               'Pinnacles Hut (Mount Somers)',
               'Rod Donald Hut',
               'Woolshed Creek Hut',
               'Siberia Hut',
               'Almer Hut',
               'Aspiring Hut',
               'Barron Saddle Hut',
               'Brewster Hut',
               'Centennial Hut',
               'Colin Todd Hut',
               'Chancellor Hut',
               'Empress Hut',
               'French Ridge Hut',
               'Kelman Hut',
               'Liverpool Hut',
               'Mueller Hut',
               'Pioneer Hut',
               'Plateau Hut',
               'Tasman Saddle Hut'
    );

UPDATE hut
SET category = 5
WHERE name IN (
               'A Frame Hut',
               'Abrahams Bay Hunters Hut'``,
    );


COMMIT;
