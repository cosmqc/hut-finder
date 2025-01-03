package util

import (
	"fmt"
	"hut-finder-api/pkg/model"
	"hut-finder-api/pkg/repository"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func GetUserFromTokenString(tokenString string) (*model.User, error) {
	var userRef *model.User = nil
	_, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		username := token.Claims.(jwt.MapClaims)["sub"].(string)
		user, err := repository.GetUserByUsername(username)
		if err != nil {
			return nil, fmt.Errorf("unexpected error: %v", err)
		}
		userRef = user

		hmacSampleSecret := []byte(os.Getenv("KEY"))
		return hmacSampleSecret, nil
	})
	return userRef, err
}

func Parse(session *model.Session) (*jwt.Token, error) {
	return jwt.Parse(session.TokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		username := token.Claims.(jwt.MapClaims)["sub"].(string)
		user, err := repository.GetUserByUsername(username)
		if err != nil {
			return nil, fmt.Errorf("unexpected error: %v", err)
		}
		if user.Id != session.UserId {
			return nil, fmt.Errorf("user id does not match session user id")
		}
		hmacSampleSecret := []byte(os.Getenv("KEY"))
		return hmacSampleSecret, nil
	})
}

func CreateToken(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"iss": "hut-finder",
			"sub": username,
			"exp": time.Now().Add(time.Hour * 12).Unix(),
		})
	return token.SignedString([]byte(os.Getenv("KEY")))
}
