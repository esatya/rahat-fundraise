export const isObjEmpty = (obj) => {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
};

export const isJson = (str) => {
  try {
    const obj = JSON.parse(str);
    if (obj && typeof obj === `object`) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
};
