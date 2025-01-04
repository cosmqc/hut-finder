/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package db

import (
	"context"
	"hut-finder-api/pkg/config"
	"sync"

	"github.com/jackc/pgx/v5/pgxpool"
)

type postgres struct {
	db *pgxpool.Pool
}

var (
	pgInstance *postgres
	pgOnce     sync.Once
)

func NewPostgresConnection(ctx context.Context) (*postgres, error) {
	connStr := config.GetDbUrl()
	var db *pgxpool.Pool
	var err error
	pgOnce.Do(func() {
		db, err = pgxpool.New(ctx, connStr)
		pgInstance = &postgres{db}
	})
	if err != nil {
		return nil, err
	}
	return pgInstance, nil
}

func (pg *postgres) Close() {
	pg.db.Close()
}

func GetDatabase() *pgxpool.Pool {
	return pgInstance.db
}
