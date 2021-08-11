import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/userActions';

export const AppHeader = ({  }) => {
   const { loggedInUser } = useSelector(state => state.userModule)
   const dispatch = useDispatch();
   
   function onLogout() {
      dispatch(logout())
   }
   return (
      <nav>
         <NavLink exact to="/"> Home </NavLink> |
         <NavLink to="/contact"> Contacts </NavLink> |
         <NavLink to="/statistic"> Statistics </NavLink>
         {loggedInUser && <>| <a to="#" onClick={onLogout}> logout </a></>}
      </nav>
   )
}