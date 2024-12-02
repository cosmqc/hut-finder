/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package config

import (
	"fmt"

	"github.com/joho/godotenv"
)

func LoadConfig() error {
	if err := godotenv.Load(); err != nil {
		return fmt.Errorf("could not load configurations: %w", err)
	}
	return nil
}
