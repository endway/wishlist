import React, {useEffect, useState} from 'react';
import { createTheme } from '@material-ui/core/styles';
import { colors, ThemeProvider } from "@material-ui/core";
import { ref, onValue } from "firebase/database";

import { database } from "./firebase";
import { Layout } from "./Layout/Layout";
import { WishList } from "./WishList/WishList";

import './App.css';
import {Wish} from "./WishList/interfaces";

const theme = createTheme({
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
  const [list, setList] = useState<Record<string, Wish>>({});

  useEffect(() => {
    const elementsRef = ref(database, "list");

    return onValue(elementsRef, (snapshot) => {
      setList(snapshot.val());
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <WishList collection={list} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
