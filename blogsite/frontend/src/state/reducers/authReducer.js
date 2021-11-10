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
      state.access_token = action.payload.access_token
      state.refresh_token = action.payload.refresh_token
      state.isAuthenticated = true
      state.isLoading = false
      state.user = action.payload.user
      return {...state}
    case "logout":
      state = initialState
      return {...state}
    case "update-tokens":
      state.access_token = action.payload.access
      state.refresh_token = action.payload.refresh
    case "update-loading":
      state.isLoading = action.payload.loading
    default:
      return {...state}
    }
}

export default reducer