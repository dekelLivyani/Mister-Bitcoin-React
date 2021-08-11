import { userService } from "../../services/user.service";

export function getUserById(userId) {
   return async (dispatch) => {
      try {
         const user = await userService.getUserById(userId)
      } catch (err) {
         console.log('err', err)
      }
   }
}
export function login(user) {
   return async (dispatch) => {
      try {
         const loggedInUserId = await userService.login(user)
         dispatch({ type: 'LOGIN', loggedInUserId })
      } catch (err) {
         console.log('err', err)
      }
   }
}
export function logout() {
   return async (dispatch) => {
      try {
         await userService.logout()
         dispatch({ type: 'LOGOUT'})
      } catch (err) {
         console.log('err', err)
      }
   }
}

export function singup(user) {
   return async (dispatch) => {
      try {
         const newUser = await userService.singup(user)
         dispatch({ type: 'SINGUP', user: newUser })
      } catch (err) {
         console.log('err', err)
      }
   }
}
export function addMove(contact,amount) {
   return async (dispatch) => {
      try {
         const newUser = await userService.addMove(contact,amount)
         dispatch({ type: 'UPDATE_USER', user: newUser })
      } catch (err) {
         console.log('err', err)
      }
   }
}