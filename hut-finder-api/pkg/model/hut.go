/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package model

import "strings"

type Hut struct {
	Id               uint32   `json:"id" db:"id"`
	GlobalId         string   `json:"globalId" db:"global_id"`
	Name             string   `json:"name" db:"name"`
	Location         string   `json:"location" db:"location"`
	Region           string   `json:"region" db:"region"`
	ImageUrl         string   `json:"imageUrl" db:"image_url"`
	HutUrl           string   `json:"hutUrl" db:"hut_url"`
	FacilitiesString string   `json:"-" db:"facilities"`
	Facilities       []string `json:"facilities" db:"-"`
	Lat              float64  `json:"lat" db:"lat"`
	Lon              float64  `json:"lon" db:"lon"`
	Bookable         bool     `json:"bookable" db:"bookable"`
}

// `FacilitiesString` is stored as a comma separated string.
// We convert it into a json-friendly list.
// Note that `FacilitiesString` is omitted from the Hut struct
// upon JSON serialisation for that reason.
func PopulateFacilities(hut *Hut) {
	hut.Facilities = strings.Split(hut.FacilitiesString, ", ")
}
