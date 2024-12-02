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
	X                string   `json:"x" db:"x"`
	Y                string   `json:"y" db:"y"`
	Bookable         bool     `json:"bookable" db:"bookable"`
}

func PopulateFacilities(hut *Hut) {
	hut.Facilities = strings.Split(hut.FacilitiesString, ", ")
}
