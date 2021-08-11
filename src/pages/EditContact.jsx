import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { contactService } from '../services/contact.service'
import { saveContact } from '../store/actions/contactActions'

export const EditContact = ({ match, history }) => {
   const [contact, handleChange, setContact] = useForm(null)
   const dispatch = useDispatch()
   useEffect(() => {
      const loadContact = async () => {
         try {
            const { id } = match.params
            const contactToEdit = (id) ? await contactService.getContactById(id) : contactService.getEmptyContact();
            setContact(contactToEdit)
         } catch (err) {
            console.log('err', err)
         }
      }
      loadContact()
   }, [])

   const onSaveContact = async (ev) => {
      ev.preventDefault();
      await dispatch(saveContact(contact));
      history.push('/contact')
   }
   if (!contact) return <section>Loading...</section>
   return (
      <div className="edit-contact">
         <section className="actions">
            <Link to="/contact" className="simple-button back">
               <span className="material-icons-outlined">arrow_back</span>
            </Link>
         </section>
         <form className="form-edit" onSubmit={onSaveContact}>
            <label>
               <span>Name:</span>
               <input type="text" value={contact.name}
                  onChange={handleChange} name="name" placeholder="Name..." />
            </label>
            <label>
               <span>Email:</span>
               <input type="text" value={contact.email}
                  onChange={handleChange} name="email" placeholder="Email..." />
            </label>
            <label>
               <span>Phone:</span>
               <input type="text" value={contact.phone}
                  onChange={handleChange} name="phone" placeholder="Phone..." />
            </label>
            <button>Save</button>
         </form>
      </div>
   )
}