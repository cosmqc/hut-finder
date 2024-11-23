use axum::{
    response::{IntoResponse, Response},
    routing::get,
    Router,
    Json,
    extract::{Path, State},
    http::StatusCode,
};
use tokio_postgres::Client;
use crate::{app::AppState, models::hut::Hut};
use serde::Serialize;

#[derive(Serialize)]
struct ErrorResponse {
    error: String,
}

pub fn create_route() -> Router<AppState> {
    Router::new()
        .route("/hut/local/:hut_id", get(get_hut_by_id))
        .route("/hut/global/:global_id", get(get_hut_by_global_id))

}

async fn get_hut_by_id(
    State(state): State<AppState>,
    Path(hut_id): Path<i32>
) -> Response {
    let db_client: &Client = &state.client;
    
    match db_client
        .query_one(
            "SELECT id, global_id, name, location, region, image_url, hut_url, facilities, x, y, bookable 
             FROM hut WHERE id = $1",
            &[&hut_id],
        )
        .await
    {
        Ok(row) => match Hut::from_row(&row) {
            Ok(hut) => (StatusCode::OK, Json(hut)).into_response(),
            Err(e) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse {
                    error: format!("Failed to parse hut data: {}", e)
                })
            ).into_response(),
        },
        Err(_) => (
            StatusCode::NOT_FOUND,
            Json(ErrorResponse {
                error: format!("Hut with id {} not found", hut_id)
            })
        ).into_response(),
    }
}

async fn get_hut_by_global_id(
    State(state): State<AppState>,
    Path(global_id): Path<String>
) -> Response {
    let db_client: &Client = &state.client;
    
    match db_client
        .query_one(
            "SELECT id, global_id, name, location, region, image_url, hut_url, facilities, x, y, bookable 
             FROM hut WHERE global_id = $1",
            &[&global_id.trim()],
        )
        .await
    {
        Ok(row) => match Hut::from_row(&row) {
            Ok(hut) => (StatusCode::OK, Json(hut)).into_response(),
            Err(e) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse {
                    error: format!("Failed to parse hut data: {}", e)
                })
            ).into_response(),
        },
        Err(_) => (
            StatusCode::NOT_FOUND,
            Json(ErrorResponse {
                error: format!("Hut with global id {} not found", global_id)
            })
        ).into_response(),
    }
}