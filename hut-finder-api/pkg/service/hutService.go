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

// GetHutById Gets hut by id.
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

// GetHutByGlobalId Gets hut by global id.
func GetHutByGlobalId(globalId string) (*model.Hut, error) {
	hut, err := repository.GetHutByGlobalId(strings.TrimSpace(globalId))
	if err != nil {
		log.Printf("repository threw error: %v", err)
		return nil, fmt.Errorf("repository threw error: %w", err)
	}
	return hut, nil
}

// GetAllHuts Gets all huts.
func GetAllHuts(query string, categories []int, sortMethod string) (*model.HutSearchResult, error) {
	huts, err := repository.GetAllHuts(query, categories, sortMethod)
	if err != nil {
		log.Printf("repository threw error: %v", err)
		return nil, fmt.Errorf("repository threw error: %w", err)
	}

	return createSearchResult(huts), nil
}

func createSearchResult(result []model.Hut) *model.HutSearchResult {
	categories := make([]model.HutCategoryDto, 0, model.BASIC+1)

	for i := model.GREAT_WALKS; i <= model.BASIC; i++ {
		categories = append(categories, model.HutCategoryDto{
			HutCategory: i,
			Name:        i.String(),
		})
	}
	return &model.HutSearchResult{
		Results:    result,
		Categories: categories,
	}
}
