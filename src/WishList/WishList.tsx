import React from "react";
import { List, Paper, Typography } from "@material-ui/core";

import { Wish } from "./interfaces";
import { WishItem } from "./WishItem";
import { useStyles } from "../StylesHook";
import { WishDialog } from "./WishDialog";

interface OwnProps {
  collection: Record<string, Omit<Wish, "id">>;
  checked: Record<string, boolean>;
}

const makeArrayFromCollection = (collection: Record<string, Omit<Wish, "id">>) => {
  const listsMap = new Map();

  Object.keys(collection).forEach((id) => {
    const element = collection[id];

    if (element.hide) {
      return;
    }

    if (!listsMap.has(element.for)) {
      listsMap.set(element.for, []);
    }

    listsMap.get(element.for).push({id, ...element});
  });

  return Array.from(listsMap.keys()).map((label) => ({
    label,
    items: listsMap.get(label),
  }));
};

export const WishList: React.FunctionComponent<OwnProps> = ({collection, checked}) => {
  const { title } = useStyles();
  const list = collection ? makeArrayFromCollection(collection) : [];

  if (!list?.length) {
    return null;
  }

  return (
    <>
    {list.map((item) => (
      <React.Fragment key={item.label}>
        <Typography variant="h6" className={title}>
          {item.label}
          <WishDialog category={item.label} />
        </Typography>

        <Paper>
          <List>
            {item.items.map((wish: Wish) => (
              <WishItem
                key={wish.id}
                item={wish}
                checked={checked[wish.id]}
              />
            ))}
          </List>
        </Paper>
      </React.Fragment>
    ))}
    </>
  );
};
