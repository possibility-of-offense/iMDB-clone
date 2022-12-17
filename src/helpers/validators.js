export const validator = (inputs) => {
  return {
    validateIfNotEmpty: inputs.every((inp) => inp !== ""),
    validateInput: (inp, conditionalCb) => (conditionalCb(inp) ? true : false),
  };
};
