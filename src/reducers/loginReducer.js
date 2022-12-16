export function loginReducer(state, action) {
  switch (action.type) {
    case "FILL_EMAIL":
      return {
        ...state,
        email: action.payload,
        hasError: false,
        errorMsg: "",
      };
    case "FILL_PASSWORD":
      return {
        ...state,
        password: action.payload,
        hasError: false,
        errorMsg: "",
      };
    case "NOTIFY_ERROR":
      return {
        ...state,
        hasError: true,
        errorMsg: action.payload,
      };
    case "RESET_ERROR_STATE":
      return {
        ...state,
        hasError: false,
        errorMsg: "",
      };
    default:
      return state;
  }
}
