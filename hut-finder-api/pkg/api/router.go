/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package api

import (
	"hut-finder-api/pkg/middleware"

	"github.com/gin-gonic/gin"
)

func CreateServer() *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	registerUnauthorisedRoutes(r)
	registerAuthorisedRoutes(r)
	return r
}

func registerUnauthorisedRoutes(r *gin.Engine) {
	public := r.Group("/public")
	{
		public.POST("/ping", Ping)
		public.GET("/huts/:id", GetHutById)
		public.GET("/huts/global/:globalId", GetHutByGlobalId)
		public.GET("/users/:id", GetUserById)
		public.POST("/users/create", CreateUser)
		public.POST("/login", CreateSession)
	}
}

func registerAuthorisedRoutes(r *gin.Engine) {
	protected := r.Group("/protected")
	protected.Use(middleware.JwtMiddleware())
	{
		protected.POST("/logout")
	}
}
