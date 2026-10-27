import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Wish } from "./interfaces";
import { createWish, updateWish } from "../database/actions";

interface OwnProps {
    open: boolean;
    onClose: () => void;
    /** Existing list names the wish can be moved to. */
    categories: string[];
    /** List that is preselected when creating a new wish. */
    category?: string;
    /** When provided, the dialog edits this wish instead of creating a new one. */
    wish?: Wish;
}

const NEW_CATEGORY = "__new__";

export const WishDialog: React.FunctionComponent<OwnProps> = ({ open, onClose, categories, category, wish }) => {
    const isEdit = Boolean(wish);
    const [label, setLabel] = useState("");
    const [url, setUrl] = useState("");
    const [price, setPrice] = useState<number | null>(0);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        if (!open) {
            return;
        }

        setLabel(wish?.label ?? "");
        setUrl(wish?.url ?? "");
        setPrice(wish?.price ?? 0);
        setNewCategory("");

        const initial = wish?.for ?? category ?? categories[0] ?? "";
        if (initial && !categories.includes(initial)) {
            setSelectedCategory(NEW_CATEGORY);
            setNewCategory(initial);
        } else {
            setSelectedCategory(initial || NEW_CATEGORY);
        }
    }, [open, wish, category, categories]);

    const resolvedCategory = selectedCategory === NEW_CATEGORY ? newCategory.trim() : selectedCategory;
    const canSave = label.trim().length > 0 && resolvedCategory.length > 0;

    const save = async () => {
        const data: Omit<Wish, "id" | "hide"> = {
            url,
            label: label.trim(),
            for: resolvedCategory,
            price: price ?? 0,
        };

        if (wish) {
            await updateWish(wish.id, data);
        } else {
            await createWish(data);
        }

        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>{isEdit ? "Редагувати побажання" : "Додати побажання"}</DialogTitle>
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
                    value={price ?? ""}
                    onChange={(ev) => setPrice(ev.target.value ? Number(ev.target.value) : null)}
                />

                <TextField
                    select
                    margin="dense"
                    id="category"
                    label="Список"
                    fullWidth
                    variant="standard"
                    value={selectedCategory}
                    onChange={(ev) => setSelectedCategory(ev.target.value)}
                >
                    {categories.map((name) => (
                        <MenuItem key={name} value={name}>{name}</MenuItem>
                    ))}
                    <MenuItem value={NEW_CATEGORY}>Новий список…</MenuItem>
                </TextField>

                {selectedCategory === NEW_CATEGORY && (
                    <TextField
                        margin="dense"
                        id="new-category"
                        label="Назва нового списку"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCategory}
                        onChange={(ev) => setNewCategory(ev.target.value)}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Закрити</Button>
                <Button onClick={save} disabled={!canSave}>{isEdit ? "Зберегти" : "Додати"}</Button>
            </DialogActions>
        </Dialog>
    );
};
