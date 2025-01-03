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

func GetSession(tokenString string) error {
	session, err := repository.GetSession(tokenString)
	if err != nil {
		log.Printf("repository threw error: %v", err)
		return fmt.Errorf("repository threw error: %v", err)
	}
	_, err = util.Parse(session)
	if err != nil {
		log.Printf("could not parse session: %v", err)
		return fmt.Errorf("could not authorise user: %v", err)
	}
	return nil
}

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
	result, err := repository.UpsertSession(user.Id, tokenString)
	if err != nil {
		log.Printf("could not create session: %v", err)
		return "", fmt.Errorf("could not create session: %v", err)
	}
	return result, nil
}

func DeleteSession(tokenString string) error {
	user, err := util.GetUserFromTokenString(tokenString)
	if err != nil {
		log.Printf("could not get user from token: %v", err)
		return fmt.Errorf("could not get user from token: %v", err)
	}
	err = repository.DeleteSessionByUserId(user.Id)
	if err != nil {
		return fmt.Errorf("could not delete session: %v", err)
	}
	return nil
}
