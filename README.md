# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## CI/CD

GitHub Actions workflows live in `.github/workflows`:

| Workflow | Trigger | What it does |
| --- | --- | --- |
| `ci.yml` | every PR, push to `main` | `npm ci`, typecheck, tests, production build |
| `deploy-preview.yml` | PRs from this repo (not forks) | deploys to a Firebase Hosting preview channel `pr-<number>` (expires in 7 days) and comments the URL on the PR |
| `deploy-production.yml` | push to `main`, manual run | deploys to the Firebase Hosting `live` channel |
| `firebase-hosting.yml` | called by the two above | shared build + deploy job |

### One-time setup

Create two GitHub environments (Settings → Environments): `preview` and `production`.
Add protection rules (e.g. required reviewers) to `production` if deploys should be approved.
In each environment set:

- Secret `FIREBASE_SERVICE_ACCOUNT`: JSON key of a service account with the *Firebase Hosting Admin* role
  (`firebase init hosting:github` can create one for you).
- Variable `FIREBASE_PROJECT_ID`: target Firebase project.
- Variables `REACT_APP_FIREBASE_API_KEY`, `REACT_APP_FIREBASE_AUTH_DOMAIN`, `REACT_APP_FIREBASE_DATABASE_URL`,
  `REACT_APP_FIREBASE_PROJECT_ID`, `REACT_APP_FIREBASE_STORAGE_BUCKET`, `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`,
  `REACT_APP_FIREBASE_APP_ID`, `REACT_APP_FIREBASE_MEASUREMENT_ID`: the web app config from the Firebase console.

Both environments can point at the same project (previews then share the production database), or `preview`
can point at a separate staging project.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
