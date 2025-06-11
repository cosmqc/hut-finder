package external

import (
	"bytes"
	"encoding/json"
	"fmt"
	"hut-finder-api/pkg/config"
	"io"
	"log"
	"net/http"
)

var (
	client  *http.Client
	baseUrl string
	apiKey  string
)

func NewClient() {
	client = &http.Client{}
	baseUrl = config.GetExternalApiBaseUrl()
	apiKey = config.GetExternalApiKey()
}

const (
	hutDetailPath = "huts/%d/detail"
	headerAPIKey  = "x-api-key"
)

func buildHutDetailsURL(id uint32) string {
	return baseUrl + fmt.Sprintf(hutDetailPath, id)
}

func GetHutDetails(id uint32) (ApiHut, error) {
	url := buildHutDetailsURL(id)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return ApiHut{}, fmt.Errorf("failed to create request: %w", err)
	}
	req.Header.Add(headerAPIKey, apiKey)

	response, err := client.Do(req)
	if err != nil {
		return ApiHut{}, fmt.Errorf("failed to request api: %w", err)
	}
	defer closeResponseBody(response.Body)

	if response.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(response.Body)
		return ApiHut{}, fmt.Errorf("api returned non-200 status code: %d, body: %s",
			response.StatusCode, string(bodyBytes))
	}

	return decodeHutResponse(response.Body)
}

func closeResponseBody(body io.ReadCloser) {
	if err := body.Close(); err != nil {
		log.Printf("Failed to close response body: %v", err)
	}
}

func decodeHutResponse(body io.Reader) (ApiHut, error) {
	bodyBytes, err := io.ReadAll(body)
	if err != nil {
		return ApiHut{}, fmt.Errorf("failed to read response body: %w", err)
	}

	var hutDetails ApiHut
	if err := json.NewDecoder(bytes.NewReader(bodyBytes)).Decode(&hutDetails); err != nil {
		return ApiHut{}, fmt.Errorf("failed to decode response: %w", err)
	}
	return hutDetails, nil
}
