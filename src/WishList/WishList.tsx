import React, {useCallback} from "react";
import { ref, set } from "firebase/database";
import { List, Paper, Typography } from "@material-ui/core";

import { Wish } from "./interfaces";
import { WishItem } from "./WishItem";
import { useStyles } from "../StylesHook";
import { database } from "../firebase";

interface OwnProps {
  collection: Record<string, Omit<Wish, "id">>;
}

const makeArrayFromCollection = (collection: Record<string, Omit<Wish, "id">>) => {
  const listsMap = new Map();

  Object.keys(collection).forEach((id) => {
    const element = collection[id];

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

export const WishList: React.FunctionComponent<OwnProps> = ({collection}) => {
  const { title } = useStyles();
  const list = collection ? makeArrayFromCollection(collection) : [];
  const toggleChecked = useCallback((id: string, checked: boolean) => {
      const checkedRef = ref(database, `list/${id}/checked`);

      set(checkedRef, checked).catch(console.error);
  }, []);

  if (!list?.length) {
    return null;
  }

  return (
    <>
    {list.map((item) => (
      <React.Fragment key={item.label}>
        <Typography variant="h6" className={title}>{item.label}</Typography>

        <Paper>
          <List>
            {item.items.map((wish: Wish) => (
              <WishItem
                key={wish.id}
                item={wish}
                toggleWish={(checked: boolean) => toggleChecked(wish.id, checked)}
              />
            ))}
          </List>
        </Paper>
      </React.Fragment>
    ))}
    </>
  );
};
