
import { Link } from 'react-router-dom';
import contactImg from '../assets/imgs/contact.png';

export function ContactPreview({ contact }) {
   return (
         <Link to={'/contact/' + contact._id} className="contact-preview">
            <img src={contactImg} className="img" alt="" style={{ backgroundColor: contact.color }} />
            <span className="name">{contact.name}</span>
         </Link>
   )
}
