package main

import (
	"log"
	"net/http"

	"github.com/spf13/viper"
)

func init() {
	viper.AutomaticEnv()
	viper.BindEnv("PORT")
	viper.BindEnv("STATIC")
	viper.SetDefault("PORT", ":8080")
	viper.SetDefault("STATIC", "/etc/static")
}

func main() {
	http.Handle("/", http.FileServer(http.Dir(viper.GetString("STATIC"))))
	log.Printf("Server listening on %v (static: %v)", viper.GetString("PORT"), viper.GetString("STATIC"))
	log.Fatal(http.ListenAndServe(viper.GetString("PORT"), nil))
}
