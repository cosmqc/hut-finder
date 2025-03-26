SET ROLE = 'hut-finder';
BEGIN;

UPDATE hut
SET category = 3
WHERE name IN (
               'Ada Pass Hut',
               'Angelus Hut',
               'Anne Hut',
               'Balloon Hut',
               'Big River Hut',
               'Blue Lake Hut',
               'Blyth Hut',
               'Boar Inn',
               'Boyd Hut',
               'Boyle Flat Hut',
               'Bushline Hut',
               'Cannibal Gorge Hut',
               'Cape Brett Hut',
               'Carrington Hut',
               'Casey Hut',
               'Central Whirinaki Hut',
               'Christopher Hut',
               'Crosbies Hut',
               'Daleys Flat Hut',
               'Dart Hut',
               'Demon Trail Hut',
               'Downes Hut',
               'Edwards Hut',
               'Fenella Hut',
               'Greenstone Hut',
               'Hamilton Hut',
               'Haurangi Hut',
               'Hawdon Hut',
               'Hidden Falls Hut',
               'Hokuri Hut',
               'Holly Hut',
               'Hooker Hut',
               'Hope Kiwi Lodge',
               'Jans Hut',
               'John Tait Hut',
               'Jumbo Hut',
               'Kaiaraara Hut',
               'Kerin Forks Hut',
               'Kirwans Hut',
               'Kōhanga Atawhai – Manson Nicholls Hut',
               'Lake Alabaster Hut',
               'Lakehead Hut',
               'Lane Cove Hut',
               'Longview Hut',
               'Macaulay Hut',
               'Maketawa Hut',
               'Mangaehuehu Hut',
               'Mangaturuturu Hut',
               'Martins Bay Hut',
               'Mataketake Hut',
               'McKellar Hut',
               'Mid Caples Hut',
               'Motukawanui Hut',
               'Mt Arthur Hut',
               'Mt Heale Hut',
               'Ngapurua Hut',
               'Omaru Hut',
               'Ōtamahua Hut',
               'Packhorse Hut',
               'Papatahi Hut',
               'Peach Cove Hut',
               'Pinnacles Hut',
               'Pinnacles Hut',
               'Port Craig School Hut',
               'Pouākai Hut',
               'Pouri Hut',
               'Powell Hut',
               'Puketī Forest Hut',
               'Puketotara Hut',
               'Rangipo Hut',
               'Rangiwahia Hut',
               'Raukawa Lodge',
               'Rod Donald Hut',
               'Sabine Hut',
               'Salisbury Lodge',
               'Sandy Bay Hut',
               'Shelter Rock Hut',
               'Siberia Hut',
               'Speargrass Hut',
               'Sunrise Hut',
               'Sylvester Hut',
               'Te Puia Hut (Lodge)',
               'Te Rereatukahia Hut',
               'Te Whare Okioki',
               'Top Forks Hut',
               'Totara Flats Hut',
               'Turere Lodge',
               'Upper Travers Hut',
               'Waiaua Gorge Hut',
               'Waingongoro Hut',
               'Waitawheta Hut',
               'Welcome Flat Hut',
               'West Sabine Hut',
               'Whakapapaiti Hut',
               'Woolshed Creek Hut',
               'Young Hut'
    );

COMMIT;