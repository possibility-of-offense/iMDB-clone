export function rootReducer(state, action) {
  switch (action.type) {
    case "SET_FETCH_USER_STATE":
      return {
        ...state,
        fetchUserState: action.payload,
      };
    case "SET_HAS_SIGNED_OUT":
      return {
        ...state,
        hasSignedIn: false,
        hasSignedOut: action.payload,
      };
    case "SET_HAS_SIGNED_IN":
      return {
        ...state,
        hasSignedIn: action.payload,
        hasSignedOut: false,
      };
    default:
      return state;
  }
}
