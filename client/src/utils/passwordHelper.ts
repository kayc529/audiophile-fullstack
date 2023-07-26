export interface PasswordFormatValidator {
  correctLength: boolean;
  containsNumber: boolean;
  containsUppercase: boolean;
  containsSpecial: boolean;
}

export const validatePasswordFormat = (
  password: string | undefined
): PasswordFormatValidator => {
  let returnObj = {
    correctLength: false,
    containsNumber: false,
    containsUppercase: false,
    containsSpecial: false,
  };

  if (password) {
    returnObj.correctLength = password.length >= 8;
    returnObj.containsNumber = containsNumber(password);
    returnObj.containsUppercase = containsUppercase(password);
    returnObj.containsSpecial = containsSpecial(password);
  }

  return returnObj;
};

export const isCorrectPasswordFormat = (password: string | undefined) => {
  let { correctLength, containsNumber, containsUppercase, containsSpecial } =
    validatePasswordFormat(password);

  return (
    correctLength && containsNumber && containsUppercase && containsSpecial
  );
};

const containsNumber = (password: string): boolean => {
  return /\d/.test(password);
};

const containsUppercase = (password: string): boolean => {
  return /[A-Z]/.test(password);
};

const containsSpecial = (password: string): boolean => {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
};
