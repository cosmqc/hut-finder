use serde::{Deserialize, Serialize};

use chrono::{DateTime, Utc, serde::ts_nanoseconds};

#[derive(Deserialize)]
pub struct PingRequest {
    pub message: String,
}

#[derive(Serialize)]
pub struct PingResponse {
    pub message: String,
    #[serde(with = "ts_nanoseconds")]
    pub datetime: DateTime<Utc>,
}

impl PingResponse {
    pub fn new(message: String) -> Self {
        Self {
            message,
            datetime: Utc::now()
        }
    }
}