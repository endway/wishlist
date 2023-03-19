import React from "react";
import {AppBar, Grid, Paper, Toolbar, Typography} from "@material-ui/core";
import "./Layout.css";

export const Layout: React.FunctionComponent = ({children}) => (
  <Paper elevation={0} className="w-layout">
    <AppBar className="w-layout__bar" color="primary" position="sticky">
      <Toolbar>
        <Typography variant="h5" color="inherit" style={{flexGrow: 1}}>Вішліст Карпових</Typography>
      </Toolbar>
    </AppBar>

    <Grid className="w-layout__content" container justifyContent="center">
      <Grid item xs={11} md={9} lg={5}>
        {children}
      </Grid>
    </Grid>
  </Paper>
);
