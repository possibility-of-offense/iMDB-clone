// React Hooks
import { useEffect, useRef } from "react";

// Attributes
import attributes from "./styles/AddActorInput.module.css";

const AddActorInputActorName = ({
  value,
  setValue,
  valid,
  resetValid,
  labelText,
  id,
  actorIsExisting,
  resetActorIsExisting,
}) => {
  // Refs
  const divRef = useRef();

  // Side effect
  useEffect(() => {
    divRef.current.classList.remove(attributes["invalid-input"]);

    if (valid === false) {
      divRef.current.classList.add(attributes["invalid-input"]);
    }
  }, [valid]);

  useEffect(() => {
    if (actorIsExisting) {
      divRef.current.classList.remove(attributes["focused-div"]);
    }
  }, [actorIsExisting]);

  // Handlers
  const handleInputFocus = (e) => {
    divRef.current.classList.add(attributes["focused-div"]);
    resetValid();
    resetActorIsExisting(false);
  };

  const handleInputBlur = (e) => {
    if (!value) {
      divRef.current.classList.remove(attributes["focused-div"]);
      divRef.current.classList.add(attributes["invalid-input"]);
    }
  };

  const handleInputChange = (e) => {
    divRef.current.classList.remove(attributes["invalid-input"]);
    setValue(e.target.value);
  };

  return (
    <div
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      className={`${attributes["add-actor-form-control"]}`}
      ref={divRef}
    >
      <label htmlFor={id}>{labelText}</label>
      <input id={id} type="text" value={value} onChange={handleInputChange} />
    </div>
  );
};

export default AddActorInputActorName;
