use clap::{Parser, Subcommand};
use std::process::exit;

mod hut_init;
mod db;

#[derive(Parser)]
#[command(name = "example")]
struct Args {
    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand)]
enum Commands {
    Hut,
    AnotherFlag,
}

fn main() {
    let args = Args::parse();
    match args.command {
        Some(Commands::Hut) => {
            if let Err(err) = hut_init::initialise_hut_data() {
                eprintln!("Error loading data, stacktrace: {:?}", err);
                exit(1);
            }
        }
        Some(Commands::AnotherFlag) | None => {}
    }
}
