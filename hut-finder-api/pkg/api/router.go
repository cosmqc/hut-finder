/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package api

import (
	"hut-finder-api/pkg/middleware"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Creates and returns the server with additional configurations.
func CreateServer() *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	configureCors(r)
	registerUnauthorisedRoutes(r)
	registerAuthorisedRoutes(r)
	return r
}

// Registers routes that don't require authentication.
func registerUnauthorisedRoutes(r *gin.Engine) {
	public := r.Group("/public")
	{
		public.POST("/ping", Ping)
		public.GET("/huts/:id", GetHutById)
		public.GET("/huts", GetAllHuts)
		public.GET("/huts/global/:globalId", GetHutByGlobalId)
		public.POST("/users/create", CreateUser)
		public.POST("/login", Login)
	}
}

// Registers routes that require authentication.
func registerAuthorisedRoutes(r *gin.Engine) {
	protected := r.Group("/protected")
	protected.Use(middleware.JwtMiddleware())
	{
		protected.GET("/users/:id", GetUserById)
		protected.POST("/logout", Logout)
	}
}

func configureCors(r *gin.Engine) {
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
}
