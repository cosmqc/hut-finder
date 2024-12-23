/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package api

import (
	"hut-finder-api/pkg/service"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetUserById(c *gin.Context) {
	user, err := service.GetUserById(c.Param("id"))
	if err != nil {
		log.Printf("could not find user: %v", err)
		c.JSON(http.StatusNotFound, nil)
		return
	}
	userDeref := *user
	c.JSON(http.StatusOK, userDeref)
}

func CreateUser(c *gin.Context) {

}
