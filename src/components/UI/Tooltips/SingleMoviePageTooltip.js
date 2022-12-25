// Attributes
import attributes from "./styles/SingleMoviePageTooltip.module.css";

const SingleMoviePageTooltip = ({ children }) => {
  return (
    <div className={attributes.tooltip}>
      <div>
        <p>{children}</p>
      </div>
      <div className={attributes.triangle}></div>
    </div>
  );
};

export default SingleMoviePageTooltip;
