import { auth } from "../config/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { loginReducer } from "../reducers/loginReducer";

// Components
import PopupModal from "../components/UI/Alerts/PopupModal";

// Classes
import classes from "./styles/LoginPage.module.css";

const LoginPage = () => {
  const [loginState, loginDispatch] = useReducer(loginReducer, {
    email: "gosho@abv.bg",
    password: "test1234",
    confirmPassword: "",
    hasError: false,
    errorMsg: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (!loginState.email || !loginState.password) return alert("Fill inputs");

    e.preventDefault();
    console.log(loginState);
    try {
      await signInWithEmailAndPassword(
        auth,
        loginState.email,
        loginState.password
      );

      navigate("/");
    } catch (error) {
      console.log(error);
      loginDispatch({
        type: "NOTIFY_ERROR",
        payload: `You couldn't login! \n Check your email and password credentials again!`,
      });
    }
  };

  return (
    <section className={`${classes["login-page"]}`}>
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
          <input
            type="email"
            value={loginState.email}
            onChange={(e) =>
              loginDispatch({ type: "FILL_EMAIL", payload: e.target.value })
            }
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            value={loginState.password}
            onChange={(e) =>
              loginDispatch({ type: "FILL_PASSWORD", payload: e.target.value })
            }
            placeholder="Email"
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
