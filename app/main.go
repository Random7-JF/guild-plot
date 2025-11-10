package main

import (
	"log"
	"net/http"

	"github.com/Random7-JF/guild-plot/handlers"
	"github.com/gorilla/mux"
)

func main() {

	r := mux.NewRouter()
	r.HandleFunc("/", handlers.Home).Methods("GET")

	log.Println("Server starting on http://localhost:8080")
	err := http.ListenAndServe(":8080", r)
	if err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
