import { useState } from "react";
import GridTwoColumns from "../../components/UI/Layout/GridTwoColumns";

import attributes from "./styles/ActorInput.module.css";

const ActorInput = ({ actorName, addToActors }) => {
  const [characterName, setCharacterName] = useState("");

  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      e.preventDefault();
      addToActors(characterName);
    }
  };

  return (
    <div className={attributes["actor-input"]}>
      <h4 className={attributes["heading"]}>Add actor info</h4>
      <GridTwoColumns sizing="equal">
        <input
          type="text"
          defaultValue={actorName}
          readOnly
          style={{ opacity: 0.6, pointerEvents: "none" }}
        />
        <input
          type="text"
          placeholder="Character name"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </GridTwoColumns>
    </div>
  );
};

export default ActorInput;
