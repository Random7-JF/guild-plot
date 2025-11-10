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
	// 2. Set up the static file server
	//    a. Create a file server that serves content from the "static" directory.
	staticFileServer := http.FileServer(http.Dir("./static"))

	//    b. Use PathPrefix to match all requests starting with "/static/"
	//       Then, wrap the file server with http.StripPrefix.
	//       This removes "/static/" from the request path before passing it to the file server.
	//       For example, a request for "/static/css/style.css" becomes "/css/style.css"
	//       for the FileServer, which correctly finds "static/css/style.css".
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", staticFileServer))

	log.Println("Server starting on http://localhost:8080")
	err := http.ListenAndServe(":8080", r)
	if err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
