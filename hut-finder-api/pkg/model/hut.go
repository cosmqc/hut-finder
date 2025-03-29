/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package model

import "strings"

type HutSearchResult struct {
	Results    []Hut            `json:"results"`
	Categories []HutCategoryDto `json:"categories"`
}

type Hut struct {
	Id               uint32      `json:"id" db:"id"`
	GlobalId         string      `json:"globalId" db:"global_id"`
	Name             string      `json:"name" db:"name"`
	Location         string      `json:"location" db:"location"`
	Region           string      `json:"region" db:"region"`
	ImageUrl         string      `json:"imageUrl" db:"image_url"`
	HutUrl           string      `json:"hutUrl" db:"hut_url"`
	FacilitiesString string      `json:"-" db:"facilities"`
	Facilities       []string    `json:"facilities" db:"-"`
	Lat              float64     `json:"lat" db:"lat"`
	Lon              float64     `json:"lon" db:"lon"`
	Bookable         bool        `json:"bookable" db:"bookable"`
	HutCategory      HutCategory `json:"category" db:"category"`
}

type HutCategoryDto struct {
	HutCategory HutCategory `json:"id"`
	Name        string      `json:"name"`
}

// HutCategory This enum is mapped to its ordinal in the database.
//
//	Any changes in ordering of these constants here
//	will need to be reflected in the DB.
type HutCategory int

const (
	GREAT_WALKS HutCategory = iota
	INDIVIDUALLY_PRICED
	CLUB
	SERVICED
	STANDARD
	BASIC
)

func (c HutCategory) String() string {
	return [...]string{"Great Walks", "Individually Priced", "Club / Serviced Alpine", "Serviced", "Standard", "Basic"}[c]
}

// PopulateFacilities `FacilitiesString` is stored as a comma separated string.
// We convert it into a json-friendly list.
// Note that `FacilitiesString` is omitted from the Hut struct
// upon JSON serialisation for that reason.
func PopulateFacilities(hut *Hut) {
	hut.Facilities = strings.Split(hut.FacilitiesString, ", ")
}
