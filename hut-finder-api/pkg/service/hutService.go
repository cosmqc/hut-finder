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

// createSearchResult generates a HutSearchResult object containing huts, categories, and regions.
// It retrieves hut categories and regions, defaulting to empty regions in case of retrieval failure.
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

// addHutDetails Concurrently fetches additional details and alerts fetched from external APIs.
func addHutDetails(hut *model.Hut) *model.Hut {
	detailsChannel := make(chan *external.ApiHut)
	alertsChannel := make(chan []external.ApiAlert)
	go func() {
		res, err := external.GetHutDetails(hut.ExternalId)
		if err != nil {
			log.Printf("failed to get hut details: %v", err)
			detailsChannel <- nil
			return
		}
		detailsChannel <- &res
	}()
	go func() {
		res, err := external.GetRegionalAlerts(hut.RegionId)
		if err != nil {
			log.Printf("failed to get alerts: %v", err)
			alertsChannel <- []external.ApiAlert{}
			return
		}
		alertsChannel <- res
	}()
	if details := <-detailsChannel; details != nil {
		hut.Facilities = details.Facilities
		hut.Description = details.Description
		hut.NumberOfBunks = details.NumberOfBunks
		hut.Status = details.Status
	}
	if alerts := <-alertsChannel; alerts != nil {
		hut.Alerts = alerts
	}
	return hut
}
