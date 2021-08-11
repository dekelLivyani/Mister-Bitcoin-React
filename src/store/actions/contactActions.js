import { contactService } from "../../services/contact.service";

export function loadContacts() {
   return async (dispatch, getState) => {
      const { filterBy } = getState().contactModule;
      try {
         const contacts = await contactService.getContacts(filterBy)
         dispatch({ type: 'SET_CONTACTS', contacts })
      } catch (err) {
         console.log('err', err)
      }
   }
}

export function setFilterBy(filterBy) {
   return (dispatch) => {
      dispatch({ type: 'SET_FILTER_BY', filterBy })
   }
}

export function getContactById(contactId) {
   return async (dispatch) => {
      try {
         const contact = await contactService.getContactById(contactId)
         dispatch({ type: 'SET_CONTACT', contact })
      } catch (err) {
         console.log('err', err)
      }
   }
}
export function removeContact(contactId) {
   return async (dispatch) => {
      try {
         const contact = await contactService.removeContact(contactId)
         dispatch({ type: 'REMOVE_CONTACT', contact })
      } catch (err) {
         console.log('err', err)
      }
   }
}
export function saveContact(contact) {
   return (contact._id) ? _updateContact(contact) : _addContact(contact);
}

function _addContact(contact) {
   return async (dispatch) => {
      try {
         const newContact = await contactService.saveContact(contact)
         dispatch({ type: 'ADD_CONTACT', contact: newContact })
      } catch (err) {
         console.log('err', err)
      }
   }
}
function _updateContact(contact) {
   return async (dispatch) => {
      try {
         const newContact = await contactService.saveContact(contact)
         dispatch({ type: 'UPDATE_CONTACT', contact: newContact })
      } catch (err) {
         console.log('err', err)
      }
   }
}