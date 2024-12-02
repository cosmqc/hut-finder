/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package main

import (
	"hut-finder-api/pkg/api"
	"hut-finder-api/pkg/config"
	"hut-finder-api/pkg/repository"
	"log"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Could not load config: %v", err)
	}
	r := gin.Default()
	api.RegisterRoutes(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	repository.InitialiseDB()

	log.Printf("Server is running on port %s...", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Could not start server: %v", err)
	}
}
