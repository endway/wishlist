export interface Row<TData> {
    key: string;
    data: TData;
}

export  const denormalize = <TData = any, TRow = Row<TData>>(collection: Record<string, TData>): Array<TRow> => {
    return Object.keys(collection).map((key) => {
        return {
            key,
            data: collection[key],
        } as TRow;
    });
};
