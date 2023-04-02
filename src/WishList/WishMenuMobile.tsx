import React from "react";
import { Action, useACL } from "../ACLHook";
import {Button, IconButton, Menu, MenuItem} from "@material-ui/core";
import { WishReserve } from "./WishReserve";
import { MoreVert } from "@material-ui/icons";
import {hideWish, toggleChecked} from "../database/actions";

interface OwnProps {
    id: string;
    url: string;
    checked: boolean;
}

export const WishMenuMobile: React.FunctionComponent<OwnProps> = ({ id, url, checked }) => {
    const { can } = useACL();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (can(Action.hide)) {
        return (
            <>
                <IconButton
                    aria-label="more"
                    aria-haspopup="true"
                    onClick={openMenu}
                >
                    <MoreVert />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={isOpen}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: 48 * 4.5,
                            width: '20ch',
                        },
                    }}
                >
                    <MenuItem key="open" onClick={() => window.open(url)}>Відкрити</MenuItem>
                    <MenuItem key="check" onClick={() => toggleChecked(id, true)}>Викреслити</MenuItem>
                    <MenuItem key="uncheck" onClick={() => toggleChecked(id, false)}>Повернути</MenuItem>
                    <MenuItem key="hide" onClick={() => hideWish(id)}>Видалити</MenuItem>
                </Menu>
            </>
        );
    }


    return <div style={{minWidth: 204}}>
        <Button
            color="secondary"
            href={url}
            target="_blank"
        >
            Відкрити
        </Button>
        <WishReserve id={id} checked={checked}/>
    </div>
};