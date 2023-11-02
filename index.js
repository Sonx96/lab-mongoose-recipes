const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"

const deleteDB = async () => {
  try {
    await Recipe.deleteMany();
  } catch (e) {
    console.log(e);
  }
};
const connection = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    const recipe = await Recipe.create({
      title: "steak",
      level: "Easy Peasy",
      ingredients: [
        "season steak generously with salt, pepper and garlic powder",
        "place in zip lock bag",
        "cook in sous vide at 120 F for 1-2 hours",
        "remove from bag and pat dry",
        "heat pan with grapeseed oil and a quarter stick of butter",
        "cook steak for 30-60 seconds per side using a spoon to baste with butter",
        "rest for 10 minutes",
        "enjoy",
      ],
      cuisine: "Student Flat",
      dishType: "main_course",
      image: "https://i.imgur.com/4h2k9MD.jpg",
      duration: 10,
      creator: "Chef LeJasac",
    });
    console.log(recipe);
    const printAllRecipes = await Recipe.insertMany(data);
    printAllRecipes.forEach((eachRecipe) => {
      console.log(eachRecipe.title);
    });
    const updateRecipe = await Recipe.findOneAndUpdate(
      {
        title: "Rigatoni alla Genovese",
      },
      {
        duration: 100,
      },
      {
        new: true,
      }
    );
    console.log(updateRecipe);
  } catch (err) {
    console.log(err);
  }
};
deleteDB();
connection();
