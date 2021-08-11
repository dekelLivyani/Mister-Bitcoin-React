import { ContactList } from '../cmps/ContactList';
import { ContactFilter } from '../cmps/ContactFilter';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadContacts, setFilterBy } from '../store/actions/contactActions'
import { useEffect } from 'react';

export const ContactPage = () => {
   const { contacts } = useSelector(state => state.contactModule)
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(loadContacts());
   }, [])

   const onChangeFilter = (filterBy) => {
      dispatch(setFilterBy(filterBy));
      dispatch(loadContacts());
   }
   return (
      <div className="contactPage">
         {< ContactFilter onChangeFilter={onChangeFilter} />}
         {contacts && < ContactList contacts={contacts} />}
         <Link className="add-contact" to="/contact/edit">
            <span className="material-icons-outlined add-btn">add_circle</span>
         </Link>
      </div>
   )
}
