package model

type Session struct {
	UserId      uint32 `db:"user_id"`
	TokenString string `db:"token_string"`
}

type SessionRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
