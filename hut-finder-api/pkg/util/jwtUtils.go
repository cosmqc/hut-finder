/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package util

import (
	"fmt"
	"hut-finder-api/pkg/config"
	"hut-finder-api/pkg/model"
	"hut-finder-api/pkg/repository"

	"time"

	"github.com/golang-jwt/jwt/v4"
)

func Parse(tokenString string) (*model.User, *jwt.Token, error) {
	var userRef *model.User = nil
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		hmacSampleSecret := []byte(config.GetSigningKey())
		username := token.Claims.(jwt.MapClaims)["sub"].(string)
		user, err := repository.GetUserByUsername(username)
		if err != nil {
			return nil, fmt.Errorf("unexpected error: %v", err)
		}
		userRef = user

		return hmacSampleSecret, nil
	})
	if err != nil {
		return nil, nil, fmt.Errorf("could not parse token: %v", err)
	}
	return userRef, token, nil
}

func CreateToken(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"iss": "hut-finder",
			"sub": username,
			"exp": time.Now().Add(time.Hour * time.Duration(config.GetTokenExpiryHours())).Unix(),
		})
	return token.SignedString([]byte(config.GetSigningKey()))
}
