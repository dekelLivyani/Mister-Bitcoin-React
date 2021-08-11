import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMove } from '../store/actions/userActions'

export const TransferFund = ({ contact }) => {
   const dispatch = useDispatch()
   const [ amount, setAmount ] = useState(0)
   const doMove = () => {
      dispatch(addMove(contact, amount))
   }
   const handleChange = ({ target }) => {
      setAmount( prevAmount => +prevAmount + +target.value )
   }
      return (
         <div className="TransferFund">
            <h2>Transfer coins to {contact.name}</h2>
            <div className="action">
               <span>Amount: </span>
               <input type="number" name="amount" onChange={handleChange} />
               <button className="transfer" onClick={doMove}>Transfer</button>
            </div>
         </div>
      )
}