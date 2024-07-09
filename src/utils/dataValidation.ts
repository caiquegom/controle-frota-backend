import { ValidationError } from 'class-validator';

// Função que facilita o retorno dos erros do class-validator
export const formatValidatorErrors = (errors: ValidationError[]): string[] => {
  let errorTexts: string[] = [];

  errors.forEach((errorObj) => {
    errorTexts = [...errorTexts, ...Object.values(errorObj.constraints)];
  }, []);

  return [...errorTexts];
};
