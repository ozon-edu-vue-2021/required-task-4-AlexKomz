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

export const defaultInputControlFactory = () => ({
  value: ``,
  isInvalid: false,
  invalidMessage: ``,
});

const EMAIL_REG_EXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RUSSIAN_ALPHABET_REG_EXP = /^[А-ЯЁ][а-яё]*$/;
const ENGLISH_ALPHABET_REG_EXP = /^[a-zA-Z]+$/;
const DIGIT_REG_EXP = /^\d+$/;

const checkControl = (condition, control, message) => {
  if (!condition) {
    control.isInvalid = true;
    control.invalidMessage = message;

    return false;
  }

  return true;
};

export const VALIDATE = {
  MAIL: `mail`,
  RUSSIAN: `russian`,
  ENGLISH: `english`,
  DATE: `date`,
  LENGTH: `length`,
  DIGIT: `digit`,
};

export const validator = {
  [VALIDATE.MAIL]: (control) =>
    checkControl(
      EMAIL_REG_EXP.test(control.value),
      control,
      `Некорретный почтовый адрес!`
    ),
  [VALIDATE.RUSSIAN]: (control) =>
    checkControl(
      RUSSIAN_ALPHABET_REG_EXP.test(control.value),
      control,
      `Некорректная строка!`
    ),
  [VALIDATE.ENGLISH]: (control) =>
    checkControl(
      ENGLISH_ALPHABET_REG_EXP.test(control.value),
      control,
      `Некорректная строка!`
    ),
  [VALIDATE.DATE]: (control) => {
    const date = Date.parse(control.value);
    const condition = date ? !(date > Date.now()) : date;

    return checkControl(condition, control, `Некорректная дата!`);
  },
  [VALIDATE.LENGTH]: (control, length) =>
    checkControl(
      control.value.length === length,
      control,
      `Некорректное количество!`
    ),
  [VALIDATE.DIGIT]: (control) =>
    checkControl(DIGIT_REG_EXP.test(control.value), control, `Только цифры!`),
};
