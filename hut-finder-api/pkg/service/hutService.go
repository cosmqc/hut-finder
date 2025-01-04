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
	"strings"
)

// Gets hut by id.
func GetHutById(id string) (*model.Hut, error) {
	i, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		log.Printf("could not parse string param to int: %v", err)
		return nil, fmt.Errorf("could not parse string param to int: %w", err)
	}

	hut, err := repository.GetHutById(i)
	if err != nil {
		log.Printf("repository threw error: %v", err)
		return nil, fmt.Errorf("repository threw error: %w", err)
	}
	return hut, nil
}

// Gets hut by global id.
func GetHutByGlobalId(globalId string) (*model.Hut, error) {
	hut, err := repository.GetHutByGlobalId(strings.TrimSpace(globalId))
	if err != nil {
		log.Printf("repository threw error: %v", err)
		return nil, fmt.Errorf("repository threw error: %w", err)
	}
	return hut, nil
}
