// React Router Hooks
import { Link, useNavigate } from "react-router-dom";

// React Hooks
import { useEffect, useState } from "react";

// Attributes
import attributes from "./styles/RedirectionModal.module.css";

const RedirectionModal = ({ children }) => {
  // State variables
  const [seconds, setSeconds] = useState(6);

  //   Derived values
  let secondsText = seconds > 1 ? `${seconds} seconds` : `${seconds} second`;

  // Navigate cb
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (seconds < 1) {
      clearTimeout(timer);
      navigate("/");
      return;
    }

    timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  return (
    <div className={attributes["redirection-modal"]}>
      <div>
        <h2>{children}</h2>
        <p>You will be redirected to the Home Page after:</p>
        <p className={attributes["time"]}>{secondsText}</p>
        <p className={attributes["navigating-link"]}>
          Or you can go manually <Link to="/">Home page</Link>
        </p>
      </div>
    </div>
  );
};

export default RedirectionModal;
