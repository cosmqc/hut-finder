use serde::{Deserialize, Serialize};
use tokio_postgres::Row;


#[derive(Serialize, Deserialize)]
pub struct Hut {
    pub id: u32,
    pub global_id: String,
    pub name: String,
    pub location: String,
    pub region: String,
    pub image_url: String,
    pub hut_url: String,
    pub facilities: String,
    pub x: i64,
    pub y: i64,
    pub bookable: bool,
}

impl Hut {
    pub fn from_row(row: &Row) -> Result<Self, Box<dyn std::error::Error>> {
        let id: i32 = row.try_get("id")?;
        let global_id: String = row.try_get("global_id")?;
        
        Ok(Hut {
            id: id as u32,  // Convert i32 to u32 (assuming id is always positive)
            global_id: global_id.to_string(),
            name: row.try_get("name")?,
            location: row.try_get("location")?,
            region: row.try_get("region")?,
            image_url: row.try_get("image_url")?,
            hut_url: row.try_get("hut_url")?,
            facilities: row.try_get("facilities")?,
            x: row.try_get("x")?,
            y: row.try_get("y")?,
            bookable: row.try_get("bookable")?,
        })
    }
}