import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import {FirebaseDatabaseNode, FirebaseDatabaseProvider} from '@react-firebase/database';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import {colors, ThemeProvider} from "@material-ui/core";

import './App.css';
import {Layout} from "./Layout/Layout";
import {WishList} from "./WishList/WishList";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
        <Layout>
          <FirebaseDatabaseNode path="list">
            {(listRef) => (
              <WishList collection={listRef.value} />
            )}
          </FirebaseDatabaseNode>
        </Layout>
      </FirebaseDatabaseProvider>
    </ThemeProvider>
  );
}

export default App;
