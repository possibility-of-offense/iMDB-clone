import { Fragment } from "react";
import GridTwoColumns from "../Layout/GridTwoColumns";

const InputText = ({
  divClassName,
  id,
  labelText,
  placeholderText,
  value,
  valueList,
  onChange,
  onKeyDown,
  resetValidity,
  error,
}) => {
  const splitLabelText = labelText.split(" ");
  splitLabelText.shift();
  let labelTxt = [];

  for (let i = 1; i < splitLabelText.length; i++) {
    if (splitLabelText[i].startsWith("(")) {
      labelTxt.push(splitLabelText.slice(0, i));
      break;
    }
  }

  // Handlers
  const handleChange = (e) => {
    onChange(e.target.value);
    if (e.target.value !== "") {
      resetValidity(true);
    } else {
      resetValidity(false);
    }
  };

  return (
    <div className={divClassName ? divClassName : "form-control-group"}>
      <GridTwoColumns sizing="auto-1fr">
        <label htmlFor={id}>{labelText}</label>
        {error !== null && error === false && (
          <p className="error">The {labelTxt.join(" ")} input is invalid!</p>
        )}
      </GridTwoColumns>
      <input
        type="text"
        placeholder={placeholderText}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        className={error !== null && error === false ? "error-input" : ""}
      />

      {valueList && Array.isArray(valueList) && valueList?.length > 0 && (
        <Fragment>
          <div className="pills-wrapper">
            {valueList.map((val, i) => (
              <strong key={i}>{val}</strong>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default InputText;
