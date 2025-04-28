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
	"strings"

	"github.com/jackc/pgx/v5"
)

// GetHutById Gets hut by id.
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

// GetHutByGlobalId Gets hut by global id.
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

// GetAllHuts Gets all huts.
func GetAllHuts(query string, categories []int, sortMethod string) ([]model.Hut, error) {
	log.Printf("querying for all huts")
	var sql string
	var args []interface{}

	args = append(args, "%"+query+"%")

	if len(categories) == 0 {
		sql = "SELECT * FROM hut WHERE name ILIKE $1 "
	} else {
		sql = "SELECT * FROM hut WHERE name ILIKE $1 AND category IN ("
		var placeholders []string

		for i, category := range categories {
			placeholders = append(placeholders, fmt.Sprintf("$%d", i+2))
			args = append(args, category)
		}

		sql += strings.Join(placeholders, ", ") + ") "
	}
	switch sortMethod {
	case "ALPHABETICAL_ASC":
		sql += " ORDER BY name ASC"
	case "ALPHABETICAL_DESC":
		sql += " ORDER BY name DESC"
	case "CATEGORY_ASC":
		sql += " ORDER BY category ASC, name ASC"
	case "CATEGORY_DESC":
		sql += " ORDER BY category DESC, name ASC"
	default:
		sql += " ORDER BY name ASC"
	}

	rows, err := db.GetDatabase().Query(context.Background(), sql, args...)
	if err != nil {
		log.Printf("could not query database: %v", err)
		return nil, err
	}

	huts, err := pgx.CollectRows(rows, pgx.RowToStructByName[model.Hut])
	if err != nil {
		log.Printf("could not collect rows: %v", err)
		return nil, err
	}

	var result []model.Hut
	for _, hut := range huts {
		model.PopulateFacilities(&hut)
		result = append(result, hut)
	}

	return result, nil
}
