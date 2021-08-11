import { userService } from "../services/user.service";
import coins from '../assets/imgs/coins.png'
import btc from '../assets/imgs/bitcoin.png'
import { bitcoinService } from "../services/bitcoin.service";
import { Component } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/userActions';
import { MovesList } from '../cmps/MovesList'
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "../hooks/useForm";

export const Home = ({ history }) => {
   const [rate, setRate] = useState(null)
   const [userCredentials, handleChange, setUserCredentials] = useForm(null)
   let {loggedInUser} = useSelector(state => state.userModule)
   loggedInUser = userService.getUserById(loggedInUser)
   const dispatch = useDispatch()

   useEffect(() => {
      const loadRateAndUser = async () => {
         try {
            const user = (!loggedInUser) ? userService.getEmptyUser() : null;
            setUserCredentials(user)
            console.log('loggedInUser', loggedInUser)
            if((loggedInUser)) setRate(await bitcoinService.getRate(loggedInUser.coins))
         } catch (err) {
            console.log('ERROR', err);
         }
      }
      loadRateAndUser()
   },[loggedInUser])
   const onLogin = async () => {
      await dispatch(login(userCredentials))
      if (loggedInUser) history.push('/contact')
   }
   const userLogin = () => {
      if (!userCredentials) return <section>loading...</section>
      return <form className="form-login simple-form" onSubmit={onLogin}>
         <label>Username:
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
         </label>
         <label>Password:
            <input type="Password" name="password" placeholder="Password" onChange={handleChange} />
         </label>
         <button>
            Log in
         </button>
         <Link to="/singup">Not registered yet? click here</Link>
      </form>
   }
   const movesToShow = () => {
      const moves = loggedInUser.moves
      return (moves < 3) ? moves : moves.slice(moves.length - 3, moves.length)
   }
   if (!loggedInUser) return userLogin()
   return (
      <section className="home">
         <div className="user-details">
            <h1 className="title">Hello {loggedInUser.name},</h1>
            <section>
               <img src={coins} alt="" />
               Coins: {loggedInUser.coins}
            </section>
            <section>
               <img src={btc} alt="" />
               BTC: {rate}
            </section>
         </div>
         <MovesList moves={movesToShow()} count={3} />
      </section>
   )
}