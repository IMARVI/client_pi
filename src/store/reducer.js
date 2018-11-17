const initialSate = {
  user : "",
  password : "",
  logged : false
}

const reducer = (state = initialSate, action) =>{
  if(action.type === 'SET_USR'){
    return{
      ...state,
      user : "user"
    }
  }
  return state
}

export default reducer;