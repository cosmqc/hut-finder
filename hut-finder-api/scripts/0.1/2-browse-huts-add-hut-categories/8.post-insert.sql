SET ROLE = 'hut-finder';
BEGIN;

UPDATE hut SET name = TRIM(name);

UPDATE hut SET category = 0 WHERE TRIM(name) ILIKE ANY (ARRAY[
    'Luxmore Hut',
    'Iris Burn Hut',
    'Moturau Hut',
    'Lake Mackenzie Hut',
    'Tīeke Marae/kāinga',
    'Routeburn Flats Hut',
    'Routeburn Falls Hut'
    ]);

UPDATE hut SET category = 3 WHERE TRIM(name) ILIKE ANY (ARRAY[
    'Te Rereatukahia Hut',
    'Kerin Forks Hut',
    'Mckellar Hut'
    ]);

UPDATE hut SET category = 4 WHERE TRIM(name) ILIKE ANY (ARRAY[
    'Trust/poulter Hut',
    'Otamatapaio Hut',
    'Forbes Hut (Previously Seymour Hut)',
    'Snowgrass Hut',
    'Mcintyre Hut',
    'Kahurangi Keepers House',
    'Harkness Hut',
    'Kiwi Mouth Hut',
    'D''urville Hut',
    'Mcconchies Hut',
    'Severn Hut',
    'Lake Mcrae Hut',
    'Roses Hut',
    'Highland Creek Hut',
    'Mckerrow Island Hut',
    'Mccoy Hut',
    'Sentry Box Hut (Historic)',
    'Mckinnon Hut'
    ]);

UPDATE hut SET category = 5 WHERE TRIM(name) ILIKE ANY (ARRAY[
    'Top Hut',
    'Top Trent Hut/lagoon Hut',
    'Hornby Bivvy',
    'Mcintosh Hut',
    'Moonlight And Roses Hut',
    'Julia Hut (Old)',
    'Top Olderog Bivvy',
    'History Of Manson Hut',
    'North Esk Hut (Dilapidated)',
    'Mackenzie Bivvy (East Branch)',
    'Slaughterburn Hut',
    'Upper D''urville Hut',
    'Ministry Of Works Historic Hut',
    'Rodger Inlet Hut (Historic)',
    'Te Oneroa A-Frame Hut',
    'Mangaotane Hut (Mcmillans)',
    'Renata Hut',
    'Mcgregor Bivvy'
    ]);

ALTER TABLE hut ALTER COLUMN category SET NOT NULL;

COMMIT;