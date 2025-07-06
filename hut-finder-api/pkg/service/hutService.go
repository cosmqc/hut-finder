/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package service

import (
	"fmt"
	"hut-finder-api/pkg/external"
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
	return addHutDetails(hut), nil
}

// GetHutByGlobalId Gets hut by global id.
func GetHutByGlobalId(globalId string) (*model.Hut, error) {
	hut, err := repository.GetHutByGlobalId(strings.TrimSpace(globalId))
	if err != nil {
		log.Printf("repository threw error: %v", err)
		return nil, fmt.Errorf("repository threw error: %w", err)
	}
	return addHutDetails(hut), nil
}

// GetAllHuts Gets all huts.
func GetAllHuts(query string, categories []int, sortMethod string, regions []string) (*model.HutSearchResult, error) {
	huts, err := repository.GetAllHuts(query, categories, sortMethod, regions)
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

	regions, err := repository.GetHutRegions()
	if err != nil {
		log.Printf("failed to get hut regions: %v", err)
		return &model.HutSearchResult{
			Results:    result,
			Categories: categories,
			Regions:    []model.Region{},
		}
	}
	return &model.HutSearchResult{
		Results:    result,
		Categories: categories,
		Regions:    regions,
	}
}

func addHutDetails(hut *model.Hut) *model.Hut {
	res, err := external.GetHutDetails(hut.ExternalId)
	if err != nil {
		log.Printf("failed to get hut details: %v", err)
		return hut
	}
	hut.Facilities = res.Facilities
	hut.Description = res.Description
	hut.NumberOfBunks = res.NumberOfBunks
	hut.Status = res.Status
	return addHutAlerts(hut)
}

func addHutAlerts(hut *model.Hut) *model.Hut {
	res, err := external.GetRegionalAlerts(hut.RegionId)
	if err != nil {
		log.Printf("failed to get alerts: %v", err)
		return hut
	}
	hut.Alerts = res
	return hut
}
