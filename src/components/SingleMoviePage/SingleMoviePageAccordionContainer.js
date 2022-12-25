import classes from "./styles/SingleMoviePageAccordionContainer.module.css";

const SingleMoviePageAccordionContainer = ({ children }) => {
  return <section className={classes.accordion}>{children}</section>;
};

export default SingleMoviePageAccordionContainer;
