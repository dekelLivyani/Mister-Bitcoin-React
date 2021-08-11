import { Link } from 'react-router-dom';
import contactImg from '../assets/imgs/contact.png'
import { useDispatch, useSelector } from 'react-redux';
import { getContactById, removeContact } from '../store/actions/contactActions'
import { TransferFund } from '../cmps/TransferFund'
import { MovesList } from '../cmps/MovesList'
import { useEffect } from 'react';
import { userService } from '../services/user.service';

export const ContactDetails = ({ match,history }) => {
   const { currContact:contact} = useSelector(state => state.contactModule);
   let { loggedInUser } = useSelector(state => state.userModule);
   loggedInUser = userService.getUserById(loggedInUser)
   const dispatch = useDispatch();

   useEffect(() => {
      const { id } = match.params
      dispatch(getContactById(id));
   }, [])

   const onRemoveContact = async () => {
      dispatch(removeContact(contact._id));
      history.push('/contact')
   }
   const movesToShow = () => {
      return loggedInUser.moves.filter(move => move.to === contact.name)
   }
   if (!contact) return <section>loading...</section>
   return (
      <div className="contact-details">
         <section className="actions">
            <Link to="/contact" className="simple-button back">
               <span className="material-icons-outlined">arrow_back</span>
            </Link>
            <div className="right-buttons">
               <button className="simple-button btn-action" onClick={onRemoveContact}>
                  <span className="material-icons-outlined"
                  >delete_outline</span>
               </button>
               <Link to={'/contact/edit/' + contact._id} > <button className="simple-button btn-action">
                  <span className="material-icons-outlined">edit</span>
               </button> </Link>
            </div>
         </section>
         <div className="main-container">
            <div className="info">
               <img src={contactImg} className="img" alt="" style={{ backgroundColor: contact.color }} />
               <p className="name">Name: {contact.name}</p>
               <p className="email">Email: {contact.email} </p>
               <p className="phone">Phone: {contact.phone} </p>
               <TransferFund contact={contact} />
            </div>
            <MovesList moves={movesToShow()} contact={contact} />
         </div>
      </div>
   )
}
