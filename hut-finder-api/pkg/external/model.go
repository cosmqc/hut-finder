package external

type ApiHut struct {
	Description   string   `json:"introduction"`
	Image         string   `json:"staticLink"`
	Facilities    []string `json:"facilities"`
	Status        string   `json:"status"`
	NumberOfBunks int      `json:"numberOfBunks"`
}
