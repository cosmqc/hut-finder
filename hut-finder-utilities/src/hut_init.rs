use std::{io::{self, Write}, error::Error, fs::File};
use csv::ReaderBuilder;
use serde::{de, Deserialize};
use crate::db::read_and_connect;

fn deserialize_bookable<'de, D>(deserializer: D) -> Result<bool, D::Error>
where D: de::Deserializer<'de> {
    let s: &str = de::Deserialize::deserialize(deserializer)?;
    match s {
        "Yes" | "Y" | "y" | "true" => Ok(true),
        "No" | "N" | "n" | "false" => Ok(false),
        _ => Err(de::Error::unknown_variant(s, &["Yes", "Y", "y", "true", "No", "N", "n", "false"])),
    }
}


#[derive(Debug, Deserialize)]
struct Hut {
    #[serde(rename = "GlobalID")]
    global_id: String,
    #[serde(rename = "Name of site")]
    name: String,
    #[serde(rename = "Place")]
    location: String,
    #[serde(rename = "Region")]
    region: String,
    #[serde(rename = "URL to thumbnail")]
    image_url: String,
    #[serde(rename = "URL to webpage")]
    hut_url: String,
    #[serde(rename = "Facilities")]
    facilities: String,
    #[serde(rename = "x")]
    x: i64,
    #[serde(rename = "y")]
    y: i64,
    #[serde(rename = "Bookable", deserialize_with = "deserialize_bookable")]
    bookable: bool,
}

pub fn initialise_hut_data() -> Result<(), Box<dyn Error>> {
    let mut rows_affected: i32 = 0;
    let mut client = read_and_connect()?;
    println!("Load huts into database");
    print!("    Please provide the full path of the csv file: ");
    io::stdout().flush()?;
    let mut file_path = String::new();
    io::stdin().read_line(&mut file_path)?;
    let file_path = file_path.trim();

    let file = File::open(file_path)?;

    let mut rdr = ReaderBuilder::new()
        .has_headers(true)
        .from_reader(file);

    let insert_query = "
    INSERT INTO hut (global_id, name, location, region, image_url, hut_url, facilities, x, y, bookable)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";

    let mut transaction = client.transaction()?;
    for ln in rdr.deserialize() {
        let hut: Hut = ln?;
        transaction.execute(
            insert_query,
            &[
                &hut.global_id,
                &hut.name,
                &hut.location,
                &hut.region,
                &hut.image_url,
                &hut.hut_url,
                &hut.facilities,
                &hut.x,
                &hut.y,
                &hut.bookable
            ]
        )?;
        rows_affected += 1;

    }

    transaction.commit().unwrap();
    client.close().unwrap();

    println!("{} entries inserted.", rows_affected);

    Ok(())
}

