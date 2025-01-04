/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package config

import (
	"fmt"

	"os"
	"strconv"

	"github.com/joho/godotenv"
)

// Loads config from environment variables.
func LoadConfig() error {
	if err := godotenv.Load(); err != nil {
		return fmt.Errorf("could not load configurations: %w", err)
	}
	return nil
}

// Gets port from environment variables. Returns 8080 if none specified.
func GetPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		return "8080"
	}
	return port
}

// Returns DB_URL. If this value is blank, the server will panic at startup.
func GetDbUrl() string {
	return os.Getenv("DB_URL")
}

// Returns SIGNING_KEY. Used to sign JWTs.
func GetSigningKey() string {
	return os.Getenv("SIGNING_KEY")
}

// Gets token expiry from environment variables. Returns 12 if none specified, or invalid.
func GetTokenExpiryHours() int64 {
	expHours := os.Getenv("TOKEN_EXPIRY_HOURS")
	if expHours == "" {
		return 12
	}
	hours, err := strconv.ParseInt(expHours, 10, 8)
	if err != nil {
		return 12
	}
	if hours <= 0 {
		return 12
	}
	return hours
}
