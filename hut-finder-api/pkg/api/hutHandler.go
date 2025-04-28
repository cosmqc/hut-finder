/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package api

import (
	"hut-finder-api/pkg/service"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetHutById Handler function for the `/public/huts/:id` endpoint.
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

// GetHutByGlobalId Handler function for the `/public/huts/global/:globalId` endpoint.
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

// GetAllHuts Handler function for the `/public/huts` endpoint.
// Gets all huts, and applies filters if any exist.
func GetAllHuts(c *gin.Context) {
	query := c.DefaultQuery("query", "")
	sortMethod := c.DefaultQuery("sortMethod", "ALPHABETICAL_ASC")
	var categories []int
	if categoryParams, ok := c.GetQueryArray("categories[]"); ok {
		categories = make([]int, 0)
		for _, i := range categoryParams {
			j, err := strconv.Atoi(i)
			if err != nil {
				log.Printf("could not parse category: %v", err)
				c.JSON(http.StatusBadRequest, nil)
			}
			categories = append(categories, j)
		}
	}

	searchResult, err := service.GetAllHuts(query, categories, sortMethod)
	if err != nil {
		log.Printf("could not find huts: %v", err)
		c.JSON(http.StatusInternalServerError, nil)
		return
	}
	deref := *searchResult
	c.JSON(http.StatusOK, deref)
}
