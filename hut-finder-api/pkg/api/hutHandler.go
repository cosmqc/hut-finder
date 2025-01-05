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

// Handler function for the `/public/huts/:id` endpoint.
// Gets a hut by id and returns it in the response body if found.
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

// Handler function for the `/public/huts/global/:globalId` endpoint.
// Gets a hut by global id and returns it in the response body if found.
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

func GetAllHuts(c *gin.Context) {
	huts, err := service.GetAllHuts()
	if err != nil {
		log.Printf("could not find huts: %v", err)
		c.JSON(http.StatusInternalServerError, nil)
		return
	}
	c.JSON(http.StatusOK, huts)
}
