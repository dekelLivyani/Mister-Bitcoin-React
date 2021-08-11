import { useForm } from "../hooks/useForm"

export const ContactFilter = ({ onChangeFilter }) => {
   const [filterBy, handleChange] = useForm({ term: '' }, onChangeFilter)

   return (
      <form className="contact-filter">
         <input type="text" name="term" value={filterBy.term}
            placeholder="Search..." onChange={handleChange} />
      </form>
   )
}