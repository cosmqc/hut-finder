SET ROLE = 'hut-finder';
BEGIN;

UPDATE hut
SET category = 2
WHERE name IN (
               'Almer Hut',         'Aspiring Hut',
               'Barker Hut',        'Barron Saddle Hut',
               'Brewster Hut',      'Centennial Hut',
               'Chancellor Hut',    'Colin Todd Hut',
               'Empress Hut',       'French Ridge Hut',
               'Haast Hut',         'Kelman Hut',
               'Leaning Lodge Hut', 'Liverpool Hut',
               'Mueller Hut',       'Murchison Hut',
               'Park Morpeth Hut',  'Pioneer Hut',
               'Plateau Hut',       'Tasman Saddle Hut'
    );

COMMIT;