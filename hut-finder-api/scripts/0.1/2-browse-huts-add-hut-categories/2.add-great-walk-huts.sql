SET ROLE = 'hut-finder';

BEGIN;

UPDATE hut
SET category = 0
WHERE name IN (
               'Anchorage Hut',       'Awaroa Hut',
               'Bark Bay Hut',        'Brown Hut',
               'Ces Clark Hut',       'Clinton Hut',
               'Dumpling Hut',        'Gouland Downs Hut',
               'Heaphy Hut',          'Iris Burn Hut',
               'James Mackay Hut',    'John Coull Hut',
               'Lake Mackenzie Hut',  'Luxmore Hut',
               'Mangatepopo Hut',     'Marauiti Hut',
               'Mintaro Hut',         'Moonlight Tops Hut',
               'Moturau Hut',         'North Arm Hut',
               'Oturere Hut',         'Panekire Hut',
               'Perry Saddle Hut',    'Pororari Hut',
               'Port William Hut',    'Routeburn Falls Hut',
               'Routeburn Flats Hut', 'Saxon Hut',
               'Tīeke Marae/Kāinga',  'Waiharuru Hut',
               'Waihohonu Hut',       'Waiopaoa Hut',
               'Whakahoro Bunkroom',  'Whanganui Hut',
               'Whariwharangi Hut'
    );

COMMIT;