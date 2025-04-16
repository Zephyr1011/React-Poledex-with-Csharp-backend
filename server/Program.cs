using System.Text.Json;
using Server.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.ObjectPool;
using System.Security.Cryptography.X509Certificates;

public class Program 
{
    public static void Main(string[] args)
    {
        // builder is a object that is used to build the "app" object. iss little weird but it is what it is.
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
        //add cors middleware to the app
        builder.Services.AddCors(options => {
            options.AddPolicy(name: "AllowAllOrigins", policy => { policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader(); });
        });


        // 👇what is this similar to?
        var app = builder.Build(); 
        app.UseCors("AllowAllOrigins");


        // 👇what is this similar to?
        app.MapGet("/random_joke", () => {
            
            //read the content of the json file into our program and save to a string variable
            string jsonString = File.ReadAllText("./Jokes.json");

            // convert the json string into a list (array) of Joke objects. The process of converting a json string into a list of objects is called "Deserialization"
            List<Joke> jokesArray = JsonSerializer.Deserialize<List<Joke>>(jsonString);

            // generate a random index to select a random joke from the list of jokes
            int randomIndex = new Random().Next(0, jokesArray.Count);

            // PART 1: fix the bug in the code below
            Joke randomJoke = jokesArray[randomIndex];

            //return the random joke. any object that is returned from a route function will be automatically converted to json format
            return randomJoke;
        });


        app.MapGet("/pokemon", () => {
            // PART 2

            //read the content of the json file into our program and save to a string variable
            string jsonString = File.ReadAllText("./Pokemon.json");
            // convert the json string into a list (array) of Pokemon objects. The process of converting a json string into a list of objects is called "Deserialization"
            List<Pokemon> pokemonArray = JsonSerializer.Deserialize<List<Pokemon>>(jsonString);

            //select 6 random pokemon from the list of pokemon
            Pokemon[] randomTeam = new Pokemon[6];
            for (int i = 0; i < 6; i++)
            {
                int randomIndex = new Random().Next(0, pokemonArray.Count);
                Pokemon pokemonTeam = pokemonArray[randomIndex];
                randomTeam[i] = pokemonTeam;
            }
            
            
            
            //return the random pokemon. any object (or array of objects) that is returned from a route function will be automatically converted to json format
            return randomTeam;

        });


        


        // 👇what is this similar to?
        app.Run();
    }


}