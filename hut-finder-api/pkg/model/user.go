/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package model

import (
	"regexp"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Id        uint32 `json:"id" db:"id"`
	Username  string `json:"username" db:"username" binding:"required"`
	FirstName string `json:"firstName" db:"first_name" binding:"required"`
	LastName  string `json:"lastName" db:"last_name" binding:"required"`
	Email     string `json:"email" db:"email" binding:"required"`
	Password  string `json:"password,omitempty" db:"password" binding:"required"`
}

// Validation methods
func (u *User) Validate() error {
	if !validateEmail(u.Email) {
		return &ValidationError{Message: "invalid email format"}
	}
	if !notWeakPassword(u.Password) {
		return &ValidationError{Message: "your password must be at least 8 characters in length, and include uppercase and lowercase letters, a number, and special character"}
	}
	return nil
}

// Validation for password. The conditions for this are:
// - > 8 characters,
// - At least one:
//   - Capital letter,
//   - Number,
//   - Special character.
func notWeakPassword(password string) bool {
	if len(password) < 8 {
		return false
	}
	match, _ := regexp.MatchString("^(.{0,7}|\\D*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$", password)
	return !match
}

// Validation for password. See RFCs 5321 and 5322.
func validateEmail(email string) bool {
	if len(email) == 0 {
		return false
	}
	match, _ := regexp.MatchString("^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$", email)
	return match
}

// Hashes password.
func (u *User) HashPassword() error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(bytes)
	return nil
}
