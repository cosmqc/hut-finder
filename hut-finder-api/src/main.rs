use std::net::SocketAddr;
use tokio::net::TcpListener;

mod app;
mod routes;
mod models;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let app = app::create_app().await;

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let listener = TcpListener::bind(addr).await?;
    println!("Listening on {}", addr);
    axum::serve(listener, app.into_make_service()).await?;
    Ok(())
}


