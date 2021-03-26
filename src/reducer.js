function reducer(state,action){
  switch(action.type){
    case 'CLEAR_CART':
      return {...state,cart:[]}
    case 'REMOVE':
      return {... state,cart:state.cart.filter(
        (cartItem)=>cartItem.id !== action.payload
      )}
    case 'ADD_TO_CART':
      let newTotal
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload) {
          newTotal = state.total + cartItem.product_varieties.price
         
        }
        state.total = newTotal
        state.amount = state.amount + 1 
        return cartItem;
      },[])
      return { ...state}
    case 'GET_TOTALS':
      let {total,amount} = state.cart.reduce(

        (cartTotal,cartItem)=>{
          return cartTotal
        },{
           total:0,
           amount:0,
        }
      )
      total = parseFloat(total.toFixed(2))
      return {...state,total,amount}
    case 'LOADING':
      return {...state, loading:true}
    case 'DISPLAY_ITEMS':
      return {...state,cart:action.payload,loading:false}
  }
  throw new Error['no matching action type']
}
export default reducer