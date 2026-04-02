package external

type ApiHut struct {
	Description   string   `json:"introduction"`
	Image         string   `json:"staticLink"`
	Facilities    []string `json:"facilities"`
	Status        string   `json:"status"`
	NumberOfBunks int      `json:"numberOfBunks"`
}

type ApiAlert struct {
	Id              string `json:"id"`
	Summary         string `json:"summary"`
	Description     string `json:"description"`
	DescriptionHtml string `json:"descriptionHtml"`
	StartDate       string `json:"startDate"`
	EndDate         string `json:"endDate"`
	LastUpdated     string `json:"lastUpdated"`
	Regions         []struct {
		Id   string `json:"id"`
		Name string `json:"name"`
	} `json:"regions"`
}
