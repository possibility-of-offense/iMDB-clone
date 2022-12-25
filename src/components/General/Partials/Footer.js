import classes from "./styles/Footer.module.css";
import github from "./github.png";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return (
    <footer
      className={`${classes.footer} ${
        location.pathname === "/" && classes["footer-inverse"]
      }`}
    >
      <h5>iMDB clone by Ventsislav Iliev</h5>
      <p>
        <a href="https://github.com/possibility-of-offense" target="_blank">
          <img
            alt="Ventsislav Iliev Github Profile"
            title="Ventsislav Iliev Github Profile"
            src={github}
          />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
