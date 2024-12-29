/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package api

import (
	"hut-finder-api/pkg/model"
	"hut-finder-api/pkg/service"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateSession(c *gin.Context) {
	var request model.SessionRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		log.Printf("failed to create session: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	session, err := service.CreateSession(request.Username, request.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, nil)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"session": session})
}

func Logout(c *gin.Context) {
	token := c.Request.Header.Get("Authorization")
	if token == "" {
		log.Printf("No token exists")
		c.Abort()
		return
	}
	if err := service.DeleteSession(token); err != nil {
		log.Printf("service threw error: %v", err)
		return
	}
}
