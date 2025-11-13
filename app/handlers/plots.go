package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/Random7-JF/guild-plot/db"
)

func Plots(w http.ResponseWriter, r *http.Request) {
	// Set the Content-Type header to application/json
	w.Header().Set("Content-Type", "application/json")

	// Encode the struct to JSON and write it to the response body
	if err := json.NewEncoder(w).Encode(db.GetAllPlots()); err != nil {
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
		log.Printf("Error encoding JSON: %v", err)
	}
}
