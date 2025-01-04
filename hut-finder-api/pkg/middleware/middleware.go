/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package middleware

import (
	"hut-finder-api/pkg/service"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Middleware authentication filter for incoming requests.
// JWTs are parsed and validated, and rejected if it cannot be parsed or fails validation.
func JwtMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.Request.Header.Get("Authorization")
		if token == "" {
			log.Printf("No token exists")
			c.JSON(http.StatusUnauthorized, gin.H{"error": "You do not have access to this endpoint."})
			c.Abort()
			return
		}
		if err := service.GetSession(token); err != nil {
			log.Printf("service threw error: %v", err)
			c.JSON(http.StatusUnauthorized, gin.H{"error": "You do not have access to this endpoint."})
			c.Abort()
			return
		}
		c.Next()
	}
}
