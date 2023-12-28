const createData = (cur, pref, val) => ({ perfix: pref, key: cur, value: val });

const createResponse = (acc, cur, ...perfval) => { // собирает значения perfval в объект.
  const createInfo = perfval
    .reduce((accum, [pref, val]) => [...accum, createData(cur, pref, val)], []);
  return {
    ...acc,
    [cur]: createInfo,
  };
};

export default createResponse;
