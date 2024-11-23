use axum::{routing::post, Router, Json};
use crate::app::AppState;
use crate::models::ping::{PingRequest, PingResponse};

pub fn create_route() -> Router<AppState> {
    Router::new()
        .route("/ping", post(ping))
}

async fn ping(Json(request): Json<PingRequest>) -> Json<PingResponse> {
    Json(PingResponse::new(request.message))
}