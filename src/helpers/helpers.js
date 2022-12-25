export const getNumber = (str) => {
  let num = "";

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "-") {
      num += "-";
      continue;
    }
    if (!isNaN(Number(str[i]))) {
      num += Number(str[i]);
    }
  }

  return num;
};

export const upperCaseFirstWord = (word) => {
  if (typeof word !== "string") return;

  return word[0].toUpperCase() + word.slice(1);
};
