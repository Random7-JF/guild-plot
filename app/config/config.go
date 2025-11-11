package config

import "github.com/Random7-JF/guild-plot/models"

type App struct {
	Port string
	Plots []models.Plot
}
