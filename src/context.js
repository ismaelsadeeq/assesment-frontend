import React, { useState, useContext, useReducer, useEffect } from 'react'
import reducer from './reducer'

const url = 'http://localhost:3001'
const AppContext = React.createContext()
let cartItems = []
const AppProvider = ({ children }) => {
  const initialstate = {
    loading:false,
    cart:cartItems,
    total:0,
    amount:0  ,
  }

  const [state, dispatch] = useReducer(reducer,initialstate)
  const clearCart = ()=>{
    dispatch({type:'CLEAR_CART'})
  }
  const remove = (id)=>{
    dispatch({type:'REMOVE',payload:id})
  }
  const add_to_cart = (id)=>{
    dispatch({type:'ADD_TO_CART',payload:id})
  }
  const fetchData = async ()=>{
    dispatch({type:'LOADING'});
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({type:'DISPLAY_ITEMS',payload:cart.data})
  }
  useEffect(()=>{
    fetchData()
  },[]);

  useEffect(()=>{
    dispatch({type:'GET_TOTALS'})
  },[state.cart])
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        add_to_cart,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
