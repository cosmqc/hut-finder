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

func GetUserById(id uint64) (*model.User, error) {
	log.Printf("querying for hut with id: `%d`", id)
	sql := "SELECT * FROM hut_user WHERE id = $1"
	rows, err := db.GetDatabase().Query(context.Background(),
		sql, id)
	if err != nil {
		log.Printf("could not query database: %v", err)
		return nil, fmt.Errorf("could not query database: %w", err)
	}
	defer rows.Close()
	user, err := pgx.CollectOneRow(rows, pgx.RowToStructByName[model.User])
	if err != nil {
		log.Printf("could not collect row: %v", err)
		return nil, fmt.Errorf("could not collect row: %w", err)
	}

	return &user, nil
}

func CreateUser(user model.User) (*model.User, error) {
	sql := `
	INSERT INTO hut_user (username, first_name, last_name, email, password) 
	VALUES ($1, $2, $3, $4, $5)
	RETURNING id, username, first_name, last_name, email;
	`

	var result model.User
	err := db.GetDatabase().QueryRow(context.Background(),
		sql,
		user.Username,
		user.FirstName,
		user.LastName,
		user.Email,
		user.Password).Scan(
		&result.Id,
		&result.Username,
		&result.FirstName,
		&result.LastName,
		&result.Email)
	if err != nil {
		log.Printf("could not insert row: %v", err)
		return nil, fmt.Errorf("could not insert row: %w", err)
	}
	return &result, nil
}
