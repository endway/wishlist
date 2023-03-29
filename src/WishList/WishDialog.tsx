import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, IconButton,
    TextField
} from "@material-ui/core";
import React, { useState } from "react";
import { AddCircle } from "@material-ui/icons";
import { push, ref } from "firebase/database";
import { database } from "../firebase";
import { Wish } from "./interfaces";
import { Role, useSession } from "../SessionHook";

interface OwnProps {
    category: string;
}

const listRef = ref(database, "list");

export const WishDialog: React.FunctionComponent<OwnProps> = ({ category }) => {
    const { role } = useSession();
    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState("");
    const [url, setUrl] = useState("");
    const [price, setPrice] = useState(0);

    const openDialog = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const save = async () => {
        const wish: Omit<Wish, "id"> = {
            url,
            price,
            label,
            for: category,
        };
        await push(listRef, wish);
    };

    if (![Role.admin, Role.owner].includes(role)) {
        return null;
    }

    return (
        <>
            <IconButton style={{marginLeft: 8}} onClick={openDialog}>
                <AddCircle color={"primary"} />
            </IconButton>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Додати побажання</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Назва"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={label}
                        onChange={(ev) => setLabel(ev.target.value)}
                    />

                    <TextField
                        margin="dense"
                        id="url"
                        label="Посилання"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={url}
                        onChange={(ev) => setUrl(ev.target.value)}
                    />

                    <TextField
                        margin="dense"
                        id="price"
                        label="Ціна"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={price}
                        onChange={(ev) => setPrice(Number(ev.target.value))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрити</Button>
                    <Button onClick={save}>Додати</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};