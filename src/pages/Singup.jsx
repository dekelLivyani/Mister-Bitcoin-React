import { userService } from '../services/user.service'
import { useDispatch, useSelector } from 'react-redux';
import { singup } from '../store/actions/userActions'
import { useForm } from '../hooks/useForm';

export const Singup = ({ history, }) => {
   const dispatch = useDispatch();
   const initialState = userService.getEmptyUser()
   const [userToSing, handleChange] = useForm(initialState)
   // const {loggedInUser} = useSelector(state => state.userModule)
   const onSingUp = async () => {
      await dispatch(singup(userToSing))
      // const loggedInUser = userService.getUserById(this.props.loggedInUser)
      // console.log('loggedInUser', loggedInUser)
      history.push('/contact')
   }
   return (
      <form className="form-login simple-form" onSubmit={onSingUp}>
         <label>Name:
            <input type="text" name="name" value={userToSing.name} onChange={handleChange} placeholder="Name" />
         </label>
         <label>Username:
            <input type="text" name="username" value={userToSing.username} onChange={handleChange} placeholder="Username" />
         </label>
         <label>Password:
            <input type="Password" name="password" value={userToSing.password} onChange={handleChange} placeholder="Password" />
         </label>
         <button>Sing up</button>
      </form>
   )
}
