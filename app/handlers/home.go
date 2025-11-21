package handlers

import (
	"net/http"

	"github.com/Random7-JF/guild-plot/app/components"
)

func Home(w http.ResponseWriter, r *http.Request) {
	component := components.Home("Guild Plot")
	component.Render(r.Context(), w)

}
