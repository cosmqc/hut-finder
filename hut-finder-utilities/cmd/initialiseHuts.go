/*
Copyright © 2024 Yunu Cho yunu121@gmail.com
*/
package cmd

import (
	"bufio"
	"context"
	"fmt"
	"os"
	"strings"
	"syscall"

	"github.com/gocarina/gocsv"
	"github.com/jackc/pgx/v5"
	"github.com/spf13/cobra"
	"golang.org/x/term"
)

type Hut struct {
	GlobalId   string `csv:"GlobalID"`
	Name       string `csv:"Name of site"`
	Location   string `csv:"Place"`
	Region     string `csv:"Region"`
	ImageUrl   string `csv:"URL to thumbnail"`
	HutUrl     string `csv:"URL to webpage"`
	Facilities string `csv:"Facilities"`
	X          string `csv:"x"`
	Y          string `csv:"y"`
	Bookable   string `csv:"Bookable"`
}

func handleErr(e error) {
	if e != nil {
		panic(e)
	}
}

func initialiseDatabaseConnection(reader *bufio.Reader) *pgx.Conn {
	fmt.Println("Database Connection")
	fmt.Print("    Please enter the name of your database, or leave blank for the default (hut-finder): ")
	dbName, err := reader.ReadString('\n')
	handleErr(err)
	if strings.TrimSpace(dbName) == "" {
		dbName = "hut-finder"
	}
	fmt.Print("    Please enter the hostname, or leave blank for the default (localhost): ")
	hostname, err := reader.ReadString('\n')
	handleErr(err)
	if strings.TrimSpace(hostname) == "" {
		hostname = "localhost"
	}

	fmt.Print("    Please enter your username (for the database user): ")
	username, err := reader.ReadString('\n')
	handleErr(err)

	fmt.Print("    Please enter your password: ")
	bytes, err := term.ReadPassword(int(syscall.Stdin))
	handleErr(err)
	fmt.Println()
	var url string = fmt.Sprintf("postgres://%s/%s?user=%s&password=%s",
		strings.TrimSpace(hostname),
		strings.TrimSpace(dbName),
		strings.TrimSpace(username),
		string(bytes))
	conn, err := pgx.Connect(context.Background(), url)
	handleErr(err)
	return conn
}

func initialiseHutData() {
	reader := bufio.NewReader(os.Stdin)
	conn := initialiseDatabaseConnection(reader)
	defer conn.Close(context.Background())
	fmt.Println("Load huts into database")
	fmt.Print("Please provide the full path of the csv file: ")
	path, err := reader.ReadString('\n')
	fmt.Println(path)
	handleErr(err)
	file, err := os.OpenFile(strings.TrimSpace(path), os.O_RDONLY, os.ModePerm)
	handleErr(err)
	defer file.Close()

	huts := []*Hut{}

	handleErr(gocsv.UnmarshalFile(file, &huts))
	query :=
		`INSERT INTO hut 
		(global_id, name, location, region, image_url, hut_url, facilities, x, y, bookable) 
	VALUES 
		(@GlobalId, @Name, @Location, @Region, @ImageUrl, @HutUrl, @Facilities, @X, @Y, @Bookable)`
	batch := &pgx.Batch{}
	for _, hut := range huts {
		args := pgx.NamedArgs{
			"GlobalId":   hut.GlobalId,
			"Name":       hut.Name,
			"Location":   hut.Location,
			"Region":     hut.Region,
			"ImageUrl":   hut.ImageUrl,
			"HutUrl":     hut.HutUrl,
			"Facilities": hut.Facilities,
			"X":          hut.X,
			"Y":          hut.Y,
			"Bookable":   hut.Bookable,
		}
		batch.Queue(query, args)
	}
	results := conn.SendBatch(context.Background(), batch)
	successfulInserts := 0
	failedInserts := 0

	for i := 0; i < len(huts); i++ {
		_, err := results.Exec()
		if err != nil {
			fmt.Printf("Error executing query for hut %d: %v\n", i, err)
			failedInserts++
		} else {
			fmt.Printf("Successfully inserted hut %d\n", i)
			successfulInserts++
		}
	}

	fmt.Printf("\nTotal successful inserts: %d\n", successfulInserts)
	fmt.Printf("Total failed inserts: %d\n", failedInserts)
	defer results.Close()
}

// initialiseHutsCmd represents the initialiseHuts command
var initialiseHutsCmd = &cobra.Command{
	Use:   "initialiseHuts",
	Short: "The 'initialiseHuts' subcomamnd initialises hut data into a database",
	Long: `The 'initialiseHuts' subcommand initialises hut data into a database.

Data is passed in as a csv file, and is inserted into a PostgreSQL database.`,
	Run: func(cmd *cobra.Command, args []string) {
		initialiseHutData()
	},
}

func init() {
	rootCmd.AddCommand(initialiseHutsCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// initialiseHutsCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// initialiseHutsCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
