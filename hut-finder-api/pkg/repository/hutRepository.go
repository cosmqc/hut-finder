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

func GetHutById(id uint64) (*model.Hut, error) {
	log.Printf("querying for hut with id: `%d`", id)
	rows, err := db.GetDatabase().Query(context.Background(),
		"SELECT * FROM hut WHERE id = $1", id)
	if err != nil {
		log.Printf("could not query database: %v", err)
		return nil, fmt.Errorf("could not query database: %w", err)
	}
	defer rows.Close()
	hut, err := pgx.CollectOneRow(rows, pgx.RowToStructByName[model.Hut])
	if err != nil {
		log.Printf("could not collect row: %v", err)
		return nil, fmt.Errorf("could not collect row: %w", err)
	}

	model.PopulateFacilities(&hut)
	return &hut, nil
}

func GetHutByGlobalId(globalId string) (*model.Hut, error) {
	log.Printf("querying for hut with global id: `%s`", globalId)
	rows, err := db.GetDatabase().Query(context.Background(),
		"SELECT * FROM hut WHERE global_id = $1", globalId)
	if err != nil {
		log.Printf("could not query database: %v", err)
		return nil, err
	}
	defer rows.Close()
	hut, err := pgx.CollectOneRow(rows, pgx.RowToStructByName[model.Hut])
	if err != nil {
		log.Printf("could not collect row: %v", err)
		return nil, fmt.Errorf("could not collect row: %w", err)
	}
	model.PopulateFacilities(&hut)
	return &hut, nil
}
