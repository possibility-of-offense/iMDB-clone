export function validationInputs(inputs) {
  let allValid = true;

  for (let input of inputs) {
    const [value, validity] = input;

    if (!value || value.length === 0) {
      validity(false);
      allValid = false;
    }
  }

  return allValid;
}
