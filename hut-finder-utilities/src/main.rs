use clap::{Parser, Subcommand};

mod hut_init;

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
            hut_init::read_csv();
        }
        Some(Commands::AnotherFlag) | None => {}
    }
}
