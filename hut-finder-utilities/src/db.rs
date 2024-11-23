use rpassword::prompt_password;
use postgres::{Client, NoTls};
use std::io::{self, Write};

pub fn read_and_connect() -> Result<Client, Box<dyn std::error::Error>>  {
    let mut db_name = String::new();
    let mut username = String::new();
    println!("Database Connection");
    print!("    Please enter the name of your database, or leave blank for the default (hut-finder): ");

    io::stdout().flush()?;
    io::stdin().read_line(&mut db_name)?;

    let db_name = if db_name.trim().is_empty() {
        String::from("hut-finder")
    } else {
        db_name.trim().to_string()
    };

    print!("    Please enter your username (for the database user): ");
    io::stdout().flush()?; 
    io::stdin().read_line(&mut username)?;
    let username = username.trim().to_string();

    let password = prompt_password("    Please enter your password: ").unwrap();

    _connect(username, password, db_name)
}

fn _connect(username: String, password: String, db_name: String) -> Result<Client, Box<dyn std::error::Error>> {

    println!("Connecting to database...");

    Client::configure().user(&username)
                       .host("localhost")
                       .password(&password)
                       .dbname(&db_name)
                       .connect(NoTls)
                       .map_err(|e| {
        Box::new(e) as Box<dyn std::error::Error>
    })
}