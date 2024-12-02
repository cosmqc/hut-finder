/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package api

import (
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	r.POST("/ping", Ping)
	r.GET("/huts/:id", GetHutById)
	r.GET("/huts/global/:globalId", GetHutByGlobalId)
}
