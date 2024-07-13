"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatValidatorErrors = void 0;
// Função que facilita o retorno dos erros do class-validator
const formatValidatorErrors = (errors) => {
    let errorTexts = [];
    errors.forEach((errorObj) => {
        errorTexts = [...errorTexts, ...Object.values(errorObj.constraints)];
    }, []);
    return [...errorTexts];
};
exports.formatValidatorErrors = formatValidatorErrors;
