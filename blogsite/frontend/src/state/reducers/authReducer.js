const initialState = {
  access_token: '',
  refresh_token: '',
  isAuthenticated: false,
  isLoading: false,
  user: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user
      }
    case "logout":
      state = initialState
      return state
    case "update-tokens":
      state.access_token = action.payload.access
      state.refresh_token = action.payload.refresh
    case "update-loading":
      state.isLoading = action.payload.loading
    default:
      return state
    }
}

export default reducer