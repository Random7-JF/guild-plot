package models

type HousePlot struct {
	X, Y, PlotNumber int
	Occupied         bool
	Owner            string
}

type Plot struct {
	X          int `json:"x"`
	Y          int `json:"y"`
	PlotNumber int `json:"plotNumber"`
}
