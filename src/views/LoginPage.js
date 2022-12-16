import { auth } from "../config/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { loginReducer } from "../reducers/loginReducer";

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
    password: "",
    confirmPassword: "",
    hasError: false,
    errorMsg: "",
    emailInputActive: false,
    passwordInputActive: false,
    loginState: "idle",
  });

  useEffect(() => {
    if (loginState.email)
      loginDispatch({ type: "EMAIL_INPUT_STATE", payload: true });

    if (loginState.password)
      loginDispatch({ type: "PASSWORD_INPUT_STATE", payload: true });
  }, [loginState.email, loginState.password]);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    loginDispatch({ type: "SET_LOGIN_STATE", payload: "pending" });

    if (!loginState.email || !loginState.password) {
      loginDispatch({
        type: "NOTIFY_ERROR",
        payload: `You couldn't login! \n Check your email and password credentials again!`,
      });
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
            <label htmlFor="email">Enter Email</label>
            <input
              id="email"
              type="email"
              value={loginState.email}
              onChange={(e) =>
                loginDispatch({ type: "FILL_EMAIL", payload: e.target.value })
              }
              onFocus={() =>
                loginDispatch({ type: "EMAIL_INPUT_STATE", payload: true })
              }
              onBlur={() =>
                !loginState.email &&
                loginDispatch({ type: "EMAIL_INPUT_STATE", payload: false })
              }
            />
          </div>

          <div
            className={loginState.passwordInputActive ? classes["active"] : ""}
          >
            <label htmlFor="password">Enter password</label>
            <input
              id="password"
              type="password"
              value={loginState.password}
              onChange={(e) =>
                loginDispatch({
                  type: "FILL_PASSWORD",
                  payload: e.target.value,
                })
              }
              onFocus={() =>
                loginDispatch({ type: "PASSWORD_INPUT_STATE", payload: true })
              }
              onBlur={() =>
                !loginState.password &&
                loginDispatch({ type: "PASSWORD_INPUT_STATE", payload: false })
              }
            />
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
