use std::io;
use csv::ReaderBuilder;

struct Hut {
    name: String,
}

pub fn read_csv() {
    println!("Load huts into database");
    println!("    Please provide the full path of the csv file.");

    let mut reader = ReaderBuilder::new().has_headers(true).from_reader(io::stdin());
    for ln in reader.records() {
        
    }
}
