use std::{net::SocketAddr, sync::Arc};
use tokio::net::TcpListener;
use tokio_postgres::Client;
mod app;
mod routes;
mod models;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client: Client = app::load_db().await.unwrap();
    let app = app::create_app(Arc::new(client)).await;
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let listener = TcpListener::bind(addr).await?;
    println!("Listening on {}", addr);
    axum::serve(
        listener,
        app.into_make_service()
    ).await?;

    Ok(())
}


