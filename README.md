# FriendsHq

This workshop attempts to demonstrate creating a simple web application using Vue.js.

The constructs that we see being employed in this demo are:

- Creating Vue.js components
- Creating component hierarchies
- `props` and custom events
- Smart vs. Dumb components
- Ajax using `axios`
- Routes, routing, and the `router-view`
- Forms using Vue.js
- State management using Pinia
- Using the best practices for naming and project layout
- Unit/integration/e2e testing

This project also leverages [Vuetify](https://vuetifyjs.com/en/) for styling.

## Prerequisites

- Install [Git](https://git-scm.com/downloads)
- Download and install `node` per [this](https://nodejs.org/en/download/)
  - This will install `npm` as well

### Optional (but highly recommended)

- Install [Visual Studio Code](https://code.visualstudio.com/)
  - Install [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar).
    **Note:** If you have Vetur installed, you'll have to disable it.
  - Install the [EditorConfig extension](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
  - Intall the [Jest extension](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
  - Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Install [Google Chrome](https://www.google.com/chrome/index.html)
  - Install the [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)

## Getting started

First `git-clone` this repository.
Then open a terminal, `cd` to the directory where you cloned this repository.
**Make sure `node`/`npm` are in your path!**

```bash
npm install
```

## Running the app

Open **two** terminals.
In both `cd` to the directory where you cloned this repository.

**In the first one, run**

```bash
npm run rest-endpoint
```

You should see something to the effect of

```
$ json-server --watch server/api/db.json

  \{^_^}/ hi!

  Loading server/api/db.json
  Done

  Resources
  http://localhost:3000/friends

  Home
  http://localhost:3000

  Type s + enter at any time to create a snapshot of the database
  Watching...
```

**In the second terminal run**

```bash
npm run dev
```

Once the console is settled, visit [http://localhost:5173/](http://localhost:5173/) and you should see the basic layout of the "Friends HQ"

You are all set!

## Running the tests

### Lints and fixes files

```bash
npm run lint
```

### Run your end-to-end tests

```bash
npm run test:e2e
```

### Run your unit tests

```bash
npm run test:unit
```

## Navigating the source code

The best way to peruse the changes in this codebase is to follow the commit history.
Each commit has been deliberately designed to highlight one particular aspect in our exploration of Vue.js.

## Credits

This project is inspired by [Monica](https://github.com/monicahq/monica).
