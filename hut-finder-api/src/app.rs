use axum::Router;
use dotenv::dotenv;
use std::{env, sync::Arc};
use tokio_postgres::{Client, NoTls};

use crate::routes;

#[derive(Clone)]
pub struct AppState {
    pub client: Arc<Client>,
}
impl AppState {
    pub fn new(client: Arc<Client>) -> Self {
        Self {
            client: client,
        }
    }
}

pub async fn create_app(client: Arc<Client>) -> Router {
    Router::new()
        .merge(routes::ping::create_route())
        .merge(routes::hut::create_route())
        .with_state(AppState::new(client))
}

pub async fn load_db() -> Result<Client, Box<dyn std::error::Error>> {
    dotenv().ok();
    let username = env::var("DB_USERNAME").map_err(|_| "DB_USERNAME is missing.")?;
    let host = env::var("DB_HOST").map_err(|_| "DB_HOST is missing.")?;
    let password = env::var("DB_PASSWORD").map_err(|_| "DB_PASSWORD is missing.")?;
    let db_name = env::var("DB_NAME").map_err(|_| "DB_NAME is missing.")?;

    let (client, connection) = tokio_postgres::Config::new()
        .user(&username)
        .host(&host)
        .password(&password)
        .dbname(&db_name)
        .connect(NoTls)
        .await?;

    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("Database connection error: {}", e);
        }
    });

    Ok(client)
}