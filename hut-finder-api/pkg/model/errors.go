/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package model

import (
	"fmt"
)

// Implements base error interface so that we can treat these differently,
// i.e. return 400s for validation.
type ValidationError struct {
	Message string
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("validation error: %s", e.Message)
}
