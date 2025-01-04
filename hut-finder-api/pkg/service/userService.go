/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package service

import (
	"fmt"
	"hut-finder-api/pkg/model"
	"hut-finder-api/pkg/repository"
	"log"
	"strconv"
)

// Gets user by id.
func GetUserById(id string) (*model.User, error) {
	i, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		log.Printf("could not parse string param to int: %v", err)
		return nil, fmt.Errorf("could not parse string param to int: %w", err)
	}

	user, err := repository.GetUserById(i)
	if err != nil {
		log.Printf("repository threw error: %v", err)
		return nil, fmt.Errorf("repository threw error: %w", err)
	}
	return user, nil
}

// Creates a new user.
func CreateUser(user model.User) (*model.User, error) {
	if err := user.Validate(); err != nil {
		log.Printf("failed to validate user: %v", err)
		return nil, err
	}
	if err := user.HashPassword(); err != nil {
		log.Printf("could not hash password: %v", err)
		return nil, err
	}
	result, err := repository.CreateUser(user)
	if err != nil {
		log.Printf("repository threw error: %v", err)
		return nil, err
	}
	return result, nil
}
