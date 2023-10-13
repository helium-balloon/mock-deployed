# Mock

### Megan Ball (meball) and Rachel Brooks (rdbrooks)

### Github Link: https://github.com/cs0320-f23/mock-meball-rdbrooks

### Estimated Time: 13 hours

#### We used the Gear Up Code as starter code for this sprint

# Design Choices

In our program, we created a separate file for each React component. App is the highest level component which creates the REPL component and header of the program. Next the REPL component contains REPL History and REPL Input. REPL also handles the state of the history, mode, and data since both the REPLHistory and REPLInput components need access to these. REPL Input Handles the queries sent by the user to set the data, history, and mode. This is done in input so that the state change can occur before we do other computations based on the state in REPL History. REPL History handles the display of the history and uses the history, mode, and data that was set in REPL Input. Handling the display is done through formatting our output into a HTML table.

We utilized dependency injections via states through mode, data, and history. These three states needed to be accessed by REPL Input and REPL History, so the states were created in REPL and we used props to allows access to them. Since REPLHistory should not be changing the value of the history, mode, or data, we made the deliberate choice for the props to not include setters. In REPL Input, it set the history, mode, and data so that it could be used in REPL History.

For this project, we created mocked data to show how our program would work instead of re-implementing the functions of load, view, and search as we did in past Sprints. To do this, we created maps in the mocked.ts class where we map a file to a 2D array of it's contents which is what we use to create our HTML table in history and another map where we match search terms to the correct outputs.

To deal with spaces, we decided that someone could potentially search for an empty space in a file. We made sure that one of our test CSVs had this ability so we could test it. In our program if you enter "search " it will search for
" " in the file whereas if you type "search", this will be an invalid input. This ensures that empty strings will be taken into account.

For packaging, the components subdirectory contains all the React components for the project. The styles subdirectory contains the CSS files. index.tsx contains renders the root by loading the App.tsx file when the index.html file is fetched. The tests subdirectory contains the Playwright test suite for our mock.

# Errors/Bugs

We encountered an error with Playwright where the Firefox versions of the tests were failing because the Playwright instance of browser would not connect to local page. We found others who had this error on EdStem and were advised by TAs to comment out the code that allowed for this in playwright.config.ts

# Tests

We created Playwright tests for the behavior of our front end web app.

- We tested different shapes of command and results.

  - For example, we tested search where there's no found output, if there's an empty string, if there are two rows that are output, if there's one row output, and different variations of these where we use a index column, header column, or no column identification.

- We tested from different reachable states
  - Mode: We tested how our mock changes from verbose to brief and vice versa while calling different functions such as load, search, and view
  - Load: We tested how the different functions of our mock work together. For example, we tested load view load view to ensure that when we load a new file, it is loaded instead of the old file.

# How to use Mock

Load the server by typing npm start and write these commands:

### How to Change Modes

There are two modes in this mock, verbose mode and brief mode. In brief mode, whenever a command runs, only the output is displayed. In verbose mode, whenever a command runs, the command and output is displayed. To change modes type mode in the command box.

### Load a CSV

In order to load a CSV, you will need to have a valid filepath for a file located in the data folder in the CSV folder for security. In the command box type "load_file FILEPATH" where filename is the filepath of the CSV file. In this mock, only two filepaths are valid, data/stars/ten-star.csv and data/food/food_data.csv. All other filepaths will be denoted as not valid.

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

# How to setup and run

Once cloned:

### Setup Mock from root directory

`cd mock` — Change into the `mock` directory

`npm install` — Installs node_modules folder for dependencies

`npx install playwright` — Installs everything needed to run PlayWright

### Running Mock

`npm start` — This starts a local server that compiles the code in real time.

### Running tests witih Playwright

`npx playwright test` — Runs tests

`npx playwright show-report` — Shows a code breakdown of test progressions

`npx playwright test --ui`— Opens a UI that allows you to watch and trace your (failing) tests live in a browser

`npx playwright codegen <url>` — Opens a URL and generates tests with locators for elements on the page.
