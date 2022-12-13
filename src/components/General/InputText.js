import { Fragment } from "react";

const InputText = ({
  divClassName,
  id,
  labelText,
  placeholderText,
  value,
  valueList,
  onChange,
  onKeyDown,
}) => {
  return (
    <div className={divClassName ? divClassName : "form-control-group"}>
      <label htmlFor={id}>{labelText}</label>
      <input
        type="text"
        placeholder={placeholderText}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
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
