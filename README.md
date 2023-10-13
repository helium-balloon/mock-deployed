# Mock

### Megan Ball (meball) and Rachel Brooks (rdbrooks)

### Github Link: https://github.com/cs0320-f23/mock-meball-rdbrooks

### Estimated Time: 15 hours

# Design Choices

How we dealt with spaces

using states for mode and data

# Errors/Bugs

We encountered an error with Playwright where the Firefox versions of the tests were failing because Playwright instance of browser will not connect to local page. We found others who had this error on EdStem and were advised by TAs to comment out the code that allowed for this in playwright.config.ts

# Tests

We created Playwright tests for the behavior of our front end web app.

- We tested different shapes of command and results.

  - For example, we tested search where there's no found output, if there's an empty string, if there are two rows that are output, if there's one row output, and different variations of these where we use a index column, header column, or no column identification.

- We tested from different reachable states
  - Mode: We tested how our mock changes from verbose to brief and vice versa while calling different functions such as load, search, and view
  - Load: We tested how the different functions of our mock work together. For example, we tested load view load view to ensure that when we load a new file, it is loaded instead of the old file.

# How to use Mock

### How to Change Modes

There are two modes in this mock, verbose mode and brief mode. In brief mode, whenever a command rune, only the output is displayed. In verbose mode, whenever a command runs, the command and output is displayed. To change modes, load the server by using npm start, then type mode in the command box.

### Load a CSV

In order to load a CSV, you will need to have a valid filepath for a file located in the data folder in the CSV folder for security. Load the server by typing npm start. In the command box type "load_file FILEPATH" where filename is the filepath of the CSV file. In this mock, only two filepaths are valid, data/stars/ten-star.csv and data/food/food_data.csv. All other filepaths will be denoted as not valid.

Example: load_file data/stars/ten-star.csv

### View a CSV

In order to view a CSV, you need to have already loaded the CSV you want to view. See above to load a CSV. Once you have loaded the CSV, type "view" in the command box and click submit. The CSV will print onto the screen as a table.

Example: view

### Search a CSV

In order to search a CSV, you need to have already loaded the CSV you want to search. See above to load a CSV. Once you have loaded the CSV, type "search COL VALUE" in the command box and click submit. COL is the column index or name that you want to search. VALUE is the search term you want to find. This command will print out the rows that contain your search value.

Example: search 0 Sol

For this mock, there are only specific search terms that will work including:

- 1 Sol
- ProperName Sol
- Sol
- 0 Sol
- StarID Sol
- " " (empty string for stars.csv)
- strawberry
- 0 strawberry
- pineapple
