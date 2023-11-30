export const queryBuilder = (queryObject: object | null): string => {
  return queryObject
    ? "?" +
        Object.entries(queryObject)
          .map(([k, v]) => `${k}=${v}`)
          .join("&")
    : "";
};

export const wsQueryFormater = (query: string[]): string => {
  const res = Object.entries(query)
    .map(([k, v]) => `${v.toLowerCase()}`)
    .join("/");

  return query.length === 1 ? `${res}@depth` : `stream?streams=${res}`;
};
