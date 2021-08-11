import { utilService } from "./util.service";

const KEY_User = 'users';
const KEY_LoggedInUser = 'loggedInUser';
var users = utilService.load(KEY_User) || [{
   _id: "2F3fds6NNv1Sa0s",
   name: "Ochoa Hyde",
   coins: 100,
   moves: [],
   username: 'aaa',
   password: 'aaa'
}]
export const userService = {
   getLoggedInUser,
   getUserById,
   login,
   singup,
   logout,
   addMove,
   getEmptyUser
}
function login(user) {
   return new Promise((resolve, reject) => {
      users = (utilService.load(KEY_User)) ? utilService.load(KEY_User) : users;
      const userToLogin = users.find(u => u.username === user.username && u.password === user.password);
      if (userToLogin) {
         utilService.save(KEY_LoggedInUser, userToLogin._id)
         resolve(userToLogin._id)
      } else reject('wrong username or password')
   })
}
function logout() {
   utilService.save(KEY_LoggedInUser, null)
}
function singup(user) {
   return new Promise((resolve, reject) => {
      user._id = utilService.makeId()
      const usersToSave = [...users]
      usersToSave.push(user);
      utilService.save(KEY_User, usersToSave)
      login(user)
      resolve(user)
   })
}

function update(user) {
   return new Promise((resolve, reject) => {
      const index = users.findIndex(u => user._id === u._id)
      if (index !== -1) {
         users[index] = user
         utilService.save(KEY_User, users)
      }
      resolve(user)
   })
}

function getUserById(id) {
   users = (utilService.load(KEY_User)) ? utilService.load(KEY_User) : users;
   const user = users.find(u => u._id === id)
   if (user) return user;
}

function getLoggedInUser() {
   const loggedInUser = utilService.load(KEY_LoggedInUser)
   if (loggedInUser) return loggedInUser;
}

async function  addMove(contact,amount) {
   const user = getUserById(getLoggedInUser());
   if (user.coins - amount < 0) return;
   const move ={
      id: utilService.makeId(),
      to: contact.name,
      at: Date.now(),
      amount
   }
   user.coins = user.coins - amount;
   user.moves.push(move);
   return await update(user)
}

function getEmptyUser() {
   return {
      name: "",
      coins: 100,
      moves: [],
      username: '',
      password: ''
   }
}