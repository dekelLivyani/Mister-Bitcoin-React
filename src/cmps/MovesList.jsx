import React from 'react'

export function MovesList({ moves }) {
   if (!moves.length) return <section><ul className="move-list">
      <h1>No moves </h1>
   </ul>
   </section>
   return (
      <ul className="move-list">
         <h1 className="title">Move List: </h1>
         {moves.map(move => <li key={move.id}>
            <p> To: {move.to}</p>
            <p> At: {new Date(move.at).toLocaleString()} </p>
            <p> Amount: {move.amount} </p>

         </li>)}
      </ul>
   )
}
