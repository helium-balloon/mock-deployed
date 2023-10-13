// This file contains all of our mocked data to mimic what the backend returns

// csv with headers
// filepath: data/stars/ten-star.csv
const star_CSV = [
  ["StarID", "ProperName", "X", "Y", "Z"],
  ["0", "Sol", "0", "0", "0"],
  ["1", "", "282.43485", "0.00449", "5.36884"],
  ["2", "", "43.04329", "0.00285", "-15.24144"],
  ["3", "", "277.11358", "0.02422", "223.27753"],
  ["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"],
  ["70667", "Proxima Centauri", "-0.47175", "-0.36132", "-1.15037"],
  ["71454", "Rigel Kentaurus B", "-0.50359", "-0.42128", "-1.1767"],
  ["71457", "Rigel Kentaurus A", "-0.50362", "-0.42139", "-1.17665"],
  ["87666", "Barnard's Star", "-0.01729", "-1.81533", "0.14824"],
  ["118721", "", "-2.28262", "0.64697", "0.29354"],
];

// csv with no headers
// filepath: data/food/food_data.csv
const food_CSV = [
  ["strawberry", "blueberry", "watermelon", "raspberry", "cherry"],
  ["mushroom", "cucumber", "spinach", "lettuce", "eggplant"],
  ["pasta", "pizza", "burger", "fries", "sandwich"],
  ["chocolate", "vanilla", "cookie dough", "strawberry", "cherry"],
];

// map of filepath to above arrays (used for load command)
export let filepath_to_CSV = new Map<string, string[][]>();
filepath_to_CSV.set("data/stars/ten-star.csv", star_CSV);
filepath_to_CSV.set("data/food/food_data.csv", food_CSV);

/**
 * Maps commands to outputs for search. We had to add the filepath to
 * the key so we know which data to search. In the frontend, our code
 * extracts the identifier and/or target and then adds the filepath
 * to this search information when calling the map.
 */
export let search_to_output = new Map<string, string[][]>([
  ["data/stars/ten-star.csv 1 Sol", [["0", "Sol", "0", "0", "0"]]],
  ["data/stars/ten-star.csv ProperName Sol", [["0", "Sol", "0", "0", "0"]]],
  ["data/stars/ten-star.csv Sol", [["0", "Sol", "0", "0", "0"]]],
  ["data/stars/ten-star.csv 0 Sol", [["No rows that match your search"]]],
  ["data/stars/ten-star.csv StarID Sol", [["No rows that match your search"]]],
  [
    // searches for empty string within ten star data
    "data/stars/ten-star.csv ",
    [
      ["1", "", "282.43485", "0.00449", "5.36884"],
      ["2", "", "43.04329", "0.00285", "-15.24144"],
      ["3", "", "277.11358", "0.02422", "223.27753"],
    ],
  ],
  [
    "data/food/food_data.csv strawberry",
    [
      ["strawberry", "blueberry", "watermelon", "raspberry", "cherry"],
      ["chocolate", "vanilla", "cookie dough", "strawberry", "cherry"],
    ],
  ],
  [
    "data/food/food_data.csv 0 strawberry",
    [["strawberry", "blueberry", "watermelon", "raspberry", "cherry"]],
  ],
  ["data/food/food_data.csv ", [["No rows that match your search"]]],
  ["data/food/food_data.csv pineapple", [["No rows that match your search"]]],
]);
