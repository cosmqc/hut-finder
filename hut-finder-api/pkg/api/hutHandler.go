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

func GetHutById(c *gin.Context) {
	hut, err := service.GetHutById(c.Param("id"))
	if err != nil {
		log.Printf("could not find hut: %v", err)
		c.JSON(http.StatusNotFound, nil)
		return
	}
	hutDeref := *hut
	c.JSON(http.StatusOK, hutDeref)
}

func GetHutByGlobalId(c *gin.Context) {
	hut, err := service.GetHutByGlobalId(c.Param("globalId"))
	if err != nil {
		log.Printf("could not find hut: %v", err)
		c.JSON(http.StatusNotFound, nil)
		return
	}
	hutDeref := *hut
	c.JSON(http.StatusOK, hutDeref)
}
