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

export const validate = {
  MAIL: `mail`,
  RUSSIAN: `russian`,
  ENGLISH: `english`,
  DATE: `date`,
  LENGTH: `length`,
  DIGIT: `digit`,
};

const validateMessage = {
  MAIL: `Некорретный почтовый адрес!`,
  RUSSIAN: `Строка должна содержать только кириллицу!`,
  ENGLISH: `Строка должна содержать только латинские буквы!`,
  DATE: `Некорректная дата!`,
  DIGIT: `Только цифры!`,
  length: (length) => `Длина должна быть равна ${length} символам!`,
};

export const validator = {
  [validate.MAIL]: (control) =>
    checkControl(
      EMAIL_REG_EXP.test(control.value),
      control,
      validateMessage.MAIL
    ),
  [validate.RUSSIAN]: (control) =>
    checkControl(
      RUSSIAN_ALPHABET_REG_EXP.test(control.value),
      control,
      validateMessage.RUSSIAN
    ),
  [validate.ENGLISH]: (control) =>
    checkControl(
      ENGLISH_ALPHABET_REG_EXP.test(control.value),
      control,
      validateMessage.ENGLISH
    ),
  [validate.DATE]: (control) => {
    const date = Date.parse(control.value);
    const condition = date ? !(date > Date.now()) : date;

    return checkControl(condition, control, validateMessage.DATE);
  },
  [validate.LENGTH]: (control, length) =>
    checkControl(
      control.value.length === length,
      control,
      validateMessage.length(length)
    ),
  [validate.DIGIT]: (control) =>
    checkControl(
      DIGIT_REG_EXP.test(control.value),
      control,
      validateMessage.DIGIT
    ),
};
