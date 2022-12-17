import { auth } from "../config/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { loginReducer } from "../reducers/loginReducer";
import { validator } from "../helpers/validators";

// Components
import PopupModal from "../components/UI/Alerts/PopupModal";

// Classes
import classes from "./styles/LoginPage.module.css";

// Assets
import loginImage from "./imgs/loginImage.jpg";
import loginIcon from "./imgs/loginIcon.png";

const LoginPage = () => {
  const [loginState, loginDispatch] = useReducer(loginReducer, {
    email: "",
    invalidEmail: null,
    password: "",
    invalidPassword: null,
    confirmPassword: "",
    hasError: false,
    errorMsg: "",
    emailInputActive: false,
    passwordInputActive: false,
    loginState: "idle",
  });
  const loginValidator = validator([loginState.email, loginState.password]);

  useEffect(() => {
    if (loginState.email)
      loginDispatch({ type: "EMAIL_INPUT_STATE", payload: true });

    if (loginState.password)
      loginDispatch({ type: "PASSWORD_INPUT_STATE", payload: true });
  }, [loginState.email, loginState.password]);

  const navigate = useNavigate();

  // Handle login user
  const handleLogin = async (e) => {
    e.preventDefault();
    loginDispatch({ type: "SET_LOGIN_STATE", payload: "pending" });

    // Check if fields are empty
    if (!loginValidator.validateIfNotEmpty()) {
      loginDispatch({
        type: "NOTIFY_ERROR",
        payload: `You couldn't login! \n Check your email and password credentials again!`,
      });
      loginDispatch({ type: "SET_LOGIN_STATE", payload: "rejected" });
      return;
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        loginState.email,
        loginState.password
      );
      loginDispatch({ type: "SET_LOGIN_STATE", payload: "successfull" });
      loginDispatch({ type: "RESET_ERROR_STATE" });

      navigate("/?login=successfull");
    } catch (error) {
      loginDispatch({
        type: "NOTIFY_ERROR",
        payload: `You couldn't login! \n Check your email and password credentials again!`,
      });
      loginDispatch({ type: "SET_LOGIN_STATE", payload: "rejected" });
    }
  };

  // Handle changing email input
  const handleChangeEmailInput = (e) => {
    loginDispatch({ type: "FILL_EMAIL", payload: e.target.value });
    loginDispatch({ type: "VALIDATE_EMAIL", payload: false });
  };

  // Handle focus email input
  const handleFocusEmailInput = (e) => {
    loginDispatch({ type: "EMAIL_INPUT_STATE", payload: true });
  };

  // Handle blur the email input
  const handleBlurEmailInput = (e) => {
    !loginState.email &&
      loginDispatch({ type: "EMAIL_INPUT_STATE", payload: false });

    if (loginState.invalidEmail === null) return;

    // Check if email has certain regex pattern
    if (
      loginValidator.validateInput(e.target.value, (inp) =>
        /\w+\@\w+\.\w+/.test(e.target.value)
      )
    ) {
      loginDispatch({ type: "VALIDATE_EMAIL", payload: false });
    } else {
      loginDispatch({ type: "VALIDATE_EMAIL", payload: true });
    }
  };

  // Handle changing password input
  const handleChangePasswordInput = (e) => {
    loginDispatch({
      type: "FILL_PASSWORD",
      payload: e.target.value,
    });

    // Check if email has certain regex pattern
    if (loginValidator.validateInput(e.target.value, (inp) => inp !== "")) {
      loginDispatch({ type: "VALIDATE_PASSWORD", payload: false });
    } else {
      loginDispatch({ type: "VALIDATE_PASSWORD", payload: true });
    }
  };

  // Handle focus password input
  const handleFocusPasswordInput = (e) => {
    loginDispatch({ type: "PASSWORD_INPUT_STATE", payload: true });
  };

  // Handle blur the email input
  const handleBlurPasswordInput = (e) => {
    !loginState.password &&
      loginDispatch({ type: "PASSWORD_INPUT_STATE", payload: false });

    console.log(e.target.value);

    if (e.target.value) {
      loginDispatch({ type: "VALIDATE_PASSWORD", payload: false });
    } else {
      loginDispatch({ type: "VALIDATE_PASSWORD", payload: true });
    }
  };

  return (
    <section className={`${classes["login-page"]}`}>
      <div className={classes["login-page__img"]}>
        <img alt="Login image" title="Login image" src={loginImage} />
      </div>
      <div className={classes["login-page__form"]}>
        <h2>Login</h2>
        {loginState.hasError && (
          <PopupModal
            onClick={(e) => {
              e.preventDefault();
              loginDispatch({ type: "RESET_ERROR_STATE" });
            }}
          >
            {loginState.errorMsg}
          </PopupModal>
        )}
        <form onSubmit={handleLogin}>
          <div className={loginState.emailInputActive ? classes["active"] : ""}>
            <label
              className={
                loginState.invalidEmail ? classes["invalid-label"] : ""
              }
              htmlFor="email"
            >
              Enter Email
            </label>
            <input
              id="email"
              type="email"
              className={
                loginState.invalidEmail ? classes["invalid-input"] : ""
              }
              value={loginState.email}
              onChange={handleChangeEmailInput}
              onFocus={handleFocusEmailInput}
              onBlur={handleBlurEmailInput}
            />
            {loginState.invalidEmail && (
              <p className={classes["invalid-msg"]}>Email input is invalid</p>
            )}
          </div>

          <div
            className={loginState.passwordInputActive ? classes["active"] : ""}
          >
            <label
              className={
                loginState.invalidPassword ? classes["invalid-label"] : ""
              }
              htmlFor="password"
            >
              Enter password
            </label>
            <input
              id="password"
              type="password"
              className={
                loginState.invalidPassword ? classes["invalid-input"] : ""
              }
              value={loginState.password}
              onChange={handleChangePasswordInput}
              onFocus={handleFocusPasswordInput}
              onBlur={handleBlurPasswordInput}
            />
            {loginState.invalidPassword && (
              <p className={classes["invalid-msg"]}>
                Password input is invalid
              </p>
            )}
          </div>
          <div className={classes["login-page__form--submit"]}>
            <button
              className={
                loginState.loginState !== "pending"
                  ? ""
                  : classes["pending-submit"]
              }
              type="submit"
            >
              Sign Up
            </button>
            {loginState.loginState === "pending" && (
              <div className={classes["lds-ring"]}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
          </div>
        </form>
        <div className={classes["login-icon__wrapper"]}>
          <img
            className={classes["login-icon"]}
            alt="Login Icon"
            title="Login Icon"
            src={loginIcon}
          />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
