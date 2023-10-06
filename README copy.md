# Mock gearup materials

## `mock-vanilla` directory

This is tnphe codebase for the first part of the gearup. It has a very sparse implementation of our REPL. We'll step through it together to get used to HTML and CSS, but we will move onto the React project afterwards. To run this, right click on the `index.html` file and click "Open with Live Server".

## `mock` directory

This is the codebase for the latter part of the gearup. This is a TypeScript React project created with Vite setup. The styling is a little bit prettier than the raw HTML/CSS version. We'll use this to work through some exercises with state, event handlers, and Playwright testing. This is a good template to start Mock with once it is filled in from the gearup.

The `components` subdirectory contains all the React components for the project. The `styles` subdirectory contains the CSS files. `main.ts` is a template TypeScript file that shows that .ts and .tsx files can be used in conjunction. `index.tsx` contains renders the root by loading the `App.tsx` file when the `index.html` file is fetched; for your purposes, you should not have to edit it.

## Playwright tests

The `testing` folder was created via `npm init playwright@latest`. It contains our Playwright example tests. We did not install a GH actions script; otherwise we used the defaults.

You can see the Playwright configuration in `playwright.config.ts`. This shouldn't be modified much; it's the default except that we:

- modified the `webServer` parameter to start the gearup project so that Playwright can interact with it. Notice that when your tests run, the configuration will actually run them on multiple browsers: Chrome, Firefox, and Safari. If you need to speed up your tests during development, you can comment some of these out.

## How to setup and run

Once cloned:

### Setup Mock from root directory

`cd mock` — Change into the `mock` directory

`npm install` — Installs node_modules folder for dependencies

`npx install playwright` — Installs everything needed to run PlayWright

### Running Mock

`npm start` — This starts a local server that compiles your code in real time.

### Running tests witih Playwright

`npx playwright test` — Runs tests

`npx playwright show-report` — Shows a code breakdown of test progressions

`npx playwright test --ui`— Opens a UI that allows you to watch and trace your (failing) tests live in a browser

`npx playwright codegen <url>` — Opens a URL and generates tests with locators for elements on the page.

-> NOTE: You still have to document your tests and add assertions.

-> NOTE: If you are using your local server, you must start it before you try to use the codegen command.

## Navigating the gearup code.

All tasks that will be done as "Demos" are labeled as "TODO WITH TA." These will be filled out together. All tasks that are left for you to do with the people around you are labeled with "TODO".

The goal of this gearup is to build a REPL with a button that pushes the commands in the input box to the history box. This history box will contain a scrollable list of all the commands. This is challenging and warrants a least a couple of minutes of discussion about design and state management before you dive into it. This management of state will be essential for the project however! While we have a way we are going through in the gearup, note that there are multiple possible ways to do this, and we do not provide the one _correct_ way.
