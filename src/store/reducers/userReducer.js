import { userService } from "../../services/user.service";
const INITIAL_STATE = {
   users: [],
   loggedInUser: userService.getLoggedInUser(),
}
export function userReducer(state = INITIAL_STATE, action) {
   switch (action.type) {
      case 'SINGUP':
         return {
            ...state,
            users: [...state.users, action.user]
         }
      case 'LOGIN':
         return {
            ...state,
            loggedInUser: action.loggedInUserId
         }
      case 'LOGOUT':
         return {
            ...state,
            loggedInUser: null
         }
      case 'UPDATE_USER':
         return {
            ...state,
            users: state.users.map(user => user._id === action.user._id ? action.user : user),
         }
      default:
         return state
   }
}