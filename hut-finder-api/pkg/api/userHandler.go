/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package api

import (
	"errors"
	"hut-finder-api/pkg/model"

	"hut-finder-api/pkg/service"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Handler function for `/protected/users/:id`.
// Gets the user and returns it in the response body if the user exists.
func GetUserById(c *gin.Context) {
	user, err := service.GetUserById(c.Param("id"))
	if err != nil {
		log.Printf("could not find user: %v", err)
		c.JSON(http.StatusNotFound, nil)
		return
	}
	c.JSON(http.StatusOK, *user)
}

// Handler function for `/public/users/create`.
// Creates user and returns in response body if valid.
func CreateUser(c *gin.Context) {
	var request model.User
	if err := c.ShouldBindJSON(&request); err != nil {
		log.Printf("failed to create user: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := service.CreateUser(request)
	if err != nil {
		log.Printf("failed to create user: %v", err)
		var tgt *model.ValidationError
		if errors.As(err, &tgt) {
			c.JSON(http.StatusBadRequest, gin.H{"error": tgt.Message})
		} else {
			c.JSON(http.StatusInternalServerError, nil)
		}
		return
	}
	c.JSON(http.StatusCreated, *user)
}
