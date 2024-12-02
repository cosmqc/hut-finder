/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package model

import (
	"time"
)

type Ping struct {
	Message   string    `json:"message"`
	Timestamp time.Time `json:"timestamp,omitempty"`
}

func (p Ping) CreateResponse() Ping {
	return Ping{Message: p.Message, Timestamp: time.Now()}
}
