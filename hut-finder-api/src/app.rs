use axum::Router;
use crate::routes;

pub async fn create_app() -> Router {
    Router::new()
        .merge(routes::ping::create_route())
}