import React, {useCallback, useEffect, useState} from "react";
import {AppBar, Button, Grid, Hidden, Paper, Toolbar, Typography} from "@material-ui/core";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import "./Layout.css";
import { auth } from "../firebase";

export const Layout: React.FunctionComponent = ({children}) => {
    const [ user, setUser ] = useState<string>();

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (!user) {
                return;
            }

            setUser(user.displayName ?? "");
        });
    }, []);

    const openLogin = useCallback(() => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        auth.useDeviceLanguage();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <Paper elevation={0} className="w-layout">
            <AppBar className="w-layout__bar" color="primary" position="sticky">
                <Toolbar>
                    <Hidden xsDown>
                        <Typography variant="h5" color="inherit" style={{flexGrow: 1}}>Вішліст Карпових</Typography>
                    </Hidden>
                    <Hidden smUp>
                        <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>Вішліст Карпових</Typography>
                    </Hidden>
                    {user ?? <Button onClick={openLogin} variant="contained">Авторизуватись</Button>}
                </Toolbar>
            </AppBar>

            <Grid className="w-layout__content" container justifyContent="center">
                <Grid item xs={11} md={9} lg={5}>
                    {children}
                </Grid>
            </Grid>
        </Paper>
    );
};
