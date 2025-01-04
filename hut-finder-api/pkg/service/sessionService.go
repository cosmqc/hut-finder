/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/
package service

import (
	"fmt"
	"hut-finder-api/pkg/repository"
	"hut-finder-api/pkg/util"
	"log"
)

// Gets session token then validates.
// Returns nil if the token is valid, otherwise some form
// of error is returned.
func GetSession(tokenString string) error {
	session, err := repository.GetSession(tokenString)
	if err != nil {
		log.Printf("repository threw error: %v", err)
		return fmt.Errorf("repository threw error: %v", err)
	}

	_, _, err = util.Parse(session.TokenString)
	if err != nil {
		log.Printf("could not parse session: %v", err)
		return fmt.Errorf("could not authorise user: %v", err)
	}
	return nil
}

// Creates a new session. A `session` is a JWT token, which is used to
// access certain protected endpoints.
func CreateSession(username string, password string) (string, error) {
	tokenString, err := util.CreateToken(username)
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

// Deletes the given session. Returns nil if successfully deleted,
// otherwise an error of some sort is returned.
func DeleteSession(tokenString string) error {
	user, _, err := util.Parse(tokenString)
	if err != nil {
		log.Printf("could not get user from token: %v", err)
		return fmt.Errorf("could not get user from token: %v", err)
	}
	err = repository.DeleteSessionByUserIdAndToken(user.Id, tokenString)
	if err != nil {
		return fmt.Errorf("could not delete session: %v", err)
	}
	return nil
}
