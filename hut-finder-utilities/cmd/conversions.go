/*
Copyright © 2024 Yunu Cho yunu121@gmail.com, Jake Dalton cqsmico7@gmail.com
*/

package cmd

import (
	"math"
	"strconv"
	"strings"
)

func NZTMStringtoLatLon(x, y string) (lat, lon float64) {
	floatX, _ := strconv.ParseFloat(strings.TrimSpace(x), 64)
	floatY, _ := strconv.ParseFloat(strings.TrimSpace(y), 64)
	return NZTMtoLatLon(floatX, floatY)
}

// This applies for NZ (x,y) values only -- will need changes for other places.
func NZTMtoLatLon(x, y float64) (lat, lon float64) {
	// NZTM projection parameters
	const a = 6378137.0           // semi-major axis of ellipsoid (GRS80)
	const f = 1.0 / 298.257222101 // flattening of ellipsoid
	const lon0 = 173.0            // central meridian (degrees)
	const k0 = 0.9996             // scale factor
	const falseEasting = 1600000.0
	const falseNorthing = 10000000.0

	// Derived constants
	const e2 = f * (2 - f) // eccentricity squared
	const n = f / (2 - f)  // third flattening
	const n2 = n * n
	const n3 = n * n2

	// Remove false easting and northing
	x = x - falseEasting
	y = y - falseNorthing

	// Reverse the Transverse Mercator projection
	meridianDist := y / k0

	// Footprint latitude calculation
	mu := meridianDist / (a * (1 - e2/4 - 3*e2*e2/64 - 5*e2*e2*e2/256))

	// Latitude calculation
	phi1 := mu +
		(3*n/2-27*n3/32)*math.Sin(2*mu) +
		(21*n2/16-55*n2*n2/32)*math.Sin(4*mu) +
		(151*n3/96)*math.Sin(6*mu)

	// Longitude calculation
	x = x / (a * k0)
	lon = lon0 + math.Atan(math.Sinh(x)/math.Cos(phi1))*180/math.Pi

	// Convert latitude to degrees
	lat = phi1 * 180 / math.Pi

	return lat, lon
}
