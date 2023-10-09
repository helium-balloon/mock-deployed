// headers
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

// no headers
// filepath: data/food/food_data.csv
const food_CSV = [
  ["strawberry", "blueberry", "watermelon", "raspberry", "cherry"],
  ["mushroom", "cucumber", "spinach", "lettuce", "eggplant"],
  ["pasta", "pizza", "burger", "fries", "sandwich"],
  ["chocolate", "vanilla", "cookie dough", "strawberry", "cherry"],
];

// map filepath to above arrays
let filepath_to_CSV = new Map<string, string[][]>();
filepath_to_CSV.set("data/stars/ten-star.csv", star_CSV);
filepath_to_CSV.set("data/food/food_data.csv", food_CSV);

// map commands to outputs (view and search)

let commands_to_outputs = new Map<string, Object>();
//load
// include loadCSV in map; possibly change output
commands_to_outputs.set("load_file data/stars/ten-star.csv", "success");
commands_to_outputs.set("load_file data/stars/ten-star.csv", "success");

//view
// problem; only view and we have multiple files to print
// current fix is add the name ourselves
commands_to_outputs.set("view foodCSV", food_CSV);
commands_to_outputs.set("view starCSV", star_CSV);

// search
commands_to_outputs.set("search 1 Sol", [1]);
commands_to_outputs.set("search ProperName Sol", [1]);
commands_to_outputs.set("search Sol", "1");
commands_to_outputs.set("search strawberry", [0, 3]);
commands_to_outputs.set("search 0 strawberry", [0]);
commands_to_outputs.set("search", "error: no value");
commands_to_outputs.set("search pineapple", "error: value not found");
commands_to_outputs.set("search strawberry", [0, 3]);