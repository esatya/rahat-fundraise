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

export const shortenString = (string) => {
  return string?.length > 8
    ? string?.slice(0, 4) +
        '...' +
        string?.slice(string?.length - 4, string?.length)
    : string;
};
