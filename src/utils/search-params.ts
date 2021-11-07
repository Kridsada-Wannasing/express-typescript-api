const allowed = ["take", "skip"];

export const filterSearchParams = (queries) =>
  Object.keys(queries)
    .filter((key) => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = queries[key];
      return obj;
    }, {});
