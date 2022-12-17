export const validator = (inputs) => {
  return {
    validateIfNotEmpty: (values = null) =>
      values
        ? values.every((val) => val !== "")
        : inputs.every((inp) => inp !== ""),
    validateInput: (inp, conditionalCb) => (conditionalCb(inp) ? true : false),
  };
};
