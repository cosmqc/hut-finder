/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/
package service

import (
	"fmt"
	"hut-finder-api/pkg/model"
	"hut-finder-api/pkg/repository"
	"log"
	"time"

	"os"

	"github.com/golang-jwt/jwt/v4"
)

func GetSession(tokenString string) error {
	session, err := repository.GetSession(tokenString)
	if err != nil {
		log.Printf("repository threw error: %v", err)
		return fmt.Errorf("repository threw error: %v", err)
	}
	err = parse(session)
	if err != nil {
		log.Printf("could not parse session: %v", err)
	}
	return nil
}

func CreateSession(username string, password string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"iss": "hut-finder",
			"sub": username,
			"exp": time.Now().Add(time.Hour * 12).Unix(),
		})
	tokenString, err := token.SignedString([]byte(os.Getenv("KEY")))
	if err != nil {
		log.Printf("could not sign session: %v", err)
		return "", fmt.Errorf("could not sign session: %v", err)
	}
	user, err := repository.GetUserByUsernameAndPassword(username, password)
	if err != nil {
		log.Printf("could not sign session: %v", err)
		return "", fmt.Errorf("could not authorise user: %v", err)
	}
	result, err := repository.CreateSession(user.Id, tokenString)
	if err != nil {
		log.Printf("could not create session: %v", err)
		return "", fmt.Errorf("could not create session: %v", err)
	}
	return result, nil
}

func DeleteSession(token string) error {
	user, err := repository.GetUserByUsername()
	repository.DeleteSession(token)
}

func validate(session *model.Session) error {
	token, err := parse(session)
	if err != nil {
		return fmt.Errorf("could not parse session: %v", err)
	}

	if !token.Valid {
		return fmt.Errorf("could not parse session: %v", err)
	}
	return nil
}

func parse(session *model.Session) (*jwt.Token, error) {
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
