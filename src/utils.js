export const generateRandomInt = ({ from = 0, to }) => {
  const min = Math.ceil(from);
  const max = Math.floor(to);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const generateRandomId = (length) => {
  return new Array(length)
    .fill(``)
    .map(() => generateRandomInt({ to: 10 }))
    .join(``);
};
