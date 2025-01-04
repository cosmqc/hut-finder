/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package repository

import (
	"context"
	"fmt"
	"hut-finder-api/pkg/db"
	"hut-finder-api/pkg/model"
	"log"

	"github.com/jackc/pgx/v5"
)

// Gets a session struct by a token.
func GetSession(token string) (*model.Session, error) {
	sql := `SELECT * FROM session WHERE token_string = $1`
	rows, err := db.GetDatabase().Query(context.Background(), sql, token)
	if err != nil {
		log.Printf("could not query database: %v", err)
		return nil, fmt.Errorf("could not query database: %v", err)
	}
	defer rows.Close()
	result, err := pgx.CollectOneRow(rows, pgx.RowToStructByName[model.Session])
	if err != nil {
		log.Printf("could not collect row: %v", err)
		return nil, fmt.Errorf("could not collect row: %w", err)
	}
	return &result, nil
}

// Creates a new session, with the user's id and generated token.
func CreateSession(userId uint32, token string) (string, error) {
	sql := `
	INSERT INTO session (user_id, token_string) 
	VALUES ($1, $2) 
	RETURNING token_string
	`
	var result string
	err := db.GetDatabase().QueryRow(context.Background(),
		sql,
		userId,
		token).Scan(&result)
	if err != nil {
		log.Printf("could not query database: %v", err)
		return "", err
	}
	return result, nil
}

// Deletes session.
func DeleteSessionByUserIdAndToken(userId uint32, token string) error {
	sql := `DELETE FROM session WHERE user_id = $1 AND token_string = $2`
	result, err := db.GetDatabase().Exec(context.Background(), sql, userId, token)
	if err != nil {
		log.Printf("could not query database: %v", err)
		return fmt.Errorf("could not query database: %v", err)
	}
	if result.RowsAffected() == 0 {
		log.Printf("no session found to delete for user_id: %d, token: %s", userId, token)
	}
	return nil
}
