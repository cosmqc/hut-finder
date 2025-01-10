/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package api

import (
	"hut-finder-api/pkg/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Handler function for the `/public/ping` endpoint.
// Really only used for test purposes.
func Ping(c *gin.Context) {
	var ping model.Ping
	if err := c.BindJSON(&ping); err != nil {
		c.JSON(http.StatusBadRequest, nil)
		return
	}
	c.JSON(http.StatusOK, ping.CreateResponse())

}
