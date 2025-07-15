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

type Postgres struct {
	db *pgxpool.Pool
}

var (
	pgInstance *Postgres
	pgOnce     sync.Once
)

// NewPostgresConnection Creates a new postgres connection pool.
func NewPostgresConnection(ctx context.Context) (*Postgres, error) {
	connStr := config.GetDbUrl()
	var db *pgxpool.Pool
	var err error
	pgOnce.Do(func() {
		db, err = pgxpool.New(ctx, connStr)
		pgInstance = &Postgres{db}
	})
	if err != nil {
		return nil, err
	}
	return pgInstance, nil
}

// Close Closes the DB connection.
func (pg *Postgres) Close() {
	pg.db.Close()
}

// GetDatabase Returns singleton database instance. Whenever repository calls are needed, import this module
// and invoke this function!
func GetDatabase() *pgxpool.Pool {
	return pgInstance.db
}
