import React, { useEffect, useState } from 'react';
import { createTheme } from '@material-ui/core/styles';
import { colors, ThemeProvider } from "@material-ui/core";
import { ref, onValue } from "firebase/database";

import { database } from "./firebase";
import { Layout } from "./Layout/Layout";
import { WishList } from "./WishList/WishList";
import { Wish } from "./WishList/interfaces";

import './App.css';
import {useMigrator} from "./database/migrator";

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
  const [reservations, setReservations] = useState<Record<string, boolean>>({});

  useMigrator();
  useEffect(() => {
    const elementsRef = ref(database, "list");
    const reservationsRef = ref(database, "reservations");

    const listOff = onValue(elementsRef, (snapshot) => setList(snapshot.val()));
    const reservationsOff = onValue(reservationsRef, (snapshot) => setReservations(snapshot.val()));

    return () => {
      listOff();
      reservationsOff();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <WishList collection={list} checked={reservations} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
