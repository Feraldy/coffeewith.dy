import { CardRecipe } from "./types";

export const cardRecipes: CardRecipe[] = [
  {
    id: "tk-sweet",
    name: "Tetsu Kasuya",
    recipeName: "4:6 Method (Sweetness)",
    image: "tetsuKasuya.webp",
    dripper: { name: "V60", image: "v60.png" },
    description:
      "a revolutionary hand-drip formula invented by Tetsu Kasuya that won him the coveted title as the 2016 World Brewers Cup Champion. The method gets its name by how the hot water is divided during the pouring stages—40% and 60%—which allows you to adjust the flavor and concentration of the coffee.",
    recipeVar: {
      ratio: 15,
      water: 0, 
      time: ["00:00", "00:45", "01:30", "02:15", "03:00", "03:30"],
      pour: [
        (water) => [Math.round((0.4 * water)*0.42)],
        (water) => [(0.4 * water) - Math.round((0.4 * water)*0.42)],
        (water) => [(0.6 * water) / 3],
        (water) => [(0.6 * water) / 3],
        (water) => [(0.6 * water) / 3],
      ],
    },
    learnMore: "https://youtu.be/wmCW8xSWGZY"
  },
  {
    id: "tk-balance",
    name: "Tetsu Kasuya",
    recipeName: "4:6 Method (Balance)",
    image: "tetsuKasuya.webp",
    dripper: { name: "V60", image: "v60.png" },
    description:
      "a revolutionary hand-drip formula invented by Tetsu Kasuya that won him the coveted title as the 2016 World Brewers Cup Champion. The method gets its name by how the hot water is divided during the pouring stages—40% and 60%—which allows you to adjust the flavor and concentration of the coffee.",
    recipeVar: {
      ratio: 15,
      water: 0, 
      time: ["00:00", "00:45", "01:30", "02:15", "03:00", "03:30"],
      pour: [
        (water) => [(0.4 * water)/2],
        (water) => [(0.4 * water)/2],
        (water) => [(0.6 * water) / 3],
        (water) => [(0.6 * water) / 3],
        (water) => [(0.6 * water) / 3],
      ],
    },
    learnMore: "https://youtu.be/wmCW8xSWGZY"
  },
  {
    id: "tk-acidity",
    name: "Tetsu Kasuya",
    recipeName: "4:6 Method (Acidity)",
    image: "tetsuKasuya.webp",
    dripper: { name: "V60", image: "v60.png" },
    description:
      "a revolutionary hand-drip formula invented by Tetsu Kasuya that won him the coveted title as the 2016 World Brewers Cup Champion. The method gets its name by how the hot water is divided during the pouring stages—40% and 60%—which allows you to adjust the flavor and concentration of the coffee.",
    recipeVar: {
      ratio: 15,
      water: 0, 
      time: ["00:00", "00:45", "01:30", "02:15", "03:00", "03:30"],
      pour: [
        (water) => [(0.4 * water) - Math.round((0.4 * water)*0.42)],
        (water) => [Math.round((0.4 * water)*0.42)],
        (water) => [(0.6 * water) / 3],
        (water) => [(0.6 * water) / 3],
        (water) => [(0.6 * water) / 3],
      ],
    },
    learnMore: "https://youtu.be/wmCW8xSWGZY"
  },
  {
    id: "jh-bettercup",
    name: "James Hoffmann",
    recipeName: "A Better 1 Cup V60",
    image: "jamesHoffmann.jpg",
    dripper: { name: "V60", image: "v60.png" },
    description:
      "James Hoffmann is a really well-known coffee expert. This V60 technique is his updated approach to brewing a single cup. He simplified his original method to make it easier to get consistently great results. It involves a series of small pours with short pauses in between.",
    recipeVar: {
      ratio: 16.67,
      water: 0, 
      time: ["00:00", "00:45", "01:10", "01:30", "01:50", "03:00"],
      pour: [
        (water) => [water / 5],
        (water) => [water / 5],
        (water) => [water / 5],
        (water) => [water / 5],
        (water) => [water / 5],
      ],
    },
  },
  {
    id: "mw-5pour",
    name: "Matt Winton",
    recipeName: "The V60 Five Pour",
    image: "mattWinton.webp",
    dripper: { name: "V60", image: "v60.png" },
    description:
      "A winning recipe from the 2021 World Brewers Cup champion, Matt Winton. Unlike the usual V60 brewing, this beverage involves pouring water in five batches. The resulting drink is a clear and bright cup of coffee with low acidity that delivers an even extraction of all the flavors from each grind particle.",
    recipeVar: {
      ratio: 15,
      water: 0, 
      time: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30"],
      pour: [
        (water) => [water / 5],
        (water) => [water / 5],
        (water) => [water / 5],
        (water) => [water / 5],
        (water) => [water / 5],
      ],
    },
  },
  {
    id: "custom",
    name: "Me",
    recipeName: "My Recipe",
    image: "custom.jpg",
    dripper: { name: "", image: "" },
    description:
      "Unleash your inner barista and embark on a personalized coffee adventure! Experiment with different water ratios and coffee weights to unlock a world of flavors tailored precisely to your preferences. Craft a coffee experience that is truly your own, and savor the satisfaction of a perfectly customized cup.",
    recipeVar: {
      ratio: 10,
      water: 0, 
      time: ["00:00", "00:45", "01:10", "01:30", "01:50", "02:30"],
      pour: [
        (water) => [water / 5],
        (water) => [water / 5],
        (water) => [water / 5],
        (water) => [water / 5],
        (water) => [water / 5],
      ],
    },
  },
];