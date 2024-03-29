import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOCAL } from "../actions"

const initialState = {
  loginLoading: false,
  login: null,
  loginError: null,
  loggedIn: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loginLoading: true,
        loginError: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: action.payload,
        loginLoading: false,
        loggedIn: true
      }
    case LOGIN_FAIL:
      return { 
        ...state,
        loginError: action.payload,
        loginLoading: false
      }
    case LOGOUT:
      return {
        ...state,
        login: null,
        loggedIn: false,
        loginLoading: false
      }
    case LOCAL:
      return {
        ...state,
        login: action.data
      }
    default:
      return state
  }
}
