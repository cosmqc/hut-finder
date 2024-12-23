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
	rows, err := db.GetDatabase().Query(context.Background(),
		"SELECT * FROM hut_user WHERE id = $1", id)
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
