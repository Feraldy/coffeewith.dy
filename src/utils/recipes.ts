import { CardRecipe } from "./types";

export const cardRecipes: CardRecipe[] = [
  {
    id: "tk-sweet",
    name: "Tetsu Kasuya",
    recipeName: "4:6 Method Sweet",
    image: "tetsuKasuya.webp",
    dripper: { name: "V60", image: "v60.png" },
    description:
      "Tetsu Kasuya from Japan won the World Brewers Cup in 2016. He represented Coffee Factory in Ibaraki, Japan. Known for his 4:6 method",
    recipeVar: {
      ratio: 15,
      water: 0, 
      time: ["00:00", "00:45", "01:30", "02:15", "03:00", "03:30"],
      pour: [
        (water) => [(0.4 * water) / 2],
        (water) => [(0.4 * water) / 2],
        (water) => [(0.6 * water) / 3],
        (water) => [(0.6 * water) / 3],
        (water) => [(0.6 * water) / 3],
      ],
    },
  },
  {
    id: "jh-bettercup",
    name: "James Hoffmann",
    recipeName: "A Better 1 Cup V60",
    image: "jamesHoffmann.jpg",
    dripper: { name: "V60", image: "v60.png" },
    description:
      "Tetsu Kasuya from Japan won the World Brewers Cup in 2016. He represented Coffee Factory in Ibaraki, Japan. Known for his 4:6 method",
    recipeVar: {
      ratio: 16.7,
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
  {
    id: "custom",
    name: "Me",
    recipeName: "My Recipe",
    image: "custom.jpg",
    dripper: { name: "", image: "" },
    description:
      "Create your own recipe with custom water ratio and coffee weight.", // Updated description
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
      ], // This will be calculated later
    },
  },
];