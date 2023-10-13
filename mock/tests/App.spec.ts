import { test, expect } from "@playwright/test";

test("on page load, i see an input bar", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByRole("button")).toBeVisible();
});

test("after I click the button with an invalid input, it loads an error message", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("output")).toContainText(
    "ERROR: invalid input in command box"
  );
});

test("after I submit a correct load command, it loads a success output", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file data/stars/ten-star.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("output")).toContainText("Data loaded");
  // this getting table ensures that the table we created is showing up when we output something
  await expect(page.getByLabel("table")).toBeVisible();
});

test("after I load and submit view, it loads the inputted file as a table", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file data/stars/ten-star.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("output")).toContainText("Sol");
});

test("after I load and submit search, it loads rows with my search value (no col given)", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file data/stars/ten-star.csv"); // load file
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").fill("search Sol"); // search file
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("output")).toContainText("0Sol000"); // use this because it's HTML and squishes each cell together
});

// load view load view
test("after I load and view, I can load another file and view the second file", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  //load and view first file
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file data/stars/ten-star.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  // load and view second file
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file data/food/food_data.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByLabel("output")).toContainText(
    "strawberryblueberrywatermelonraspberrycherry"
  ); // use this because it's HTML and squishes each cell together
});

test("if I submit view before load, it gives an error message", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("output")).toContainText(
    "ERROR: no data loaded so cannot view"
  );
});

test("if I submit search before load, it gives an error message", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByPlaceholder("Enter command here!").fill("search Sol");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("output")).toContainText(
    "ERROR: no data loaded so cannot search"
  );
});

test("after loading and searching, I can submit view, and it loads a table with my data", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file data/food/food_data.csv"); // load file
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").fill("search strawberry"); // search file
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").fill("view"); // view file
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("output")).toContainText(
    "pastapizzaburgerfriessandwich"
  ); // use this because it's HTML and squishes each cell together
});

test("after I load and submit search, it loads rows with my search value (col # given)", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file data/stars/ten-star.csv"); // load file
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").fill("search 1 Sol"); // search file
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("output")).toContainText("0Sol000"); // use this because it's HTML and squishes each cell together
});

test("after I load and submit search, it loads rows with my search value (col name given)", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file data/stars/ten-star.csv"); // load file
  await page.getByRole("button", { name: "Submit" }).click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search ProperName Sol"); // search file
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("output")).toContainText("0Sol000"); // use this because it's HTML and squishes each cell together
});

test("after I load and submit search, it loads rows with my search value (wrong col # given)", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file data/stars/ten-star.csv"); // load file
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").fill("search 0 Sol"); // search file
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("output")).toContainText(
    "No rows that match your search"
  );
});

test("after I load and submit search, it loads rows with my search value (wrong col name given)", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file data/stars/ten-star.csv"); // load file
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").fill("search StarID Sol"); // search file
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("output")).toContainText(
    "No rows that match your search"
  );
});

// search found in multiple rows
test("after I load and submit search, it loads multiple rows with my search value", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file data/food/food_data.csv"); // load file
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").fill("search strawberry"); // search file
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("output")).toContainText(
    "strawberryblueberrywatermelonraspberrycherrychocolatevanillacookie doughstrawberrycherry"
  );
});

test("if I don't search a value, it gives an error", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file data/food/food_data.csv"); // load file
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").fill("search"); // search file
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("output")).toContainText(
    "ERROR: invalid input in command box"
  );
});

test("if I search a value not in the csv, it gives an error", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file data/food/food_data.csv"); // load file
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").fill("search pineapple"); // search file
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("output")).toContainText(
    "No rows that match your search"
  );
});
